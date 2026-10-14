export const avatars = [
  {id:'robot',name:'Robô',color:'#d0ef80'},
  {id:'cat',name:'Gato',color:'#cab2eb'},
  {id:'ghost',name:'Fantasma',color:'#b1d9ea'},
  {id:'rocket',name:'Foguete',color:'#efbe94'},
  {id:'bird',name:'Pássaro',color:'#a9d8bb'},
  {id:'rabbit',name:'Coelho',color:'#efb6c9'},
] as const;
export type AvatarId = typeof avatars[number]['id'];
export const defaultAvatar:AvatarId='robot';
export function isAvatar(value:unknown):value is AvatarId{return avatars.some(a=>a.id===value)}
