import {database} from './database';
import {seedWorks,seedQuestions} from './seed';
import {createQuiz,isDuration} from './quiz';
import {categories,sessionPlans} from './data';
import type {Duration,QuizSnapshot,Quiz} from './data';
// Migração aditiva e idempotente. A carga inicial nunca sobrescreve conteúdo editado no banco.
let ready:Promise<void>|undefined;
async function prepare(){const sql=database();if(!sql)return;if(!ready)ready=(async()=>{
 await sql`CREATE TABLE IF NOT EXISTS espectro_catalog (id TEXT PRIMARY KEY, kind TEXT NOT NULL CHECK(kind IN ('work','question')), content JSONB NOT NULL, active BOOLEAN NOT NULL DEFAULT true)`;
 await sql`CREATE TABLE IF NOT EXISTS espectro_quiz_sessions (id UUID PRIMARY KEY, content JSONB NOT NULL, expires_at TIMESTAMPTZ NOT NULL DEFAULT now() + interval '8 hours')`;
 await sql`ALTER TABLE espectro_quiz_sessions ADD COLUMN IF NOT EXISTS answers JSONB NOT NULL DEFAULT '{}'::jsonb`;
 const rows=[...seedWorks.map(content=>({id:`work:${content.id}`,kind:'work',content})),...seedQuestions.map(content=>({id:`question:${content.id}`,kind:'question',content}))];
 await sql`INSERT INTO espectro_catalog (id,kind,content) SELECT item->>'id',item->>'kind',item->'content' FROM jsonb_array_elements(${JSON.stringify(rows)}::jsonb) AS item ON CONFLICT(id) DO NOTHING`;
 })().catch(e=>{ready=undefined;throw e});await ready}
export async function newSession(duration:Duration):Promise<Quiz>{await prepare();const sql=database();let works=seedWorks;let questions=seedQuestions;if(sql){const rows=await sql`SELECT kind,content FROM espectro_catalog WHERE active = true`;works=rows.filter(r=>r.kind==='work').map(r=>r.content);questions=rows.filter(r=>r.kind==='question').map(r=>r.content)}
 const snapshot=createQuiz(duration,works,questions);const id=crypto.randomUUID();
 if(sql)await sql`INSERT INTO espectro_quiz_sessions(id,content) VALUES (${id},${JSON.stringify(snapshot)}::jsonb)`;
 else{const local={duration,works:snapshot.works.map(w=>w.id),questions:snapshot.questions.map(q=>({id:q.id,options:q.options})),expires:Date.now()+8*60*60*1000};return {id:'local.'+Buffer.from(JSON.stringify(local)).toString('base64url'),duration,works:snapshot.works,questions:snapshot.questions.map(({correct,...q})=>q)}}
 return {id,duration,works:snapshot.works,questions:snapshot.questions.map(({correct,...q})=>q)};
}
export async function getSession(id:unknown):Promise<QuizSnapshot|null>{
 if(typeof id!=='string'||id.length>6000)return null;const sql=database();
 if(!sql){try{if(!id.startsWith('local.'))return null;const local=JSON.parse(Buffer.from(id.slice(6),'base64url').toString());const duration:unknown=local.duration;if(!isDuration(duration)||!Number.isFinite(local.expires)||local.expires<Date.now())return null;const plan=sessionPlans[duration];if(!Array.isArray(local.works)||!Array.isArray(local.questions)||local.works.length!==plan.works||local.questions.length!==plan.questions)return null;
 const works=local.works.map((id:string)=>seedWorks.find(w=>w.id===id));
 const questions=local.questions.map((item:{id:string;options:string[]})=>{const original=seedQuestions.find(q=>q.id===item.id);if(!original||!Array.isArray(item.options)||item.options.length!==4||new Set(item.options).size!==4||!item.options.every(option=>original.options.includes(option)))throw Error('Pergunta inválida');return {...original,options:item.options,correct:item.options.indexOf(original.options[original.correct])}});
 if(works.some((w:unknown)=>!w)||new Set(works.map((w:{id:string})=>w.id)).size!==works.length||new Set(questions.map((q:{id:string})=>q.id)).size!==questions.length)return null;
 for(const c of categories)if(works.filter((w:{category:string})=>w.category===c).length!==plan.works/4||questions.filter((q:{category:string})=>q.category===c).length!==plan.questions/4)return null;
 return {duration,works,questions};
 }catch{return null}}
 if(!/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id))return null;
 await prepare();const rows=await sql`SELECT content,answers FROM espectro_quiz_sessions WHERE id=${id} AND expires_at>now()`;return rows[0]?{...rows[0].content,submitted:rows[0].answers}:null;
}

export async function recordAnswer(id:string,index:number,answer:number):Promise<number>{
 const sql=database();if(!sql)return answer;
 const key=String(index);const rows=await sql`UPDATE espectro_quiz_sessions SET answers=CASE WHEN answers ? ${key} THEN answers ELSE answers || ${JSON.stringify({[key]:answer})}::jsonb END WHERE id=${id} AND expires_at>now() RETURNING answers`;
 if(!rows[0])throw Error('Sessão expirada');return rows[0].answers[key];
}
