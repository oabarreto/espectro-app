# Desenvolvimento do Espectro

Aplicativo Next.js em português para uma brincadeira sobre repertório cultural. Nick opcional, seis avatares selecionáveis, sessões de 3, 5 ou 8 minutos, matriz de dois eixos e ranking. Sem cadastro.

## Executar

Requer Node.js 20.19 ou superior (recomendado: Node.js 22).

```sh
npm install
npm run dev
```

Abra http://127.0.0.1:3000. `npm test` verifica a pontuação; `npm run build` valida a compilação de produção.

## Publicar na Vercel

Importe esta pasta como um projeto Next.js (se o repositório contiver outras pastas, selecione esta como Root Directory). Os comandos padrão da Vercel funcionam. Crie um banco Neon e configure `DATABASE_URL` no ambiente do projeto; faça um novo deploy depois de adicionar a variável. Localmente, copie `.env.example` para `.env.local` e preencha a variável. Não envie credenciais para o repositório.

As tabelas são criadas automaticamente no primeiro acesso. O usuário do banco precisa poder criar `espectro_results`, `espectro_catalog` e `espectro_quiz_sessions`. A migração é aditiva e a carga inicial usa `ON CONFLICT DO NOTHING`; conteúdo existente não é sobrescrito. Sem `DATABASE_URL`, o aplicativo funciona em modo local e explica que o ranking não é compartilhado. Falhas reais do banco aparecem como erro, sem simular salvamento.

O resultado local fica no navegador, e um cookie HttpOnly identifica a participação no servidor. Refazer substitui o resultado dessa identidade. Não existe autenticação: limpar cookies ou usar outro navegador permite uma participação nova. Este mecanismo atende uma brincadeira entre colegas, não um campeonato com controle de identidade. O ranking apresenta até 100 participantes e uma única turma por instalação. Não há dados fictícios.

## Critérios

Nerd: 60% familiaridade em profundidade nos cinco universos mais conhecidos e 40% acertos. Erudito: 60% familiaridade média nas quatro categorias, com pesos iguais, e 40% média dos acertos de filmes, séries e livros, com pesos iguais. Geral: média dos dois eixos. O teste não é científico; a explicação está disponível no app.

O nick é limitado a 30 caracteres. Sem preenchimento, o servidor gera um apelido. Pontuações são calculadas no servidor; a API recebe respostas, nick, avatar e identificador da sessão. A identidade nunca é enviada pelo cliente no corpo da requisição.

## Catálogo e sessões

O Neon guarda 41 universos e 41 perguntas iniciais em `espectro_catalog`. O conteúdo editorial fica em `lib/seed.ts` como carga inicial e alternativa para uso sem banco. Em produção, as sessões usam os registros ativos no banco: `kind` distingue `work` e `question`; `content` contém os campos e `active` permite desativar um item. Perguntas incluem `correct`, o índice da alternativa correta. Não há área administrativa nesta versão.

`POST /api/quiz` recebe `duration` (3, 5 ou 8) e prepara uma seleção aleatória, equilibrada por categoria:

| Tempo estimado | Universos | Perguntas | Total |
| --- | --- | --- | --- |
| 3 minutos | 12 | 8 | 20 |
| 5 minutos | 20 | 12 | 32 |
| 8 minutos | 28 | 20 | 48 |

O tempo é estimado, sem contagem regressiva. As alternativas são embaralhadas. A sessão fica congelada no banco por até 8 horas de validade; editar o catálogo não muda um teste em andamento. O cliente recebe apenas identificador, textos e alternativas, sem gabarito antecipado. `POST /api/quiz/answer` confirma uma resposta e devolve seu feedback e a alternativa correta. Em produção, a primeira resposta de cada pergunta fica registrada em `espectro_quiz_sessions.answers`; tentativas de mudar uma resposta confirmada são recusadas na correção final. A API de ranking consulta a sessão original para corrigir as respostas. Sessões expiradas retornam 410.

Sem banco, o identificador local carrega a seleção e a API valida cada item contra o catálogo editorial. Este modo serve para experimentar e não grava ranking compartilhado. O resumo final mostra acertos, erros e pulos. Resultados antigos continuam visíveis; quando não possuem quantidade do desafio, a interface usa as 6 perguntas da versão anterior.

As pontuações continuam na escala de 0 a 100. A normalização permite mostrar sessões de tamanhos diferentes no mesmo ranking; a dificuldade dos itens pode variar, por isso isso não equivale a um campeonato padronizado.

APIs de trivia foram avaliadas, mas não são chamadas em tempo real. [Open Trivia DB](https://opentdb.com/api_config.php) oferece conteúdo gratuito com licença CC BY-SA 4.0 e limite de chamadas; [The Trivia API](https://the-trivia-api.com/) também oferece conteúdo de quiz. Uma futura importação deve preservar atribuição/licença, passar por tradução e revisão e então entrar no catálogo.

## Perfis e subtipos

O eixo dominante define Nerd ou Erudito. Uma diferença de até 10 pontos define Nerd + Erudito. O subtipo usa a pontuação do eixo dominante; quando os eixos estão próximos, usa a média.

- 0–19: Viajante em descoberta.
- 20–39: Curioso de carteirinha.
- 40–59: Explorador de universos.
- 60–79: Especialista em referências.
- 80–100: Enciclopédia de universos.

Exemplo: **Nerd — Curioso de carteirinha**. O perfil aparece com óculos para Nerd e um capelo para Erudito. O avatar escolhido acompanha o resultado e o ranking; resultados anteriores usam o avatar padrão e recebem a nova classificação ao abrir.

## Autor

[Otávio Barreto no GitHub](https://github.com/oabarreto) · [LinkedIn](https://www.linkedin.com/in/oabarreto)
