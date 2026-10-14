import {test} from 'node:test';
import assert from 'node:assert/strict';
import {shareCardSvg} from './share-card';
import {avatars} from './avatars';
import type {Result} from './data';
const result:Result={name:'Ana <script>&"',avatar:'robot',profile:'Nerd + Erudito',title:'Nerd + Erudito — Enciclopédia de universos',subtype:'Enciclopédia de universos',nerd:88,erudite:82,total:85,correct:6,wrong:1,skipped:1,questionCount:8,categories:[]};
test('card escapa texto, mantém contagens e mostra posição real',()=>{const svg=shareCardSvg(result,143,'espectro-app.vercel.app');assert.ok(svg.includes('Ana &lt;script&gt;&amp;&quot;'));assert.ok(!svg.includes('<script>'));assert.ok(svg.includes('143º'));assert.ok(svg.includes('6/8'));assert.ok(svg.includes('Posição no momento de gerar este card.'));});
test('card não inventa ranking indisponível nem resumo de resultados antigos',()=>{const svg=shareCardSvg({...result,wrong:undefined,skipped:undefined},null,'localhost');assert.ok(!svg.includes('143º'));assert.ok(svg.includes('SEU UNIVERSO'));assert.ok(svg.includes('>—</text>'));});
test('coordenadas ficam dentro da matriz e todos os avatares são desenhados',()=>{for(const avatar of avatars){const svg=shareCardSvg({...result,avatar:avatar.id,nerd:100,erudite:0},1,'example.com');assert.ok(!svg.includes('undefined'));const point=svg.match(/<circle cx="([\d.]+)" cy="([\d.]+)" r="24"/)!;assert.ok(Math.abs(Number(point[1])-971.1)<.01);assert.ok(Math.abs(Number(point[2])-806.625)<.01);}});
