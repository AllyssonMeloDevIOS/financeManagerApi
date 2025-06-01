# Finance Manager API

API RESTful para gerenciamento financeiro com autenticação via JWT, desenvolvida com TypeScript, Express, PostgreSQL e TypeORM.

---

## 🚀 Funcionalidades já implementadas

- Cadastro de usuários (`/api/auth/register`)
- Login com JWT e Refresh Token (`/api/auth/login`)
- Rota protegida de perfil (`/api/auth/profile`)
- Middleware de autenticação JWT
- Validação com `class-validator` e `celebrate`
- Banco de dados com PostgreSQL + TypeORM + migrations

---

## 🧰 Tecnologias utilizadas

- Node.js + Express
- TypeScript
- PostgreSQL
- TypeORM
- JWT + Bcrypt
- class-validator
- ts-node-dev
- dotenv

---

## 🛠️ Como rodar o projeto localmente

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/financeManagerApi.git
cd financeManagerApi


### 2. Instale as dependencias
npm install

### 3. Crie um arquivo .env na raiz do projeto com o seguinte conteúdo:

DB_HOST=localhost
DB_PORT=5432
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=finance_manager

JWT_SECRET=sua-chave-jwt
JWT_EXPIRES_IN=1d
JWT_REFRESH_SECRET=sua-chave-refresh
JWT_REFRESH_EXPIRES_IN=7d

⚠️ Certifique-se de que o PostgreSQL está rodando e que o banco foi criado.

### 4. Rode as migrations
npm run typeorm migration:run

### 5.Inicie o Servidor
npm run dev

A API estará disponível em:
http://localhost:3000

 Autenticação
POST /api/auth/register

{ "name": "Allysson", "email": "allysson@email.com", "password": "123456" }

POST /api/auth/login

{ "email": "allysson@email.com", "password": "123456" }

Retorna: token, refreshToken e dados do usuário

🔐 Rota protegida
GET /api/auth/profile

Header:
Authorization: Bearer SEU_TOKEN_JWT

- Requisitos
Node.js 18+ ou 20+

PostgreSQL 13+

Scripts úteis:

npm run dev        # Inicia a API em modo de desenvolvimento
npm run typeorm    # Acesso a comandos do TypeORM com ts-node

