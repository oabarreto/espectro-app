import {avatars,defaultAvatar} from './avatars';
import {shareAvatars} from './share-avatars';
import type {Result} from './data';
export function escapeXml(value:string){return value.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'}[c]!))}
export function shareCardSvg(result:Result,position:number|null,host:string){
 const avatar=avatars.find(a=>a.id===result.avatar)??avatars.find(a=>a.id===defaultAvatar)!;
 const pointX=612+378*(.05+Math.max(0,Math.min(100,result.nerd))*.009);
 const pointY=486+337.5*(.95-Math.max(0,Math.min(100,result.erudite))*.009);
 const labelY=pointY>735?pointY-49:pointY+29;
 const rankLabel=position?`${position}º`:'—';
 const rankSize=position&&position>=1000?30:position&&position>=100?42:position&&position>=10?62:86;
 return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1350" width="1080" height="1350" role="img" aria-labelledby="title desc">
<title id="title">Card de resultado do Espectro</title><desc id="desc">${escapeXml(result.title)}. Nerd ${result.nerd} e erudito ${result.erudite}.</desc>
<defs><clipPath id="card-clip"><rect width="1080" height="1350" rx="40"/></clipPath><radialGradient id="glow"><stop stop-color="#d0ef80" stop-opacity=".12"/><stop offset="1" stop-color="#d0ef80" stop-opacity="0"/></radialGradient><linearGradient id="tile" x2="1" y2="1"><stop stop-color="#232b20"/><stop offset="1" stop-color="#171c17"/></linearGradient></defs>
<g clip-path="url(#card-clip)"><rect width="1080" height="1350" rx="40" fill="#101211"/><circle cx="950" cy="190" r="480" fill="url(#glow)"/><rect x="1" y="1" width="1078" height="1348" rx="39" fill="none" stroke="#35402f" stroke-width="2"/>
<g font-family="Arial, Helvetica, sans-serif">
<g transform="translate(64 57) scale(2)" fill="none" stroke="#d0ef80" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="3"/><circle cx="19" cy="5" r="2"/><circle cx="5" cy="19" r="2"/><path d="M10.4 21.9a10 10 0 0 0 9.941-15.416M13.5 2.1a10 10 0 0 0-9.841 15.416"/></g>
<text x="129" y="96" fill="#f2f4eb" font-size="47" font-weight="800" letter-spacing="-2">espectro<tspan fill="#d0ef80">.</tspan></text>
<rect x="831" y="62" width="185" height="38" rx="19" fill="#d0ef800c" stroke="#d0ef8033"/><text x="924" y="87" text-anchor="middle" font-size="13" letter-spacing="2" font-weight="700" fill="#d0ef80">MEU ESPECTRO</text>
<rect x="64" y="155" width="72" height="72" rx="20" fill="#d0ef8010" stroke="#d0ef8035"/>
<g transform="translate(78 168) scale(1.85)" stroke="${avatar.color}" fill="none" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${shareAvatars[avatar.id]}</g>
<text x="158" y="186" font-size="27" font-weight="700" fill="#f2f4eb">${escapeXml(result.name)}</text><text x="158" y="213" font-size="16" fill="#a8b0a8">Um universo de referências.</text>
<text x="64" y="315" font-size="67" font-weight="700" fill="#f2f4eb" letter-spacing="-2.5">${escapeXml(result.profile)}</text>
<text x="64" y="377" font-size="42" font-weight="600" fill="#d0ef80" letter-spacing="-1.2">${escapeXml(result.subtype)}.</text>
<text x="64" y="426" font-size="21" fill="#a8b0a8">Profundidade e repertório. Uma coleção de mundos.</text>
<rect x="64" y="486" width="213" height="287" rx="20" fill="url(#tile)" stroke="#394431"/>
<rect x="291" y="486" width="213" height="287" rx="20" fill="#201d26" stroke="#42384e"/>
<g transform="translate(151 517) scale(1.7)" fill="none" stroke="#d0ef80" stroke-width="1.8" stroke-linecap="round"><circle cx="6" cy="14" r="4"/><circle cx="18" cy="14" r="4"/><path d="M10 14h4M2 14l2-8m18 8-2-8"/></g>
<g transform="translate(378 517) scale(1.7)" fill="none" stroke="#cab2eb" stroke-width="1.8" stroke-linejoin="round"><path d="m2 9 10-5 10 5-10 5-10-5Zm4 2v6c4 3 8 3 12 0v-6m4-2v8"/></g>
<text x="170" y="650" text-anchor="middle" font-size="91" font-weight="700" fill="#d0ef80" letter-spacing="-4">${result.nerd}</text><text x="397" y="650" text-anchor="middle" font-size="91" font-weight="700" fill="#cab2eb" letter-spacing="-4">${result.erudite}</text>
<text x="170" y="683" text-anchor="middle" font-size="15" fill="#a8b0a8">DE 100 PONTOS</text><text x="397" y="683" text-anchor="middle" font-size="15" fill="#a8b0a8">DE 100 PONTOS</text>
<text x="170" y="727" text-anchor="middle" font-size="23" font-weight="700" fill="#f2f4eb">Nerd</text><text x="397" y="727" text-anchor="middle" font-size="23" font-weight="700" fill="#f2f4eb">Erudito</text>
<text x="170" y="752" text-anchor="middle" font-size="15" fill="#a8b0a8">Profundidade</text><text x="397" y="752" text-anchor="middle" font-size="15" fill="#a8b0a8">Repertório</text>
<text x="612" y="462" font-size="13" font-weight="700" letter-spacing="1.7" fill="#a8b0a8">SEU LUGAR NO ESPECTRO</text>
<rect x="612" y="486" width="378" height="337.5" rx="12" fill="#1a1e19" stroke="#556346"/>
<path d="M801 486v337.5M612 654.75h378M706.5 486v337.5M895.5 486v337.5M612 570.375h378M612 739.125h378" stroke="#536344" stroke-opacity=".3"/>
<text x="646" y="514" font-size="16" fill="#b8c6ae">Explorador de<tspan x="646" dy="23">repertórios</tspan></text>
<text x="960" y="514" font-size="16" text-anchor="end" fill="#d0ef80">Enciclopédia<tspan x="960" dy="23">de universos</tspan></text>
<text x="646" y="763" font-size="16" fill="#899681">Viajante em<tspan x="646" dy="23">descoberta</tspan></text>
<text x="960" y="763" font-size="16" text-anchor="end" fill="#cab2eb">Especialista<tspan x="960" dy="23">em universos</tspan></text>
<circle cx="${pointX}" cy="${pointY}" r="24" fill="#d0ef8018"/><circle cx="${pointX}" cy="${pointY}" r="9" fill="#d0ef80" stroke="#edffc2" stroke-width="3"/>
<rect x="${pointX-36}" y="${labelY}" width="72" height="28" rx="7" fill="#d0ef80"/><text x="${pointX}" y="${labelY+19}" text-anchor="middle" font-size="12" font-weight="700" letter-spacing="1" fill="#192014">VOCÊ</text>
<text x="574" y="655" transform="rotate(-90 574 655)" text-anchor="middle" font-size="12" letter-spacing="1.6" fill="#a8b0a8">REPERTÓRIO ERUDITO</text>
<text x="801" y="853" font-size="12" letter-spacing="1.6" text-anchor="middle" fill="#a8b0a8">PROFUNDIDADE NERD →</text>
<rect x="64" y="925" width="952" height="83" rx="16" fill="#1a1e19" stroke="#303b2b"/>
<path d="M382 944v45m317-45v45" stroke="#364130"/>
<text x="112" y="978" font-size="31" font-weight="700" fill="#d0ef80">${result.correct}/${result.questionCount??6}</text><text x="230" y="976" font-size="18" fill="#f2f4eb">acertos</text>
<text x="435" y="978" font-size="31" font-weight="700" fill="#f2ad97">${result.wrong??"—"}</text><text x="478" y="976" font-size="18" fill="#f2f4eb">${result.wrong===1?"erro":"erros"}</text>
<text x="752" y="978" font-size="31" font-weight="700" fill="#8ee5f2">${result.skipped??"—"}</text><text x="795" y="976" font-size="18" fill="#f2f4eb">${result.skipped===1?"pulo":"pulos"}</text>
<rect x="64" y="1050" width="952" height="134" rx="22" fill="#282331" stroke="#75608e" stroke-width="2"/>
<g transform="translate(98 1086) scale(2.9)" fill="none" stroke="#cab2eb" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M8 21h8m-4-5v5M7 4h10v5a5 5 0 0 1-10 0V4ZM7 6H4v3a4 4 0 0 0 4 4m9-7h3v3a4 4 0 0 1-4 4"/></g>
<text x="207" y="1145" font-size="${rankSize}" font-weight="700" letter-spacing="-4" fill="#e3cef9">${rankLabel}</text>
<text x="351" y="1109" font-size="28" font-weight="700" fill="#f2f4eb">${position ? "NO RANKING" : "SEU UNIVERSO"}</text>
<text x="351" y="1148" font-size="22" fill="#c1b3ce">${position ? "Posição no momento de gerar este card." : "Um repertório que é só seu."}</text>
<path d="M64 1220h952" stroke="#35402f"/>
<text x="64" y="1267" fill="#a8b0a8" font-size="22">${escapeXml(host)}</text><text x="1016" y="1267" text-anchor="end" fill="#d0ef80" font-size="22" font-weight="700">Qual é o seu universo? ↗</text>
</g></g></svg>
`;
}
export async function shareCardPng(svg:string):Promise<Blob>{
 const url=URL.createObjectURL(new Blob([svg],{type:'image/svg+xml;charset=utf-8'}));
 try{
  const image=new Image();image.src=url;await image.decode();
  const canvas=document.createElement('canvas');canvas.width=1080;canvas.height=1350;
  const context=canvas.getContext('2d');if(!context)throw Error('Imagem indisponível.');
  context.drawImage(image,0,0);
  return await new Promise<Blob>((resolve,reject)=>canvas.toBlob(blob=>blob?resolve(blob):reject(Error('Imagem indisponível.')),'image/png'));
 }finally{URL.revokeObjectURL(url)}
}
