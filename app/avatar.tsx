import {Bot,Cat,Ghost,Rocket,Bird,Rabbit,Dog,Fish,Turtle,Squirrel,Snail,Bug} from 'lucide-react';
import {avatars,defaultAvatar,isAvatar,type AvatarId} from '@/lib/avatars';
const avatarIcons={robot:Bot,cat:Cat,ghost:Ghost,rocket:Rocket,bird:Bird,rabbit:Rabbit,dog:Dog,fish:Fish,turtle:Turtle,squirrel:Squirrel,snail:Snail,bug:Bug};
export function Avatar({id,size=26}:{id?:AvatarId;size?:number}){
 const avatar=avatars.find(a=>a.id===(isAvatar(id)?id:defaultAvatar))!;
 const Icon=avatarIcons[avatar.id];
 return <span className="avatar-art" style={{'--avatar-color':avatar.color} as React.CSSProperties}><Icon size={size} aria-hidden="true"/></span>;
}
