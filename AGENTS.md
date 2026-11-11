# AGENTS.md

## Visão geral
- Pequena API em TypeScript com Express (`commonjs`) usando Sequelize + MySQL (`mysql2`).
- Código-fonte em `src/`, saída compilada em `dist/` (`tsconfig`: `rootDir: src`, `outDir: dist`, `strict: true`).
- Não há README, CI, lint ou scripts/configurações de teste neste repositório.

## Comandos
- Instalar dependências: `npm install`
- Servidor de desenvolvimento (watch): `npm run dev` (`tsx watch src/server.ts`)
- Build: `npm run build` (`tsc`)
- Iniciar app compilado: `npm start` (`node dist/server.js`)
- Não existem scripts `test`, `lint` ou `typecheck`; use `npm run build` como etapa de verificação do TypeScript.

## Execução / configuração
- Copie `.env.example` para `.env` e defina as variáveis do MySQL: `MYSQL_HOST`, `MYSQL_PORT`, `MYSQL_USERNAME`, `MYSQL_PASSWORD`, `MYSQL_DATABASE`, `SERVER_PORT`.
- O código também exige `JWT_SECRET` (`src/middlewares/authMiddleware.ts`, `src/controllers/auth.ts`) mesmo que ela não esteja listada em `.env.example`.
- A conexão/bootstrap do banco fica em `src/database/sequelize.ts` (`sequelize.authenticate()` + `sequelize.sync()`) e é chamada por `src/server.ts` na inicialização.
- `src/server.ts` escuta em `process.env.SERVER_PORT`, mas registra no log `http://localhost:3000` independentemente da porta real.

## Arquitetura / fluxo de requisição
- Entrypoint: `src/server.ts` carrega o ambiente (`dotenv.config()`), configura JSON/CORS, conecta ao banco, registra as rotas e inicia o servidor.
- Camadas: `controllers/` (handlers das rotas), `models/` (models Sequelize), `database/sequelize.ts` (instância compartilhada do Sequelize + conexão), `middlewares/`.
- Rotas públicas: `POST /auth/login`, `POST /users`.
- `app.use(authMiddleware)` é aplicado após as rotas públicas; as rotas protegidas são os endpoints CRUD de `/musics` definidos abaixo dele em `src/server.ts`.
- A autenticação espera `Authorization: Bearer <token>` e verifica com `JWT_SECRET` (HS256).

## Particularidades / pegadinhas
- `server.ts` instancia `new Music()` após a conexão com o banco; as definições/registro dos models ficam em `src/models/*.ts` — verifique os padrões existentes antes de adicionar models.
- `tsconfig.json` inclui `"jsx": "react-jsx"` mesmo sendo um serviço backend; evite alterar opções do compilador sem necessidade.
- Prefira preservar o estilo CommonJS/Sequelize existente e as strings de resposta/mensagem em português quando presentes.


## Guardrails
- NUNCA leia, edite ou mostre o conteúdo de arquivos `.env`. Consulte apenas o `.env.example`.
- Não instale dependências novas sem pedir permissão.
- Não altere `src/middlewares/auth.ts`, `src/controllers/auth.ts` nem a lógica do bcrypt sem pedido explícito.
- Toda rota nova deve usar `authMiddleware` (exceto `POST /auth/login` e `POST /users`).
- Nunca use `sequelize.sync({ force: true })`: isso apaga os dados.
- Altere só os arquivos necessários para a tarefa; não refatore código não relacionado.
- Depois de qualquer alteração, rode `npx tsc --noEmit` e corrija os erros antes de finalizar.
- Se o pedido estiver ambíguo, pergunte antes de implementar.