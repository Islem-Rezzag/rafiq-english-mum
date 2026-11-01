import {PracticeRecorder} from './recorder.js?v=3.0.0';
import {soundDrills,inspectOnset,combineAttempts} from './phoneme-core.js?v=3.0.0';

// One worker owns the acoustic model. Leaving the coach releases model memory.
// No audio or recognition results are sent to a server or persisted.
export class PhonemeCoach {
 constructor({onChange=()=>{},onResult=()=>{},beforeAudio=()=>{}}={}){
  Object.assign(this,{onChange,onResult,beforeAudio});this.status='idle';this.drill=soundDrills[0];this.generation=0;this.request=0;this.result=null;this.candidate=null;this.worker=null;this.url=null;this.progress=0;
  this.recorder=new PracticeRecorder({maxSeconds:5,onState:s=>{if(s==='recording'||s==='requesting'){this.status=s;this.emit();}},onReady:(url,blob)=>this.analyse(blob),onError:message=>this.feedback(message)});
 }
 emit(){this.onChange(this);}
 watch(milliseconds,message){clearTimeout(this.timer);this.timer=setTimeout(()=>this.fail(message),milliseconds);}
 clearAudio(){this.recorder.clear();if(this.url)URL.revokeObjectURL(this.url);this.url=null;}
 close(){this.generation++;clearTimeout(this.timer);this.worker?.terminate();this.worker=null;this.clearAudio();this.status='idle';this.result=null;this.candidate=null;this.progress=0;}
 cancel(){this.close();this.emit();}
 fail(message){this.close();this.status='error';this.result={kind:'uncertain',title:'لم يكتمل التدريب الصوتي.',message};this.emit();}
 feedback(message){clearTimeout(this.timer);this.candidate=null;this.status=this.worker?'ready':'idle';this.result={kind:'uncertain',title:'لنجرب تسجيلًا أوضح.',message};this.emit();}
 select(id){if(this.status!=='ready'&&this.status!=='idle'&&this.status!=='error')return;this.drill=soundDrills.find(d=>d.id===id)||this.drill;this.clearAudio();this.candidate=null;this.result=null;this.emit();}
 load(){
  this.close();const generation=this.generation;this.status='loading';this.emit();
  this.watch(90000,'توقّف التحميل. تحقّقي من الاتصال وجرّبي مجددًا.');
  try{
   const worker=new Worker(new URL('./phoneme-worker.js?v=3.0.0',import.meta.url),{type:'module'});this.worker=worker;
   worker.onerror=()=>{if(generation===this.generation)this.fail('تعذّر تشغيل مدرّب النطق هنا. جرّبي Safari أو تابعي الدروس المعتادة.');};
   worker.onmessage=({data})=>{
    if(generation!==this.generation)return;
    if(data.type==='progress'){this.progress=Math.min(100,Math.round(data.loaded/data.total*100));this.watch(90000,'توقّف التحميل. اتصلي بشبكة مستقرة وجرّبي مجددًا.');this.emit();}
    else if(data.type==='initializing'){this.status='initializing';this.watch(60000,'لم يكتمل تشغيل المدرّب على هذا الجهاز. أغلقي الصفحات الأخرى ثم جرّبي مجددًا.');this.emit();}
    else if(data.type==='ready'){clearTimeout(this.timer);this.tokenIds=data.tokenIds;this.status='ready';this.emit();}
    else if(data.type==='error')this.fail(data.message);
    else if(data.id===this.request&&this.status==='analysing'){
     if(data.type==='quality')this.feedback(data.message);
     else if(data.type==='result'){
      clearTimeout(this.timer);const result=combineAttempts(inspectOnset(data.phones,this.drill,this.tokenIds),this.candidate,this.drill);
      this.candidate=result.nextCandidate;this.result=result;this.status='ready';this.emit();this.onResult(result);
     }
    }
   };
   worker.postMessage({type:'load'});
  }catch{this.fail('هذا المتصفح لا يدعم مدرّب النطق. افتحي رفيق في Safari، أو تابعي دروسكِ المعتادة.');}
 }
 record(){
  if(this.status==='recording'){this.recorder.stop();return;}
  if(this.status!=='ready')return;
  this.beforeAudio();this.clearAudio();this.result=null;this.recorder.start();
 }
 async analyse(blob){
  if(!this.worker||!['ready','recording'].includes(this.status))return;
  this.beforeAudio();this.clearAudio();this.result=null;
  if(!blob||blob.size>2*1024*1024||!blob.size){this.feedback('اختاري تسجيلًا قصيرًا لكلمة واحدة، لا يزيد على ٦ ثوانٍ.');return;}
  const generation=this.generation;this.status='analysing';const id=++this.request;this.emit();
  this.watch(45000,'استغرق التحليل وقتًا طويلًا. أغلقي الصفحات الأخرى ثم أعيدي المحاولة.');
  try{
   const Decoder=globalThis.OfflineAudioContext||globalThis.webkitOfflineAudioContext;
   if(!Decoder)throw Error('Audio decoding unavailable');
   const context=new Decoder(1,1,16000),decoded=await context.decodeAudioData(await blob.arrayBuffer());
   if(generation!==this.generation)return;
   if(decoded.duration>6){this.feedback('التسجيل طويل. قولي كلمة واحدة فقط، في أقل من ٦ ثوانٍ.');return;}
   const samples=new Float32Array(decoded.length);
   for(let c=0;c<decoded.numberOfChannels;c++){const channel=decoded.getChannelData(c);for(let i=0;i<samples.length;i++)samples[i]+=channel[i]/decoded.numberOfChannels;}
   this.url=URL.createObjectURL(blob);this.worker.postMessage({type:'analyse',id,samples},[samples.buffer]);
  }catch{if(generation===this.generation)this.feedback('تعذّر قراءة هذا التسجيل. جرّبي زر التسجيل هنا، أو ملف صوت قصيرًا بصيغة أخرى.');}
 }
}
