import {Bot,Cat,Ghost,Rocket,Bird,Rabbit} from 'lucide-react';
import {avatars,defaultAvatar,isAvatar,type AvatarId} from '@/lib/avatars';
const avatarIcons={robot:Bot,cat:Cat,ghost:Ghost,rocket:Rocket,bird:Bird,rabbit:Rabbit};
export function Avatar({id,size=26}:{id?:AvatarId;size?:number}){
 const avatar=avatars.find(a=>a.id===(isAvatar(id)?id:defaultAvatar))!;
 const Icon=avatarIcons[avatar.id];
 return <span className="avatar-art" style={{'--avatar-color':avatar.color} as React.CSSProperties}><Icon size={size} aria-hidden="true"/></span>;
}
