export const avatars = [
  {id:'robot',name:'Robô',color:'#d0ef80'},
  {id:'cat',name:'Gato',color:'#cab2eb'},
  {id:'ghost',name:'Fantasma',color:'#b1d9ea'},
  {id:'rocket',name:'Foguete',color:'#efbe94'},
  {id:'bird',name:'Pássaro',color:'#a9d8bb'},
  {id:'rabbit',name:'Coelho',color:'#efb6c9'},
  {id:'dog',name:'Cachorro',color:'#eac69b'},
  {id:'fish',name:'Peixe',color:'#9fdce7'},
  {id:'turtle',name:'Tartaruga',color:'#b3d98f'},
  {id:'squirrel',name:'Esquilo',color:'#e8ad8e'},
  {id:'snail',name:'Caracol',color:'#d2b3ed'},
  {id:'bug',name:'Inseto',color:'#efcc8e'},
] as const;
export type AvatarId = typeof avatars[number]['id'];
export const defaultAvatar:AvatarId='robot';
export function isAvatar(value:unknown):value is AvatarId{return avatars.some(a=>a.id===value)}
