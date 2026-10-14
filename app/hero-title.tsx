'use client';
import {useEffect,useState} from 'react';
const lines=['Todo mundo','tem um universo.','Qual é o seu?'];
const length=lines.reduce((sum,line)=>sum+line.length,0);
function LineText({text,index}:{text:string;index:number}){
 return index===1?<>{text.slice(0,7)}<span className="title-highlight">{text.slice(7)}</span></>:<>{text}</>;
}
export function HeroTitle(){
 const [count,setCount]=useState(0);
 useEffect(()=>{
  const preference=window.matchMedia('(prefers-reduced-motion: reduce)');
  let timer:ReturnType<typeof setInterval>|undefined;
  const finish=()=>{if(timer)clearInterval(timer);setCount(length)};
  if(preference.matches)finish();
  else{let characters=0;timer=setInterval(()=>{characters++;setCount(characters);if(characters>=length&&timer)clearInterval(timer)},65)}
  const change=()=>{if(preference.matches)finish()};
  preference.addEventListener('change',change);
  return()=>{if(timer)clearInterval(timer);preference.removeEventListener('change',change)};
 },[]);
 return <h1 className="typing-title" aria-label="Todo mundo tem um universo. Qual é o seu?" data-typing-complete={count>=length}>
  {lines.map((line,index)=>{
   const offset=lines.slice(0,index).reduce((sum,item)=>sum+item.length,0);
   const visible=Math.max(0,Math.min(line.length,count-offset));
   return <span key={line} className="typing-line" aria-hidden="true"><span className="typing-space"><LineText text={line} index={index}/></span><span className="typing-ink"><LineText text={line.slice(0,visible)} index={index}/>{count>=offset&&count<offset+line.length&&<span className="typing-caret"/>}</span></span>;
  })}
 </h1>;
}
