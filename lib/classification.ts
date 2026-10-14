export type Profile = 'Nerd'|'Erudito'|'Nerd + Erudito';
export const tiers = [
 {min:0,max:19,title:'Viajante em descoberta'},
 {min:20,max:39,title:'Curioso de carteirinha'},
 {min:40,max:59,title:'Explorador de universos'},
 {min:60,max:79,title:'Especialista em referências'},
 {min:80,max:100,title:'Enciclopédia de universos'},
] as const;
export function classify(nerd:number,erudite:number){
 const profile:Profile=Math.abs(nerd-erudite)<=10?'Nerd + Erudito':nerd>erudite?'Nerd':'Erudito';
 const level=profile==='Nerd + Erudito'?Math.round((nerd+erudite)/2):Math.max(nerd,erudite);
 const subtype=[...tiers].reverse().find(t=>level>=t.min)?.title??tiers[0].title;
 return {profile,subtype,title:`${profile} — ${subtype}`};
}
