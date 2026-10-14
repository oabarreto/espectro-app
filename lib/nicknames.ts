const nicknameAnimals=[
 ['Capivara',true],['Coruja',true],['Raposa',true],['Lontra',true],['Pantera',true],['Baleia',true],['Arara',true],['Lhama',true],
 ['Gato',false],['Lobo',false],['Pinguim',false],['Dragão',false],['Coelho',false],['Polvo',false],['Falcão',false],['Guaxinim',false],
 ['Fênix',true],['Tartaruga',true],['Onça',true],['Salamandra',true],['Tucano',false],['Tamanduá',false],['Camaleão',false],['Panda',false],
] as const;
const nicknameTraits=[
 ['Cósmico','Cósmica'],['Galáctico','Galáctica'],['Estelar','Estelar'],['Lunar','Lunar'],['Solar','Solar'],['Supersônico','Supersônica'],
 ['Interdimensional','Interdimensional'],['Arcano','Arcana'],['Lendário','Lendária'],['Pixelado','Pixelada'],['Astral','Astral'],['Místico','Mística'],
 ['Viajante','Viajante'],['Sonhador','Sonhadora'],['Explorador','Exploradora'],['Sideral','Sideral'],['Fantástico','Fantástica'],['Encantado','Encantada'],
 ['Elétrico','Elétrica'],['Temporal','Temporal'],['Futurista','Futurista'],['Curioso','Curiosa'],['Inventivo','Inventiva'],['Luminoso','Luminosa'],
] as const;
export function nickname(seed:string){
 // Usa a semente inteira, sem revelar fragmentos do identificador no nome.
 let hash=2166136261;for(const char of seed){hash=Math.imul(hash^char.charCodeAt(0),16777619)>>>0}
 const [animal,feminine]=nicknameAnimals[hash%nicknameAnimals.length];
 const trait=nicknameTraits[Math.floor(hash/nicknameAnimals.length)%nicknameTraits.length];
 return `${animal} ${trait[feminine?1:0]}`;
}
