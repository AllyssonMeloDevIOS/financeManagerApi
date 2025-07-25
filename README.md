# 💰 FinanceManagerAPI

API RESTful para gerenciamento financeiro pessoal, construída com Node.js, TypeScript, Express e PostgreSQL. Totalmente dockerizada e pronta para produção e testes locais.

---

## 📦 Tecnologias utilizadas

- Node.js 18 (alpine)
- TypeScript
- Express
- PostgreSQL 15
- TypeORM
- Docker & Docker Compose
- pgAdmin 4
- JWT para autenticação (access token e refresh token)
- `dotenv` para variáveis de ambiente
- `class-validator` e `express-validator`

---

## 🚀 Como rodar o projeto

### 1. Clone o repositório

```bash
git clone https://github.com/AllyssonMeloDevIOS/financeManagerApi.git
cd financeManagerApi
```

### 2. Instale as dependencias
```bash
npm install
```
### 3. Crie um arquivo .env na raiz com base no .env.example Exemplo:
```bash
DB_HOST=postgres
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=sua_Senha
DB_NAME=finance

APP_PORT=3000

PGADMIN_PORT=5050
PGADMIN_DEFAULT_EMAIL=allysson@gmail.com
PGADMIN_DEFAULT_PASSWORD=sua_senha

JWT_SECRET=seu_jwt_secret
JWT_REFRESH_SECRET=seu_jwt_refresh_secret
JWT_EXPIRES_IN=1d
JWT_REFRESH_EXPIRES_IN=7d
```

 💡 Gere chaves seguras com: ->>> node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

⚠️ Certifique-se de que o PostgreSQL está rodando e que o banco foi criado.

### 4. Build do projeto
```bash
npm run build
```
### 5. Suba os containers com Docker
```bash
docker-compose up --build
```
Isso irá:

- Iniciar o PostgreSQL e o pgAdmin;

- Esperar o banco estar pronto;

- Rodar as migrations automaticamente;

- Iniciar a API.

A API estará disponível em:
http://localhost:3000

## 🧪 Endpoints disponíveis

**Base URL**: http://localhost:3000/api

| Método | Rota             | Descrição                       |
| :----- | :--------------- | :-------------------------------|
| POST   | /auth/register   | Cria novo usuário               |
| POST   | /auth/login      | Login e geração de tokens       |
| POST   | /auth/refresh    | Gera novo access token          |
| GET    | /profile         | Retorna dados do usuário logado |
| POST   | /categories      | Cria nova categoria             |
| POST   | /transactions    | Cria nova transação             |

Header:
Authorization: Bearer SEU_TOKEN_JWT

## 📚 Documentação da API
Você pode consultar a documentação interativa da API Swagger em:

**URL**: http://localhost:3000/api-docs/#/

Lá você encontra detalhes de todas as rotas, parâmetros e exemplos de request/response.

## ⚙️ Requisitos
Node.js 18+ ou 20+

PostgreSQL 13+

Docker

## 🐘 Acesso ao banco via pgAdmin
Acesse: http://localhost:5050

- Email: allysson@gmail.com

- Senha: Sua_senha
___

- Host: postgres

- Usuário: postgres

- Senha: Sua_senha

## 🧼 Resetar ambiente Docker (caso algo quebre)
```bash
docker-compose down -v --remove-orphans
docker image prune -a
docker-compose up --build
```

## 🧠 TODOs futuros
- ✅ Autenticação JWT (access + refresh)

- ✅ Estrutura em camadas (DTOs, services, controllers)

- ✅ Migrations com TypeORM

- ✅ Documentação com Swagger

- 🔜 Testes automatizados com Jest

- 🔜 Deploy na nuvem (Render, Railway, etc)

## 🧐 Contribuindo
Pull requests são bem-vindos! Se quiser sugerir melhorias, abra uma issue ou envie um PR. 💡
