import type {Category, Work, ScoredQuestion} from './data';
const initialWorks = [
['zelda','The Legend of Zelda','Jogos','Hyrule, aventuras e um herói de verde.','△','#bce888'],
['minecraft','Minecraft','Jogos','Um mundo inteiro, um bloco de cada vez.','▦','#a8d4af'],
['souls','Dark Souls','Jogos','Fogueiras, mistérios e mais uma tentativa.','✦','#edb785'],
['portal','Portal','Jogos','Ciência, quebra-cabeças e um bolo suspeito.','◎','#9bc8ed'],
['starwars','Star Wars','Filmes','Há muito tempo, numa galáxia distante…','✳','#e9d98a'],
['lotr','O Senhor dos Anéis','Filmes','Uma jornada pela Terra-média.','◉','#c6c495'],
['matrix','Matrix','Filmes','Realidade, escolhas e a pílula vermelha.','⌘','#a5ddb4'],
['ghibli','Studio Ghibli','Filmes','Mundos encantados de animação japonesa.','☁','#bbd9e8'],
['got','Game of Thrones','Séries','Casas, dragões e disputas pelo trono.','♜','#dbb9a1'],
['dark','Dark','Séries','O começo é o fim. O fim é o começo.','∞','#c1b8e3'],
['trek','Star Trek','Séries','Explorar novos mundos e civilizações.','⋀','#a9cbe0'],
['dune','Duna','Livros','Arrakis, especiaria e futuros possíveis.','◌','#e9c39b'],
['potter','Harry Potter','Livros','Cartas, feitiços e corredores de Hogwarts.','ϟ','#c8b5e7'],
['asimov','Fundação','Livros','Asimov, impérios e a história do futuro.','⊙','#a4cccb'],
['hitchhiker','O Guia do Mochileiro das Galáxias','Livros','Não entre em pânico. Leve uma toalha.','42','#d6df94']
];
const additionalWorks = [
['mario','Super Mario','Jogos','Reinos de cogumelos e saltos inesquecíveis.'],
['pokemon','Pokémon','Jogos','Criaturas, treinadores e muitas jornadas.'],
['finalfantasy','Final Fantasy','Jogos','Cristais, mundos e grandes aventuras.'],
['elder','The Elder Scrolls','Jogos','Tamriel, exploração e histórias sem fim.'],
['stardew','Stardew Valley','Jogos','Cultivar, pescar e fazer parte da vila.'],
['bioshock','BioShock','Jogos','Rapture, escolhas e cidades impossíveis.'],
['backfuture','De Volta para o Futuro','Filmes','Um DeLorean e outras linhas do tempo.'],
['alien','Alien','Filmes','No espaço, o desconhecido está à espreita.'],
['jurassic','Jurassic Park','Filmes','Dinossauros e ciência fora de controle.'],
['blade','Blade Runner','Filmes','Replicantes e perguntas sobre humanidade.'],
['marvel','Universo Marvel','Filmes','Heróis, encontros e multiversos.'],
['interstellar','Interestelar','Filmes','Tempo, espaço e uma viagem além da Terra.'],
['stranger','Stranger Things','Séries','Amizade, mistérios e o Mundo Invertido.'],
['doctor','Doctor Who','Séries','Um viajante, uma cabine e todo o tempo.'],
['breaking','Breaking Bad','Séries','Escolhas que transformam uma vida.'],
['blackmirror','Black Mirror','Séries','Tecnologia, sociedade e futuros incômodos.'],
['avatar','Avatar: A Lenda de Aang','Séries','Quatro elementos e a busca pelo equilíbrio.'],
['arcane','Arcane','Séries','Duas cidades, irmãs e caminhos em conflito.'],
['expanse','The Expanse','Séries','Humanidade e política pelo Sistema Solar.'],
['lovedeathrobots','Love, Death & Robots','Séries','Curtas animados de ficção científica, fantasia e terror.'],
['narnia','As Crônicas de Nárnia','Livros','Um guarda-roupa, Aslam e mundos além do nosso.'],
['earthsea','Terramar','Livros','Nomes verdadeiros, magia e equilíbrio.'],
['discworld','Discworld','Livros','Fantasia, humor e um mundo sobre uma tartaruga.'],
['1984','1984','Livros','Vigilância, linguagem e o Grande Irmão.'],
['frankenstein','Frankenstein','Livros','Criação, responsabilidade e humanidade.'],
['percy','Percy Jackson','Livros','Mitologia grega no mundo contemporâneo.']
];
const styles:Record<Category,[string,string]>={Jogos:['△','#bce888'],Filmes:['◎','#e9d98a'],Séries:['∞','#c1b8e3'],Livros:['◌','#e9c39b']};
export const seedWorks:Work[]=[...initialWorks.map(([id,name,category,detail,symbol,color])=>({id,name,category:category as Category,detail,symbol,color})),...additionalWorks.map(([id,name,category,detail])=>({id,name,category:category as Category,detail,symbol:styles[category as Category][0],color:styles[category as Category][1]}))];
// Conteúdo editorial em português. O primeiro item de cada lista é a resposta correta;
// a sessão embaralha alternativas e mantém o gabarito somente no servidor.
const trivia:Record<Category,[string,string,string,string,string][]>={
Jogos:[
['Em Portal, qual inteligência artificial conduz os testes?','GLaDOS','Cortana','HAL 9000','Skynet'],
['Qual é o nome do herói principal de The Legend of Zelda?','Link','Zelda','Ganondorf','Kirby'],
['Em Minecraft, qual criatura verde explode ao se aproximar?','Creeper','Enderman','Aldeão','Slime'],
['Em Pokémon, Pikachu pertence a qual tipo?','Elétrico','Fogo','Água','Planta'],
['Qual personagem costuma ser o irmão de Mario?','Luigi','Wario','Bowser','Toad'],
['Em Skyrim, como é conhecido o protagonista?','Dragonborn','Witcher','Vault Dweller','Commander Shepard'],
['Em Stardew Valley, qual lugar o jogador herda?','Uma fazenda','Uma nave','Um castelo','Um laboratório'],
['Em BioShock, qual cidade fica no fundo do mar?','Rapture','Columbia','Midgar','Raccoon City'],
['Em Dark Souls, o que serve como ponto de descanso?','Fogueiras','Cabines telefônicas','Centros Pokémon','Portais azuis'],
['Em Final Fantasy VII, qual é o nome do protagonista?','Cloud Strife','Squall Leonhart','Tidus','Noctis']
],
Filmes:[
['Qual destes filmes foi dirigido por Hayao Miyazaki?','A Viagem de Chihiro','Akira','Ghost in the Shell','Your Name'],
['O Senhor dos Anéis adapta a obra de qual autor?','J. R. R. Tolkien','C. S. Lewis','George R. R. Martin','Terry Pratchett'],
['Quem dirigiu o primeiro filme de Star Wars, lançado em 1977?','George Lucas','Steven Spielberg','James Cameron','Ridley Scott'],
['Em Matrix, quem interpreta Neo?','Keanu Reeves','Harrison Ford','Brad Pitt','Tom Cruise'],
['Em De Volta para o Futuro, qual carro vira uma máquina do tempo?','DeLorean','Mustang','Camaro','Fusca'],
['Quem interpreta Ellen Ripley na franquia Alien?','Sigourney Weaver','Linda Hamilton','Carrie Fisher','Jodie Foster'],
['Qual destes filmes adapta um romance de Michael Crichton?','Jurassic Park','Interestelar','Matrix','Alien'],
['Quem dirigiu Blade Runner, de 1982?','Ridley Scott','Denis Villeneuve','Christopher Nolan','Stanley Kubrick'],
['Qual herói da Marvel é associado ao martelo Mjölnir?','Thor','Homem de Ferro','Pantera Negra','Capitão América'],
['Quem dirigiu Interestelar?','Christopher Nolan','George Lucas','Peter Jackson','Robert Zemeckis']
],
Séries:[
['Em Dark, em qual cidade alemã a história se passa?','Winden','Berlim','Bremen','Dresden'],
['Game of Thrones adapta principalmente qual saga literária?','As Crônicas de Gelo e Fogo','As Crônicas de Nárnia','Fundação','Terramar'],
['Em Star Trek, qual nave é comandada por James T. Kirk na série original?','Enterprise','Millennium Falcon','Serenity','Rocinante'],
['Em Stranger Things, qual cidade abriga os protagonistas?','Hawkins','Springfield','Winden','Sunnydale'],
['Em Doctor Who, qual é o nome da máquina de viagem no tempo?','TARDIS','DeLorean','Nautilus','Discovery'],
['No início de Breaking Bad, Walter White é professor de quê?','Química','História','Matemática','Literatura'],
['Qual formato caracteriza grande parte de Black Mirror?','Histórias independentes por episódio','Uma competição musical','Um documentário de natureza','Uma comédia de escritório'],
['Em Avatar: A Lenda de Aang, qual elemento Aang domina desde o começo?','Ar','Água','Terra','Fogo'],
['Arcane se passa no universo de qual jogo?','League of Legends','Overwatch','World of Warcraft','Final Fantasy'],
['Em The Expanse, como se chama a nave central à história de Holden?','Rocinante','Enterprise','Discovery','Galactica'],
['Qual formato caracteriza Love, Death & Robots?','Uma antologia de curtas animados','Um documentário sobre robótica','Uma competição de talentos','Uma série de entrevistas']
],
Livros:[
['Quem escreveu Duna?','Frank Herbert','Isaac Asimov','Arthur C. Clarke','J. R. R. Tolkien'],
['Qual conceito é central à saga Fundação?','Psico-história','Viagem por portais','Seleção de casas','Alquimia'],
['Quem escreveu As Crônicas de Nárnia?','C. S. Lewis','J. R. R. Tolkien','Ursula K. Le Guin','J. K. Rowling'],
['Em O Leão, a Feiticeira e o Guarda-Roupa, que objeto leva as crianças a Nárnia?','Um guarda-roupa','Um espelho','Uma pintura','Um relógio'],
['Em Nárnia, Aslam é qual animal?','Leão','Lobo','Águia','Cavalo'],
['Quem escreveu a saga Terramar?','Ursula K. Le Guin','Octavia Butler','Mary Shelley','Agatha Christie'],
['Quem criou o universo de Discworld?','Terry Pratchett','Douglas Adams','Neil Gaiman','Philip K. Dick'],
['Quem escreveu 1984?','George Orwell','Aldous Huxley','Ray Bradbury','H. G. Wells'],
['Quem escreveu Frankenstein?','Mary Shelley','Bram Stoker','Jane Austen','Virginia Woolf'],
['Em O Guia do Mochileiro das Galáxias, qual número responde à grande questão da vida, do universo e tudo mais?','42','7','101','314']
]};
export const seedQuestions:ScoredQuestion[]=Object.entries(trivia).flatMap(([category,rows])=>rows.map(([text,...options],i)=>({id:`${category.toLowerCase()}-${i+1}`,category:category as Category,text,options,correct:0})));
