import * as ort from './vendor/ort/ort.wasm.min.mjs';
import {fbank} from './phoneme-fbank.js?v=3.0.0';
import {decodePhones,audioQuality} from './phoneme-core.js?v=3.0.0';
const MODEL_URL='https://huggingface.co/anyspeech/zipa-small-crctc-500k/resolve/dfe87c97662606fa6db90ad06f627d4363314744/model.int8.onnx';
const MODEL_CACHE='rafiq-models-v1';
const MODEL_SHA256='d0e28b68164e8b1fbd6105100c01798828aa0855000ce9bbbd1a2cec233adf13';
let session=null,tokens=null,tokenIds=null;
ort.env.wasm.numThreads=1;
ort.env.wasm.wasmPaths=new URL('./vendor/ort/',import.meta.url).href;
ort.env.logLevel='error';
async function modelBytes(){
 const valid=async bytes=>bytes.length===70677672&&Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',bytes)),b=>b.toString(16).padStart(2,'0')).join('')===MODEL_SHA256;
 let cache;try{cache=await caches.open(MODEL_CACHE);const found=await cache.match(MODEL_URL);if(found){const bytes=new Uint8Array(await found.arrayBuffer());if(await valid(bytes))return bytes;await cache.delete(MODEL_URL);}}catch{}
 const response=await fetch(MODEL_URL,{credentials:'omit'});if(!response.ok)throw Error('تعذّر تحميل مدرّب النطق. اتصلي بالإنترنت وجرّبي مجددًا.');
 const reader=response.body.getReader(),parts=[];let total=0;
 for(;;){const {done,value}=await reader.read();if(done)break;parts.push(value);total+=value.length;postMessage({type:'progress',loaded:total,total:70677672});if(total>72000000)throw Error('ملف النموذج غير متوقع. أوقفي التحميل وأعيدي المحاولة.');}
 const bytes=new Uint8Array(total);let offset=0;for(const p of parts){bytes.set(p,offset);offset+=p.length;}
 if(!await valid(bytes))throw Error('لم يكتمل تحميل مدرّب النطق بصورة سليمة. جرّبي مجددًا.');
 // Verify pinned weights before execution, including cache hits.
 try{await cache?.put(MODEL_URL,new Response(bytes,{headers:{'Content-Type':'application/octet-stream'}}));}catch{}
 return bytes;
}
self.onmessage=async({data})=>{
 try{
  if(data.type==='load'){
   const response=await fetch(new URL('./phoneme-tokens.txt',import.meta.url));if(!response.ok)throw Error('Vocabulary unavailable');const vocab=await response.text();
   tokenIds={};tokens={};for(const line of vocab.trim().split(/\r?\n/)){const [s,id]=line.split(' ');tokens[Number(id)]=s;tokenIds[s]=Number(id);}
   const bytes=await modelBytes();postMessage({type:'initializing'});
   session=await ort.InferenceSession.create(bytes,{executionProviders:['wasm'],graphOptimizationLevel:'all'});
   postMessage({type:'ready',tokenIds});
  }else if(data.type==='analyse'){
   if(!session)throw Error('حمّلي مدرّب النطق أولًا.');
   const quality=audioQuality(data.samples);if(!quality.ok){postMessage({type:'quality',id:data.id,message:quality.message});return;}
   const {features,frames}=fbank(data.samples);
   const output=await session.run({x:new ort.Tensor('float32',features,[1,frames,80]),x_lens:new ort.Tensor('int64',BigInt64Array.of(BigInt(frames)),[1])});
   const logits=output.log_probs;const length=Number(output.log_probs_len.data[0]);
   postMessage({type:'result',id:data.id,phones:decodePhones(logits.data,length,logits.dims[2],tokens)});
  }
 }catch(error){console.error('Sound coach:',String(error?.message||error).slice(0,200));postMessage({type:'error',id:data.id,message:data.type==='load'?'لم يتمكّن هذا المتصفح من تشغيل مدرّب النطق. تحقّقي من الاتصال، وجرّبي Safari وأغلقي الصفحات الأخرى، أو تابعي الدروس المعتادة.':'تعذّر تحليل التسجيل. جرّبي كلمة قصيرة مرة أخرى.'});}
};
