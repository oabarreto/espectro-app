import {NextResponse} from 'next/server';
import {isDuration} from '@/lib/quiz';
import {newSession} from '@/lib/quiz-store';
export const dynamic='force-dynamic';
export async function POST(request:Request){
 const origin=request.headers.get('origin');if(origin&&new URL(origin).host!==request.headers.get('host'))return NextResponse.json({error:'Origem inválida'},{status:403});
 try{const raw=await request.text();if(raw.length>256)return NextResponse.json({error:'Envio muito grande'},{status:413});let payload;try{payload=JSON.parse(raw)}catch{return NextResponse.json({error:'Envio inválido'},{status:400})}
 if(!isDuration(payload?.duration))return NextResponse.json({error:'Escolha uma sessão de 3, 5 ou 8 minutos.'},{status:400});
 return NextResponse.json({quiz:await newSession(payload.duration)},{headers:{'Cache-Control':'no-store'}});
 }catch{return NextResponse.json({error:'Não foi possível preparar as perguntas. Tente novamente.'},{status:503})}
}
