import {defaultAvatar,isAvatar} from '@/lib/avatars';
import {classify} from '@/lib/classification';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';
import {getSession} from '@/lib/quiz-store';
import { nickname, score, validateAnswers } from '@/lib/scoring';
export const dynamic='force-dynamic';
async function database(){if(!process.env.DATABASE_URL)return null;const sql=neon(process.env.DATABASE_URL);await sql`CREATE TABLE IF NOT EXISTS espectro_results (id UUID PRIMARY KEY, name TEXT NOT NULL, total INTEGER NOT NULL, result JSONB NOT NULL, updated_at TIMESTAMPTZ NOT NULL DEFAULT now())`;return sql}
export async function GET(){try{const sql=await database();const rows=sql?await sql`SELECT result FROM espectro_results ORDER BY total DESC, updated_at ASC LIMIT 100`:[];return NextResponse.json({shared:!!sql,entries:rows.map(r=>({...r.result,...classify(r.result.nerd,r.result.erudite),avatar:isAvatar(r.result.avatar)?r.result.avatar:defaultAvatar}))},{headers:{'Cache-Control':'no-store'}})}catch{return NextResponse.json({error:'Não foi possível carregar o ranking. Tente novamente.'},{status:503})}}
export async function POST(request:Request){
 const origin=request.headers.get('origin');if(origin&&new URL(origin).host!==request.headers.get('host'))return NextResponse.json({error:'Origem inválida'},{status:403});
 try{const raw=await request.text();if(raw.length>8192)return NextResponse.json({error:'Envio muito grande'},{status:413});
 let payload;try{payload=JSON.parse(raw)}catch{return NextResponse.json({error:'Envio inválido'},{status:400})}
 const quiz=await getSession(payload?.sessionId);
 if(!quiz)return NextResponse.json({error:'Esta sessão expirou. Inicie um novo teste.'},{status:410});
 if(quiz.submitted&&Object.entries(quiz.submitted).some(([i,v])=>payload.answers?.[quiz.works.length+Number(i)]!==v))return NextResponse.json({error:'Uma resposta já confirmada não pode ser alterada.'},{status:400});
 if(!validateAnswers(payload.answers,quiz))return NextResponse.json({error:'Complete todas as respostas.'},{status:400});
 if(payload.name!==undefined&&(typeof payload.name!=='string'||payload.name.length>30))return NextResponse.json({error:'O nick deve ter até 30 caracteres.'},{status:400});
 if(payload.avatar!==undefined&&!isAvatar(payload.avatar))return NextResponse.json({error:'Escolha um dos avatares disponíveis.'},{status:400});
 const jar=await cookies();const stored=jar.get('espectro_id')?.value;
 const id=stored&&/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(stored)?stored:crypto.randomUUID();
 const name=payload.name?.trim()||nickname(id);const result=score(payload.answers,name,quiz,payload.avatar??defaultAvatar);const sql=await database();
 if(sql)await sql`INSERT INTO espectro_results (id,name,total,result) VALUES (${id},${name},${result.total},${JSON.stringify(result)}::jsonb) ON CONFLICT(id) DO UPDATE SET name=EXCLUDED.name,total=EXCLUDED.total,result=EXCLUDED.result,updated_at=now()`;
 const response=NextResponse.json({result,shared:!!sql});response.cookies.set('espectro_id',id,{httpOnly:true,secure:process.env.NODE_ENV==='production',sameSite:'lax',maxAge:31536000,path:'/'});return response;
 }catch{return NextResponse.json({error:'Não foi possível salvar. Suas respostas estão aqui; tente novamente.'},{status:503})}
}
