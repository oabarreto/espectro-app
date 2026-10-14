import {classify} from './classification';
import {defaultAvatar,type AvatarId} from './avatars';
import {categories,type Result,type QuizSnapshot} from './data';
export function validateAnswers(value:unknown,quiz:QuizSnapshot):value is number[]{return Array.isArray(value)&&value.length===quiz.works.length+quiz.questions.length&&value.every((v,i)=>Number.isInteger(v)&&v>=(i<quiz.works.length?0:-1)&&v<(i<quiz.works.length?4:quiz.questions[i-quiz.works.length].options.length))}
export function score(answers:number[],name:string,quiz:QuizSnapshot,avatar:AvatarId=defaultAvatar):Result{
 if(!validateAnswers(answers,quiz))throw new Error('Respostas inválidas');
 const ratings=answers.slice(0,quiz.works.length);
 const skipped=quiz.questions.reduce((sum,_,i)=>sum+Number(answers[quiz.works.length+i]===-1),0);
 const correct=quiz.questions.reduce((s,q,i)=>s+Number(answers[quiz.works.length+i]===q.correct),0);
 const categoryScores=categories.map(category=>{const items=quiz.works.map((w,i)=>({w,v:ratings[i]})).filter(x=>x.w.category===category);return {name:category,score:Math.round(items.reduce((s,x)=>s+x.v,0)/(items.length*3)*100)}});
 const deepest=[...ratings].sort((a,b)=>b-a).slice(0,5);
 const depth=deepest.reduce((s,v)=>s+(v===3?1:v===2?.45:0),0)/deepest.length;
 const breadth=categoryScores.reduce((s,c)=>s+c.score,0)/400;
 // As categorias têm peso igual no desafio, independentemente do tamanho da sessão.
 const accuracy=categories.map(category=>{const items=quiz.questions.map((q,i)=>({q,answer:answers[quiz.works.length+i]})).filter(x=>x.q.category===category);return items.reduce((s,x)=>s+Number(x.answer===x.q.correct),0)/items.length});
 const nerd=Math.round(60*depth+40*correct/quiz.questions.length);
 const context=accuracy.slice(1).reduce((s,v)=>s+v,0)/3;
 const erudite=Math.round(60*breadth+40*context);
 return {name,nerd,erudite,total:Math.round((nerd+erudite)/2),...classify(nerd,erudite),avatar,correct,wrong:quiz.questions.length-correct-skipped,skipped,questionCount:quiz.questions.length,duration:quiz.duration,categories:categoryScores};
}
export function nickname(id:string){const n=Number.parseInt(id.replaceAll('-','').slice(0,8),16);return `${['Capivara','Coruja','Raposa','Lontra','Pantera','Baleia','Arara','Lhama'][n%8]} ${['Cósmica','Galáctica','Estelar','Quântica','Lunar','Solar','Supersônica','Interdimensional'][Math.floor(n/8)%8]} · ${id.slice(-4).toUpperCase()}`}
