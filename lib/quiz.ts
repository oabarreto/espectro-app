import {categories,sessionPlans,type Duration,type Work,type ScoredQuestion,type QuizSnapshot} from './data';
export function isDuration(value:unknown):value is Duration{return value===3||value===5||value===8}
function shuffle<T>(items:T[],random:()=>number):T[]{const copy=[...items];for(let i=copy.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[copy[i],copy[j]]=[copy[j],copy[i]]}return copy}
export function createQuiz(duration:Duration,works:Work[],questions:ScoredQuestion[],random:()=>number=Math.random):QuizSnapshot{
 const plan=sessionPlans[duration];
 const chosenWorks:Work[]=[];const chosenQuestions:ScoredQuestion[]=[];
 for(const category of categories){const w=works.filter(x=>x.category===category);const q=questions.filter(x=>x.category===category);if(w.length<plan.works/4||q.length<plan.questions/4)throw Error('Catálogo insuficiente');chosenWorks.push(...shuffle(w,random).slice(0,plan.works/4));chosenQuestions.push(...shuffle(q,random).slice(0,plan.questions/4))}
 return {duration,works:shuffle(chosenWorks,random),questions:shuffle(chosenQuestions,random).map(q=>{const order=shuffle(q.options.map((text,i)=>({text,correct:i===q.correct})),random);return {...q,options:order.map(x=>x.text),correct:order.findIndex(x=>x.correct)}})};
}
