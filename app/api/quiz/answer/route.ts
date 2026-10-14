import {NextResponse} from 'next/server';
import {getSession,recordAnswer} from '@/lib/quiz-store';
import {answerFeedback} from '@/lib/feedback';
export const dynamic='force-dynamic';
export async function POST(request:Request){
 const origin=request.headers.get('origin');if(origin&&new URL(origin).host!==request.headers.get('host'))return NextResponse.json({error:'Origem inválida'},{status:403});
 try{const raw=await request.text();if(raw.length>8192)return NextResponse.json({error:'Envio muito grande'},{status:413});let payload;try{payload=JSON.parse(raw)}catch{return NextResponse.json({error:'Envio inválido'},{status:400})}
 const quiz=await getSession(payload?.sessionId);if(!quiz)return NextResponse.json({error:'Esta sessão expirou. Inicie um novo teste.'},{status:410});
 const {index,answer}=payload;if(!Number.isInteger(index)||index<0||index>=quiz.questions.length||!Number.isInteger(answer)||answer < -1||answer>=quiz.questions[index].options.length)return NextResponse.json({error:'Resposta inválida'},{status:400});
 const confirmed=await recordAnswer(payload.sessionId,index,answer);
 return NextResponse.json({feedback:answerFeedback(quiz.questions[index],confirmed)},{headers:{'Cache-Control':'no-store'}});
 }catch{return NextResponse.json({error:'Não foi possível conferir sua resposta. Tente novamente.'},{status:503})}
}
