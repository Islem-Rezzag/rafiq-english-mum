// Kaldi/Lhotse-style filterbank math for ZIPA, 16 kHz mono float samples.
// Implementation informed by the Apache-2.0 standalone feature extractor at
// https://github.com/guettli/pp/blob/main/wasm/kaldi-fbank/fbank-standalone.zig
// Parameters independently checked against ZIPA's published inference settings.
const N=512,frameSize=400,hop=160,bands=80;
const window=Float64Array.from({length:frameSize},(_,i)=>(.5-.5*Math.cos(2*Math.PI*i/(frameSize-1)))**.85);
const mel=f=>1127*Math.log(1+f/700),lo=mel(20),spacing=(mel(7600)-lo)/(bands+1);
const filters=Array.from({length:bands},(_,b)=>Float64Array.from({length:N/2},(_,k)=>Math.max(0,Math.min((mel(k*16000/N)-lo-b*spacing)/spacing,(lo+(b+2)*spacing-mel(k*16000/N))/spacing))));
function fft(real,imag){
 for(let i=1,j=0;i<N;i++){let bit=N>>1;for(;j&bit;bit>>=1)j^=bit;j^=bit;if(i<j){[real[i],real[j]]=[real[j],real[i]];[imag[i],imag[j]]=[imag[j],imag[i]];}}
 for(let len=2;len<=N;len*=2){const wr=Math.cos(-2*Math.PI/len),wi=Math.sin(-2*Math.PI/len);for(let i=0;i<N;i+=len){let cr=1,ci=0;for(let j=0;j<len/2;j++){const a=i+j,b=a+len/2,tr=real[b]*cr-imag[b]*ci,ti=real[b]*ci+imag[b]*cr;real[b]=real[a]-tr;imag[b]=imag[a]-ti;real[a]+=tr;imag[a]+=ti;const next=cr*wr-ci*wi;ci=cr*wi+ci*wr;cr=next;}}}
}
export function fbank(audio){
 if(audio.length<400)throw Error('Audio too short');
 const frames=Math.floor((audio.length+hop/2)/hop),out=new Float32Array(frames*bands),real=new Float64Array(N),imag=new Float64Array(N),power=new Float64Array(N/2),frame=new Float64Array(frameSize);
 const sample=i=>audio[i<0?-i-1:i>=audio.length?2*audio.length-i-1:i]||0;
 for(let t=0;t<frames;t++){
   let mean=0;for(let j=0;j<frameSize;j++){frame[j]=sample(t*hop+j-120);mean+=frame[j];}mean/=frameSize;
   real.fill(0);imag.fill(0);
   for(let j=frameSize-1;j>=0;j--){const x=frame[j]-mean,prev=(j?frame[j-1]:frame[0])-mean;real[j]=(x-.97*prev)*window[j];}
   fft(real,imag);for(let k=0;k<N/2;k++)power[k]=real[k]**2+imag[k]**2;
   for(let b=0;b<bands;b++){let energy=0;for(let k=0;k<N/2;k++)energy+=power[k]*filters[b][k];out[t*bands+b]=Math.log(Math.max(energy,1.1920928955078125e-7));}
 }
 return {features:out,frames};
}
