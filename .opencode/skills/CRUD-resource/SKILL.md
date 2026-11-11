---
name: CRUD-resource
description: Guia para criar um CRUD de recurso seguindo os padrões deste repositório (Express + Sequelize + MySQL).
---

# CRUD de recurso (padrões do repo)

Use este guia ao adicionar um novo recurso com operações Create/Read/Update/Delete neste projeto.

## Checklist
1. Criar `src/models/<recurso>.ts` com `Model` + `init(...)` no padrão existente.
2. Criar `src/controllers/<recurso>.ts` com handlers Express (`Request`, `Response`).
3. Registrar rotas em `src/server.ts` (e importar controller/model conforme necessário).
4. Garantir que rotas novas (exceto `POST /auth/login` e `POST /users`) fiquem **após** `app.use(authMiddleware)`.
5. Não alterar arquivos não relacionados; rode `npx tsc --noEmit` após mudanças.

## 1) Model (`src/models/<recurso>.ts`)
- Baseie-se em `src/models/music.ts`.
- Exporte uma classe que estende `Model` com campos tipados via `declare`.
- Chame `<Recurso>.init({ ...campos... }, { tableName, timestamps: true, sequelize })` importando `sequelize` de `../database/sequelize`.
- Use `DataTypes` do `sequelize` e mantenha opções explícitas (`allowNull`, `primaryKey`, `autoIncrement`, tamanhos de `STRING`, etc.) como no código atual.

Exemplo de estrutura:
```ts
import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/sequelize";

export class Exemplo extends Model {
  declare id: number;
  // declare ...campos
}

Exemplo.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  // ...campos
}, {
  tableName: "exemplos",
  timestamps: true,
  sequelize,
});
```

## 2) Controller (`src/controllers/<recurso>.ts`)
- Baseie-se em `src/controllers/music.ts`.
- Exporte funções `async` por operação: `createX`, `listAllXs`, `findXById`, `updateX`, `deleteX`.
- Leia dados de `req.body` e `req.params` (converta ids com `Number(...)` como no padrão).
- Respostas/erros no estilo atual:
  - Create: cria com `Model.create(...)` e retorna `res.json(entidade)`.
  - List: `Model.findAll()` e `res.json(lista)`.
  - Find by id: busca com `Model.findByPk(id)`; se não achar, retornar 404 (no padrão atual `sendStatus(404)` ou JSON conforme o caso). Pode usar `try/catch` com 500 e mensagem em português.
  - Update: busca por id; se não achar, `res.status(404).json({ message: "..." })`; atribui campos do body, `await entidade.save()`, retorna `res.json(entidade)`.
  - Delete: busca por id; se não achar, 404 com mensagem; `await entidade.destroy()`; retorna `res.sendStatus(204)`.

## 3) Rotas (`src/server.ts`)
- Importe as funções do controller no topo de `src/server.ts`.
- Registre endpoints no padrão REST usado no projeto (ex.: `/musics`):
  - `POST /<recursos>` -> create
  - `GET /<recursos>` -> list
  - `GET /<recursos>/:id` -> find by id
  - `PUT /<recursos>/:id` -> update
  - `DELETE /<recursos>/:id` -> delete
- Rotas de recurso devem ser protegidas: adicione-as **depois** de `app.use(authMiddleware)`.
- Não mova nem altere a lógica de auth/bcrypt/middlewares sem pedido explícito.
- `src/server.ts` hoje instancia `new Music()` após `connectToDb()`. Se o recurso exigir registro/instanciação similar, siga o padrão existente com cuidado e apenas se necessário.

## Observações importantes
- Mantenha o estilo CommonJS/TypeScript e convenções já usadas (nomes, mensagens em português, formato de resposta).
- Não use `sequelize.sync({ force: true })`.
- Não leia nem exponha `.env`; consulte `.env.example` para variáveis.
- Valide com `npx tsc --noEmit` antes de finalizar.
- Se houver ambiguidade no esquema, campos ou regras de negócio, pergunte antes de implementar.
