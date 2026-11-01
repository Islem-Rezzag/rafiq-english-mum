export class Voice {
  constructor({onState=()=>{},onMessage=()=>{},onResult=()=>{},onWord=()=>{}}={}) {
    Object.assign(this,{onState,onMessage,onResult,onWord});
    this.recognition=null; this.generation=0; this.timer=null; this.currentUtterance=null;
    this.supported=Boolean(globalThis.SpeechRecognition||globalThis.webkitSpeechRecognition);
    globalThis.speechSynthesis?.getVoices();
  }
  stop() {
    this.generation++; clearTimeout(this.timer);
    if(this.recognition){const rec=this.recognition;this.recognition=null;rec.onresult=rec.onerror=rec.onend=null;try{rec.abort();}catch{}}
    globalThis.speechSynthesis?.cancel();this.currentUtterance=null;this.onWord(null);this.onState('idle');
  }
  speak(segments,rate=.75) {
    this.stop();const synth=globalThis.speechSynthesis;
    if(!synth){this.onMessage('الصوت غير متاح هنا. يمكنكِ متابعة النص والأزرار.');return;}
    const queue=segments.filter(s=>s.text?.trim()),token=this.generation;
    const next=()=>{
      if(token!==this.generation)return;
      const part=queue.shift();
      if(!part){this.currentUtterance=null;this.onWord(null);this.onState('idle');return;}
      const voices=synth.getVoices(),matching=voices.filter(v=>v.lang.toLowerCase().startsWith(part.lang.slice(0,2)));
      if(voices.length&&!matching.length){this.onMessage(part.lang.startsWith('ar')?'الصوت العربي غير متاح على هذا الجهاز. يبقى الشرح مكتوبًا؛ أضيفي صوتًا عربيًا من إعدادات إمكانية الوصول.':'الصوت الإنجليزي غير متاح على هذا الجهاز.');next();return;}
      const u=new SpeechSynthesisUtterance(part.text);this.currentUtterance=u;
      u.lang=part.lang;u.rate=part.lang.startsWith('en')?rate:.9;u.pitch=1;
      u.voice=matching.find(v=>v.lang===part.lang)||matching[0]||null;
      u.onstart=()=>{if(token===this.generation)this.onState('speaking');};
      u.onboundary=e=>{if(token===this.generation&&e.name==='word')this.onWord({text:part.text,charIndex:e.charIndex});};
      u.onend=()=>{if(token!==this.generation)return;clearTimeout(this.timer);this.onWord(null);next();};
      u.onerror=e=>{if(token!==this.generation)return;clearTimeout(this.timer);this.onWord(null);this.onState('idle');if(!['canceled','interrupted'].includes(e.error))this.onMessage('لم يعمل الصوت. اضغطي «اسمعي» مرة أخرى، وتأكدي من رفع صوت الهاتف.');};
      // Animate only once the speech service confirms playback has started.
      this.onState('preparing');synth.speak(u);
      this.timer=setTimeout(()=>{if(token===this.generation){this.stop();this.onMessage('توقّف الصوت. اضغطي «اسمعي» للمحاولة من جديد.');}},45000);
    };
    next();
  }
  listen(lang) {
    if(this.recognition){this.recognition.stop();return;}
    this.stop();const Recognition=globalThis.SpeechRecognition||globalThis.webkitSpeechRecognition;
    if(!Recognition){this.onMessage('الميكروفون غير مدعوم هنا. جرّبي Safari، أو استخدمي الكتابة والأزرار.');return;}
    const rec=new Recognition(),token=this.generation;this.recognition=rec;
    rec.lang=lang;rec.continuous=false;rec.interimResults=false;rec.maxAlternatives=5;
    let gotResult=false,error=false;
    rec.onstart=()=>{if(token===this.generation)this.onState('listening');};
    rec.onresult=e=>{
      if(token!==this.generation)return;
      const result=e.results[e.resultIndex||0];if(!result||result.isFinal===false)return;
      const alternatives=Array.from(result,a=>({text:String(a.transcript).trim(),confidence:Number.isFinite(a.confidence)?a.confidence:null}));
      if(!alternatives.length)return;
      gotResult=true;this.recognition=null;clearTimeout(this.timer);this.onState('idle');
      // Recognizer confidence is never presented as a pronunciation score.
      this.onResult(alternatives[0].text,lang,{alternatives,confidence:alternatives[0].confidence});
    };
    rec.onerror=e=>{if(token!==this.generation)return;error=true;this.recognition=null;clearTimeout(this.timer);this.onState('idle');const messages={
      'not-allowed':'لم يُسمح بالميكروفون. اسمحي به في إعدادات Safari لهذا الموقع، أو استخدمي الكتابة.',
      'service-not-allowed':'خدمة التعرّف على الكلام غير متاحة. جرّبي Safari مع تفعيل Siri والإملاء.',
      'audio-capture':'لم أجد ميكروفونًا متاحًا. تحقّقي من إعدادات الهاتف.',
      'no-speech':'لم تصلني كلمات. اضغطي الميكروفون وتحدثي بعد ظهور «أنا أستمع».',
      'network':'تعذّر الاتصال بخدمة الصوت. يمكنكِ متابعة الدرس بالأزرار أو الكتابة.',
      'language-not-supported':'لغة التعرّف على الكلام غير متاحة على هذا الجهاز. استخدمي الكتابة.'};
      if(e.error!=='aborted')this.onMessage(messages[e.error]||'لم يعمل الميكروفون هذه المرة. يمكنكِ كتابة جوابكِ.');
    };
    rec.onend=()=>{if(token!==this.generation)return;this.recognition=null;clearTimeout(this.timer);this.onState('idle');if(!gotResult&&!error)this.onMessage('انتهى الاستماع. يمكنكِ المحاولة مرة أخرى أو متابعة التدريب دون ميكروفون.');};
    try{rec.start();this.timer=setTimeout(()=>{if(this.recognition===rec)rec.stop();},18000);}
    catch{this.recognition=null;this.onState('idle');this.onMessage('تعذّر بدء الميكروفون. جرّبي مرة أخرى أو استخدمي الكتابة.');}
  }
}
