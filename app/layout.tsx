import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {title:'Espectro — descubra seu universo', description:'Nerd, erudito ou um pouco de tudo? Descubra seu perfil cultural em poucos toques.'};
export default function Layout({children}:{children:React.ReactNode}) {return <html lang="pt-BR"><body>{children}</body></html>}
