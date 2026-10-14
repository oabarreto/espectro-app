'use client';
import {useEffect,useState} from 'react';
import {createPortal} from 'react-dom';
import {Download,Share2,RotateCcw} from 'lucide-react';
import type {Result} from '@/lib/data';
import {shareCardSvg,shareCardPng} from '@/lib/share-card';
import {ButtonSkeleton} from './skeleton';
type Card={url:string;file:File;position:number|null};
export function ShareCard({result}:{result:Result}){
 const [quickTarget,setQuickTarget]=useState<HTMLElement|null>(null);
 const [card,setCard]=useState<Card|null>(null);const [error,setError]=useState('');const [notice,setNotice]=useState('');const [attempt,setAttempt]=useState(0);const [sharing,setSharing]=useState(false);
 useEffect(()=>{
  setQuickTarget(document.getElementById('result-share-actions'));
  let cancelled=false;let objectUrl:string|undefined;const controller=new AbortController();setCard(null);setError('');setNotice('');
  async function prepare(){
   let position:number|null=null;
   try{const response=await fetch('/api/ranking',{signal:controller.signal});if(response.ok){const {current}=await response.json();const saved=current?.result;if(saved&&saved.name===result.name&&saved.nerd===result.nerd&&saved.erudite===result.erudite&&saved.correct===result.correct&&saved.avatar===result.avatar)position=current.position;}}catch{if(cancelled)return}
   try{const blob=await shareCardPng(shareCardSvg(result,position,location.host));if(cancelled)return;objectUrl=URL.createObjectURL(blob);setCard({url:objectUrl,file:new File([blob],'meu-espectro.png',{type:'image/png'}),position});}catch{if(!cancelled)setError('Não foi possível preparar a imagem. Tente novamente.')}
  }
  void prepare();return()=>{cancelled=true;controller.abort();if(objectUrl)URL.revokeObjectURL(objectUrl)};
 },[result,attempt]);
 async function share(){
  if(!card||sharing)return;setNotice('');const files=[card.file];
  try{if(navigator.share&&navigator.canShare?.({files})){setSharing(true);await navigator.share({files,title:'Meu Espectro',text:`${result.title}. Descubra seu universo: ${location.origin}`});}else setNotice('Neste dispositivo, baixe a imagem e envie pelo aplicativo que preferir.');}catch(e){if(!(e instanceof Error&&e.name==='AbortError'))setNotice('Não foi possível compartilhar. Você pode baixar a imagem e enviar pelo aplicativo que preferir.')}finally{setSharing(false)}
 }
 return <>{quickTarget&&createPortal(<><button className={`quick-share${!card?' skeleton':''}`} onClick={share} disabled={!card||sharing} aria-label={sharing?'Compartilhando imagem…':'Compartilhar imagem'} title="Compartilhar imagem"><Share2 size={20} aria-hidden="true"/></button>{card?<a className="quick-share" href={card.url} download="meu-espectro.png" aria-label="Baixar imagem" title="Baixar imagem"><Download size={20} aria-hidden="true"/></a>:<button className="quick-share skeleton" disabled aria-label="Preparando imagem para baixar"><Download size={20} aria-hidden="true"/></button>}</>,quickTarget)}<section className="share-section" aria-labelledby="share-title"><div className="share-copy"><span className="eyebrow">LEVE SEU UNIVERSO COM VOCÊ</span><h2 id="share-title" tabIndex={-1}>Seu resultado merece circular<span className="brand-dot">.</span></h2><p>Compartilhe seu card com a galera e descubra quem habita os mesmos universos.</p><div className="share-actions"><button className="primary" onClick={share} disabled={!card||sharing}>{sharing?<ButtonSkeleton label="Compartilhando imagem…"/>:<><Share2 size={18} aria-hidden="true"/>Compartilhar imagem</>}</button>{card&&<a className="download-card" href={card.url} download="meu-espectro.png"><Download size={18} aria-hidden="true"/>Baixar imagem</a>}</div><p className="hint">{card?.position?`Posição no ranking geral ao gerar a imagem: ${card.position}º. O ranking pode mudar.`:'A posição aparece quando seu resultado está disponível no ranking geral.'} PNG em formato vertical, pronto para enviar.</p>{error&&<div role="alert" className="error">{error}<button className="text-button" onClick={()=>setAttempt(v=>v+1)}><RotateCcw size={16}/>Tentar novamente</button></div>}{notice&&<p className="notice" role="status">{notice}</p>}</div><div className="share-preview">{card?<img src={card.url} width={1080} height={1350} alt={`Card de ${result.name}: ${result.title}, nerd ${result.nerd}, erudito ${result.erudite}${card.position?`, ${card.position}º no ranking`:''}.`}/>:!error?<div className="skeleton share-card-skeleton" role="status" aria-busy="true"><span className="sr-only">Preparando seu card de compartilhamento…</span></div>:null}</div></section></>;
}
