// Focused onset coaching, not whole-word grading. Posterior values are model
// evidence, not calibrated probabilities that a learner pronounced a sound wrong.
const make=(id,word,ar,target,label,accepted,confusions,anchors,tip)=>({id,word,ar,target,label,accepted,confusions,anchors,tip});
export const soundDrills=[
 make('p-pen','pen','قلم','p','P',['p'],['b'],[['n','m']], 'أغلقي الشفتين لحظة، ثم افتحيهما مع دفعة هواء قصيرة. جرّبي P دون اهتزاز في الحنجرة، ثم قولي pen.'),
 make('p-please','please','من فضلك','p','P',['p'],['b'],[['l','ɫ'],['z','s']], 'ابدئي بشفتين مغلقتين، ثم دفعة هواء قصيرة لصوت P. انتقلي بعدها إلى L مباشرة، دون إضافة حركة بينهما.'),
 make('th-three','three','ثلاثة','θ','TH مثل ث',['θ'],['t','s','f'],[['ɹ','r','ɻ','ɾ']], 'ضعي طرف اللسان برفق بين الأسنان الأمامية، وأخرجي الهواء مثل صوت ث. لا تضغطي اللسان خلف الأسنان كما في ت. جرّبي TH ثم three.'),
 make('th-thank','thank','اشكري / في عبارة شكرًا','θ','TH مثل ث',['θ'],['t','s','f'],[['ŋ','n'],['k','g']], 'ابدئي بصوت قريب من ث العربية: طرف اللسان بين الأسنان قليلًا، والهواء يمرّ حوله. جرّبي بداية thank ببطء.'),
 make('v-very','very','جدًا','v','V',['v'],['f','w'],[['ɹ','r','ɻ','ɾ']], 'لامسي الشفة السفلى بالأسنان العليا برفق، وأخرجي الهواء مع اهتزاز في الحنجرة. إنه قريب من ف، لكن معه صوت. جرّبي V ثم very.'),
 make('f-fine','fine','بخير','f','F مثل ف',['f'],['v'],[['n','m']], 'لامسي الشفة السفلى بالأسنان العليا وأخرجي الهواء مثل ف العربية، دون اهتزاز في الحنجرة. جرّبي fine.'),
 make('sh-shop','shop','متجر','ʃ','SH مثل ش',['ʃ'],['s'],[['p','b']], 'ابدئي مثل ش العربية، مع استدارة خفيفة للشفتين. قولي ش بصوت مستمر، ثم جرّبي shop.'),
 make('r-rice','rice','أرز','ɹ','R',['ɹ','ɻ','r','ɾ'],['l'],[['s','z']], 'لتجربة R الإنجليزية، ارفعي طرف اللسان قليلًا دون إلصاقه بسقف الفم، ثم انتقلي إلى بقية rice. لا يلزم إزالة لهجتكِ كي يكون كلامكِ مفهومًا.'),
 make('w-water','water','ماء','w','W',['w','ʍ'],['v'],[['t','d','ɾ','ʔ']], 'دوّري الشفتين مثل بداية و العربية، ثم افتحيهما نحو بقية water. لا تضعي الأسنان على الشفة السفلى.'),
 make('th-this','this','هذا / هذه','ð','TH مثل ذ',['ð'],['d','z','s'],[['s','z']], 'ضعي طرف اللسان بين الأسنان قليلًا، وأخرجي الصوت مع اهتزاز في الحنجرة، مثل ذ العربية. جرّبي this.')
];
export const soundNames={p:'P',b:'ب',t:'ت',d:'د',f:'ف',v:'V',w:'و',s:'س',z:'ز',l:'ل','θ':'ث','ð':'ذ','ʃ':'ش','ɹ':'R','r':'R','ɻ':'R','ɾ':'R'};
const isBase=s=>/^[a-zæçðøħŋœɐɑɒɓɔɕɖɗɘəɛɜɞɟɠɢɣɤɥɦɧɨɪɬɭɮɯɰɱɲɳɴɵɶɸɹɺɻɽɾʀʁʂʃʄʈʉʊʋʌʍʎʏʐʑʒʔʕʘʙʛʜʝʟʡʢβθχᶑⱱ]$/u.test(s);
const vowel=s=>/[aeiouæɑɒɔɐɘəɛɜɞɤɨɪɯɵɶʉʊʌʏyøœ]/u.test(s);
export function decodePhones(data,frames,size,tokens){
 const result=[];let previous=-1,current=null;
 for(let t=0;t<frames;t++){
   let id=0,top=-Infinity;for(let i=0;i<size;i++)if(data[t*size+i]>top){top=data[t*size+i];id=i;}
   if(id!==previous){current=null;if(id>3){current={symbol:tokens[id],confidence:0,frames:0,startFrame:t,posteriors:new Float32Array(size)};result.push(current);}}
   if(current){current.frames++;current.confidence+=Math.exp(top);for(let i=0;i<size;i++)current.posteriors[i]+=Math.exp(data[t*size+i]);}
   previous=id;
 }
 return result.map(p=>({...p,confidence:p.confidence/p.frames,posteriors:Array.from(p.posteriors,x=>x/p.frames)})).filter(p=>isBase(p.symbol));
}
export function audioQuality(samples,sampleRate=16000){
 if(samples.length<sampleRate*.35)return {ok:false,message:'التسجيل قصير جدًا. قولي الكلمة كاملة ثم أوقفي التسجيل.'};
 if(samples.length>sampleRate*6)return {ok:false,message:'قولي كلمة واحدة فقط في تسجيل قصير.'};
 let sum=0,clipped=0,peak=0;for(const s of samples){if(!Number.isFinite(s))return {ok:false,message:'تعذّر قراءة التسجيل. جرّبي تسجيلًا جديدًا.'};sum+=s*s;peak=Math.max(peak,Math.abs(s));if(Math.abs(s)>.98)clipped++;}
 const rms=Math.sqrt(sum/samples.length);
 if(rms<.003||peak<.018)return {ok:false,message:'الصوت منخفض أو لم يصلني كلام واضح. قرّبي الهاتف قليلًا وجرّبي في مكان هادئ.'};
 if(clipped/samples.length>.025)return {ok:false,message:'الصوت مرتفع ومشوّش. أبعدي الهاتف قليلًا ثم أعيدي الكلمة.'};
 return {ok:true,rms,peak};
}
function hasContext(phones,drill){
 if(phones.length<3||phones.length>12||!phones.slice(1).some(p=>vowel(p.symbol)))return false;
 let from=1;
 for(const group of drill.anchors){const index=phones.findIndex((p,i)=>i>=from&&group.includes(p.symbol));if(index<0)return false;from=index+1;}
 return true;
}
export function inspectOnset(phones,drill,tokenIds){
 if(!phones?.length||!hasContext(phones,drill))return {kind:'uncertain',title:'لم أميّز بداية الكلمة بثقة.',message:'قولي '+drill.word+' وحدها، في مكان هادئ. لن أعدّ هذا خطأ في نطقكِ.'};
 const first=phones[0],expectedEvidence=Math.max(...drill.accepted.map(p=>first.posteriors?.[tokenIds[p]]||0));
 if(drill.accepted.includes(first.symbol)&&first.confidence>=.55)return {kind:'matched',title:'ظهر صوت '+drill.label+' في بداية الكلمة.',message:'هذا هو الصوت الذي نركّز عليه في هذا التمرين. يمكنكِ تجربة كلمة أخرى.',sound:first.symbol};
 if(drill.confusions.includes(first.symbol)&&first.confidence>=.82&&expectedEvidence<=.12)return {kind:'candidate',sound:first.symbol,title:'نحتاج محاولة ثانية للتأكّد.',message:'رجّح التحليل صوت '+(soundNames[first.symbol]||first.symbol)+' في البداية. اسمعي النموذج، ثم قولي '+drill.word+' مرة أخرى. هذا احتمال، وليس حكمًا نهائيًا.'};
 return {kind:'uncertain',title:'بداية الصوت غير واضحة للتحليل.',message:'قد تكون المحاولة جيدة، لكن النموذج غير متأكّد. اسمعي المثال وجرّبي مرة أخرى؛ لا توجد درجة أو عقوبة.'};
}
export function combineAttempts(current,previous,drill){
 if(current.kind!=='candidate')return {...current,nextCandidate:null};
 if(previous?.drillId===drill.id&&previous.sound===current.sound)return {kind:'focus',sound:current.sound,nextCandidate:null,title:'لنتمرّن على '+drill.label+' في بداية '+drill.word+'.',message:'في محاولتين متتاليتين، رجّح التحليل صوت '+(soundNames[current.sound]||current.sound)+' بدل '+drill.label+'. قد يخطئ النموذج، لكن هذه طريقة لتجربة الفرق:',tip:drill.tip};
 return {...current,nextCandidate:{drillId:drill.id,sound:current.sound}};
}
