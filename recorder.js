// Optional self-listening. Audio remains in memory: no upload or persistent storage.
export class PracticeRecorder {
  constructor({onState=()=>{},onReady=()=>{},onError=()=>{}}={}){Object.assign(this,{onState,onReady,onError});this.generation=0;this.stream=null;this.recorder=null;this.url=null;this.timer=null;this.active=false;}
  clear(){this.generation++;clearTimeout(this.timer);if(this.recorder){this.recorder.ondataavailable=this.recorder.onstop=this.recorder.onerror=null;if(this.recorder.state!=='inactive')this.recorder.stop();}this.stream?.getTracks().forEach(t=>t.stop());this.stream=null;this.recorder=null;this.active=false;if(this.url)URL.revokeObjectURL(this.url);this.url=null;this.onState('idle');}
  stop(){if(this.recorder?.state==='recording')this.recorder.stop();}
  async start(){
    this.clear();const token=this.generation;
    if(!globalThis.navigator?.mediaDevices?.getUserMedia||!globalThis.MediaRecorder){this.onError('تسجيل الصوت غير متاح هنا. يمكنكِ الاستماع إلى رفيق والتدرّب بصوتكِ.');return;}
    this.onState('requesting');
    try{
      const stream=await navigator.mediaDevices.getUserMedia({audio:true});
      if(token!==this.generation){stream.getTracks().forEach(t=>t.stop());return;}
      this.stream=stream;const chunks=[];const r=new MediaRecorder(stream);this.recorder=r;
      r.ondataavailable=e=>{if(e.data.size)chunks.push(e.data);};
      r.onstop=()=>{clearTimeout(this.timer);stream.getTracks().forEach(t=>t.stop());this.stream=null;this.active=false;this.onState('idle');if(token!==this.generation)return;const blob=new Blob(chunks,{type:r.mimeType||chunks[0]?.type||'audio/mp4'});if(!blob.size){this.onError('لم يصل تسجيل. جرّبي مرة أخرى.');return;}this.url=URL.createObjectURL(blob);this.onReady(this.url);};
      r.onerror=()=>{this.clear();this.onError('تعذّر التسجيل. يمكنكِ متابعة التدريب دون تسجيل.');};
      r.start();this.active=true;this.onState('recording');this.timer=setTimeout(()=>this.stop(),12000);
    }catch{if(token!==this.generation)return;this.clear();this.onError('تعذّر استخدام الميكروفون للتسجيل. اسمحي به في إعدادات المتصفح، أو تابعي دون تسجيل.');}
  }
}
