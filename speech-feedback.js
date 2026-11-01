import {normalize} from './core.js?v=3.0.0';
import {wordCoach} from './teaching.js?v=3.0.0';

export function canonical(text) {
  return normalize(String(text).replace(/\bi['’]m\b/gi,'I am').replace(/\bdon['’]t\b/gi,'do not').replace(/\byou['’]re\b/gi,'you are').replace(/\bwhere['’]s\b/gi,'where is').replace(/\bit['’]s\b/gi,'it is'))
    .replace(/[٠-٩]/g,c=>String('٠١٢٣٤٥٦٧٨٩'.indexOf(c))).replace(/\bgoodmorning\b/g,'good morning').replace(/\bthankyou\b/g,'thank you');
}
const aliases = {
  hello:['hi','hello there','hey'], goodbye:['bye','bye bye','good bye'],
  'thank you':['thanks','thank you very much'], 'i am fine':['fine','fine thanks','i am fine thank you','i am good'],
  'please repeat':['repeat please','can you repeat please','could you repeat please','say it again please'],
  'slowly please':['please speak slowly','speak slowly please'],
  'you are welcome':['you are very welcome'], 'nice to meet you':['nice to meet you too']
};
const numbers=['zero','one','two','three','four','five','six','seven','eight','nine','ten'];
export function acceptableAnswer(input,expected,accepted=[]) {
  const actual=canonical(input),target=canonical(expected);
  if(actual===target || [...(aliases[target]||[]),...accepted].some(x=>canonical(x)===actual))return true;
  if(numbers.includes(target)&&actual===String(numbers.indexOf(target)))return true;
  if(target==='my name is sara')return /^my name is [a-z]+(?: [a-z]+){0,2}$/.test(actual);
  if(target==='hello my name is sara')return /^(hello|hi) my name is [a-z]+(?: [a-z]+){0,2}$/.test(actual);
  return false;
}

// Word alignment describes a transcript difference, never an acoustic/phoneme error.
export function alignWords(actual,expected) {
  const a=canonical(actual).split(' ').filter(Boolean),b=canonical(expected).split(' ').filter(Boolean);
  const dp=Array.from({length:a.length+1},()=>Array(b.length+1).fill(0));
  for(let i=0;i<=a.length;i++)dp[i][0]=i;
  for(let j=0;j<=b.length;j++)dp[0][j]=j;
  for(let i=1;i<=a.length;i++)for(let j=1;j<=b.length;j++)dp[i][j]=Math.min(dp[i-1][j]+1,dp[i][j-1]+1,dp[i-1][j-1]+(a[i-1]===b[j-1]?0:1));
  const edits=[];let i=a.length,j=b.length;
  while(i||j){if(i&&j&&a[i-1]===b[j-1]){edits.unshift({kind:'match',heard:a[i-1],expected:b[j-1]});i--;j--;}
    else if(j&&dp[i][j]===dp[i][j-1]+1){edits.unshift({kind:'missing',expected:b[j-1]});j--;}
    else if(i&&dp[i][j]===dp[i-1][j]+1){edits.unshift({kind:'extra',heard:a[i-1]});i--;}
    else {edits.unshift({kind:'changed',heard:a[i-1],expected:b[j-1]});i--;j--;}}
  return edits;
}

export function assessAnswer({text='',expected,accepted=[],source='typed',confirmed=false,alternatives=[]}) {
  const heard=String(text).trim();
  if(!heard)return {kind:'empty',success:false,title:'لم تصلني كلمات بعد.',message:'جرّبي الميكروفون أو اكتبي جوابكِ.'};
  const topMatch=acceptableAnswer(heard,expected,accepted);
  if(topMatch)return {kind:'accepted',success:true,title:source==='speech'?'التقط الهاتف جوابًا مناسبًا.':'هذا جواب مناسب.',message:canonical(heard)===canonical(expected)?'وصلتِ إلى العبارة المطلوبة. يمكنكِ متابعة الحوار.':'هذه طريقة أخرى مناسبة لقول المعنى. يمكنكِ متابعة الحوار.',heard,model:expected};
  const alternate=source==='speech'?alternatives.find(a=>acceptableAnswer(a.text,expected,accepted)):null;
  if(source==='speech'&&!confirmed)return {kind:'confirm',success:false,title:'نتأكّد أولًا مما التقطه الهاتف.',message:alternate?'ظهر أكثر من احتمال. اختاري ما قلتِه فعلًا.':'هل الكلمات أدناه هي ما قلتِه؟ قد يخطئ الهاتف في سماعكِ.',heard,alternate:alternate?.text,model:expected};
  if(/[\u0600-\u06ff]/.test(heard))return {kind:'language',success:false,title:'هذا جواب بالعربية.',message:'المعنى يساعدنا، والآن نجرّب العبارة الإنجليزية. يمكنكِ سماع النموذج أولًا.',heard,model:expected,focus:expected};
  const edits=alignWords(heard,expected),difference=edits.find(e=>e.kind!=='match');
  if(!difference)return {kind:'retry',success:false,title:'لنجرّب العبارة مرة أخرى.',message:'استمعي إلى النموذج، ثم جرّبي على مهلكِ.',heard,model:expected,focus:expected};
  let title,message,focus=difference.expected;
  if(difference.kind==='missing'){title=`نضيف كلمة: ${difference.expected}`;message=`الكلمة «${difference.expected}» غير موجودة في ${source==='speech'?'النص الذي أكّدتِه':'جوابكِ المكتوب'}. اسمعيها، ثم جرّبي العبارة كاملة.`;}
  else if(difference.kind==='extra'){title=`نراجع كلمة: ${difference.heard}`;message=`في هذا المثال لا نحتاج إلى «${difference.heard}». انظري إلى النموذج، ثم جرّبي العبارة القصيرة.`;focus=expected;}
  else {title=`نركّز على كلمة: ${difference.expected}`;message=`${source==='speech'?'في النص الذي أكّدتِه':'كتبتِ'} «${difference.heard}»، وفي مثالنا نستخدم «${difference.expected}». نتمرّن على هذه الكلمة فقط أولًا.`;}
  return {kind:'focus',success:false,title,message,heard,model:expected,focus,edits,tip:wordCoach[canonical(focus)]||'اسمعي الكلمة وحدها، ثم أعيديها داخل العبارة. الهدف أن يكون المعنى واضحًا.'};
}
