/**
 * @swagger
 * components:
 *   schemas:
 *     LoginDTO:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: Email do usuário para login.
 *           example: usuario@example.com
 *         password:
 *           type: string
 *           format: password
 *           description: Senha do usuário para login (mínimo 6 caracteres).
 *           example: senha123
 */



/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: ID único do usuário.
 *           example: d1e2f3g4-h5i6-7890-1234-567890abcdef
 *         name:
 *           type: string
 *           description: Nome completo do usuário.
 *           example: Maria Souza
 *         email:
 *           type: string
 *           format: email
 *           description: Endereço de email do usuário.
 *           example: maria@example.com
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Data de criação.
 *           example: 2025-01-01T12:00:00Z
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Data da última atualização.
 *           example: 2025-01-02T14:30:00Z
 */


/**
 * @swagger
 * components:
 *   schemas:
 *     CreateCategoryDTO:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *           description: Nome da categoria.
 *           example: Alimentação
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: ID único da categoria.
 *           example: 123e4567-e89b-12d3-a456-426614174000
 *         name:
 *           type: string
 *           description: Nome da categoria.
 *           example: Transporte
 *         user:
 *           $ref: '#/components/schemas/User'
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: 2025-07-01T12:00:00Z
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: 2025-07-01T14:00:00Z
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CreateTransactionDTO:
 *       type: object
 *       required:
 *         - title
 *         - value
 *         - type
 *         - categoryId
 *         - date
 *       properties:
 *         title:
 *           type: string
 *           description: Título da transação.
 *           example: Salário de Junho
 *         value:
 *           type: number
 *           format: double
 *           description: Valor da transação.
 *           example: 4500.00
 *         type:
 *           type: string
 *           enum: [receita, despesa]
 *           description: Tipo da transação.
 *           example: receita
 *         categoryId:
 *           type: string
 *           format: uuid
 *           description: ID da categoria associada.
 *           example: a1b2c3d4-e5f6-7890-abcd-1234567890ef
 *         date:
 *           type: string
 *           format: date-time
 *           description: Data da transação.
 *           example: 2025-06-30T12:00:00Z
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Transaction:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: 223e4567-e89b-12d3-a456-426614174111
 *         title:
 *           type: string
 *           example: Compra no mercado
 *         value:
 *           type: number
 *           format: double
 *           example: 123.45
 *         type:
 *           type: string
 *           enum: [receita, despesa]
 *           example: despesa
 *         date:
 *           type: string
 *           format: date-time
 *           example: 2025-07-01T18:00:00Z
 *         category:
 *           $ref: '#/components/schemas/Category'
 *         user:
 *           $ref: '#/components/schemas/User'
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: 2025-07-01T18:00:00Z
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: 2025-07-01T19:00:00Z
 */

/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: Rotas de autenticação e gerenciamento de usuários
 *   - name: Categories
 *     description: Rotas para gerenciar categorias financeiras
 *   - name: Transactions
 *     description: Rotas para gerenciar transações financeiras
 *   - name: Dashboard
 *     description: Rotas para obter dados agregados
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     tags: [Auth]
 *     summary: Registrar novo usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       400:
 *         description: Dados inválidos
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags: [Auth]
 *     summary: Login do usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginDTO'
 *     responses:
 *       200:
 *         description: Login bem-sucedido (token JWT retornado)
 *       401:
 *         description: Credenciais inválidas
 */

/**
 * @swagger
 * /auth/profile:
 *   get:
 *     tags: [Auth]
 *     summary: Retorna o perfil do usuário autenticado
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Perfil do usuário retornado com sucesso
 *       401:
 *         description: Token inválido ou ausente
 */

/**
 * @swagger
 * /auth/users:
 *   get:
 *     tags: [Auth]
 *     summary: Lista todos os usuários (geralmente para debug/admin)
 *     responses:
 *       200:
 *         description: Lista de usuários
 */

/**
 * @swagger
 * /auth/{id}:
 *   put:
 *     tags: [Auth]
 *     summary: Atualiza dados de um usuário
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *
 *   delete:
 *     tags: [Auth]
 *     summary: Deleta um usuário
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Usuário deletado com sucesso
 */

/**
 * @swagger
 * /categories:
 *   post:
 *     tags: [Categories]
 *     summary: Cria uma nova categoria
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateCategoryDTO'
 *     responses:
 *       201:
 *         description: Categoria criada com sucesso
 *
 *   get:
 *     tags: [Categories]
 *     summary: Lista todas as categorias do usuário
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de categorias
 *
 * /categories/{id}:
 *   put:
 *     tags: [Categories]
 *     summary: Atualiza uma categoria
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateCategoryDTO'
 *     responses:
 *       200:
 *         description: Categoria atualizada
 *
 *   delete:
 *     tags: [Categories]
 *     summary: Deleta uma categoria
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Categoria removida
 */

/**
 * @swagger
 * /transactions:
 *   post:
 *     tags: [Transactions]
 *     summary: Cria uma nova transação
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateTransactionDTO'
 *     responses:
 *       201:
 *         description: Transação criada
 *
 * /transactions/{id}:
 *   put:
 *     tags: [Transactions]
 *     summary: Atualiza uma transação
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateTransactionDTO'
 *     responses:
 *       200:
 *         description: Transação atualizada
 *
 *   delete:
 *     tags: [Transactions]
 *     summary: Remove uma transação
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Transação removida
 */

/**
 * @swagger
 * /dashboard:
 *   get:
 *     tags: [Dashboard]
 *     summary: Obtém resumo geral de receitas e despesas
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Resumo retornado
 *
 * /dashboard/monthly:
 *   get:
 *     tags: [Dashboard]
 *     summary: Obtém resumo mensal detalhado
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Resumo mensal retornado
 */