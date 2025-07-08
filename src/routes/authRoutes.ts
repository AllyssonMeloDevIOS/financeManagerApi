// src/routes/authRoutes.ts
import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';
import { celebrate, Joi, Segments } from 'celebrate';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();
const authController = new AuthController();

/**
 * @swagger
 * tags:
 * name: Autenticação e Usuários
 * description: Gerenciamento de registro, login, perfil e listagem de usuários.
 */

/**
 * @swagger
 * /api/auth/register:
 * post:
 * summary: Registra um novo usuário
 * tags: [Autenticação e Usuários]
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * required:
 * - name
 * - email
 * - password
 * properties:
 * name:
 * type: string
 * description: Nome completo do usuário.
 * example: João Silva
 * email:
 * type: string
 * format: email
 * description: Email único do usuário.
 * example: joao.silva@example.com
 * password:
 * type: string
 * format: password
 * description: Senha do usuário (mínimo 6 caracteres).
 * example: senhaforte123
 * responses:
 * 201:
 * description: Usuário registrado com sucesso.
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * id:
 * type: string
 * format: uuid
 * name:
 * type: string
 * email:
 * type: string
 * createdAt:
 * type: string
 * format: date-time
 * 400:
 * description: Dados de entrada inválidos.
 * 409:
 * description: Email já cadastrado.
 * 500:
 * description: Erro interno do servidor.
 */
router.post('/register', authController.register);

/**
 * @swagger
 * /api/auth/login:
 * post:
 * summary: Autentica um usuário e retorna tokens JWT
 * tags: [Autenticação e Usuários]
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/LoginDTO' # Reutiliza o schema definido no LoginDTO
 * responses:
 * 200:
 * description: Login bem-sucedido.
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * user:
 * type: object
 * properties:
 * id:
 * type: string
 * format: uuid
 * name:
 * type: string
 * email:
 * type: string
 * createdAt:
 * type: string
 * format: date-time
 * token:
 * type: string
 * description: Token de acesso JWT.
 * refreshToken:
 * type: string
 * description: Token de atualização JWT.
 * 400:
 * description: Dados de entrada inválidos.
 * 401:
 * description: Credenciais inválidas.
 * 500:
 * description: Erro interno do servidor.
 */
router.post(
    '/login',
    celebrate({
        [Segments.BODY]: Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().min(6).required()
        })
    }),
    authController.login
);

/**
 * @swagger
 * /api/auth/users:
 * get:
 * summary: Lista todos os usuários (com paginação)
 * tags: [Autenticação e Usuários]
 * security:
 * - bearerAuth: [] # Indica que esta rota requer autenticação JWT
 * parameters:
 * - in: query
 * name: page
 * schema:
 * type: integer
 * minimum: 1
 * description: Número da página (padrão: 1)
 * - in: query
 * name: limit
 * schema:
 * type: integer
 * minimum: 1
 * maximum: 100
 * description: Limite de usuários por página (padrão: 10, máximo: 100)
 * responses:
 * 200:
 * description: Lista de usuários retornada com sucesso.
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * data:
 * type: array
 * items:
 * type: object
 * properties:
 * id:
 * type: string
 * name:
 * type: string
 * email:
 * type: string
 * createdAt:
 * type: string
 * format: date-time
 * meta:
 * type: object
 * properties:
 * total:
 * type: integer
 * page:
 * type: integer
 * limit:
 * type: integer
 * totalPages:
 * type: integer
 * 401:
 * description: Não autorizado (token JWT ausente ou inválido).
 * 500:
 * description: Erro interno do servidor.
 */
router.get('/users', authController.listUsers);

/**
 * @swagger
 * /api/auth/health:
 * get:
 * summary: Verifica a saúde da API
 * tags: [Autenticação e Usuários]
 * responses:
 * 200:
 * description: API está funcionando.
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * status:
 * type: string
 * example: OK
 */
router.get('/health', (_req, res) => {
    res.status(200).json({ status: 'OK' });
});

/**
 * @swagger
 * /api/auth/profile:
 * get:
 * summary: Obtém o perfil do usuário autenticado
 * tags: [Autenticação e Usuários]
 * security:
 * - bearerAuth: [] # Indica que esta rota requer autenticação JWT
 * responses:
 * 200:
 * description: Perfil do usuário retornado com sucesso.
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * id:
 * type: string
 * format: uuid
 * name:
 * type: string
 * email:
 * type: string
 * createdAt:
 * type: string
 * format: date-time
 * 401:
 * description: Não autorizado (token JWT ausente ou inválido).
 * 404:
 * description: Usuário não encontrado.
 * 500:
 * description: Erro interno do servidor.
 */
router.get('/profile', authMiddleware, authController.getProfile);

/**
 * @swagger
 * /api/auth/{id}:
 * put:
 * summary: Atualiza o perfil do usuário
 * tags: [Autenticação e Usuários]
 * security:
 * - bearerAuth: []
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: string
 * format: uuid
 * description: ID do usuário a ser atualizado.
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * name:
 * type: string
 * description: Novo nome do usuário.
 * email:
 * type: string
 * format: email
 * description: Novo email do usuário.
 * password:
 * type: string
 * format: password
 * description: Nova senha do usuário.
 * responses:
 * 200:
 * description: Usuário atualizado com sucesso.
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * id:
 * type: string
 * name:
 * type: string
 * email:
 * type: string
 * updatedAt:
 * type: string
 * format: date-time
 * 400:
 * description: Dados de entrada inválidos.
 * 401:
 * description: Não autorizado.
 * 404:
 * description: Usuário não encontrado.
 * 500:
 * description: Erro interno do servidor.
 */
router.put('/:id', authMiddleware, authController.update);

/**
 * @swagger
 * /api/auth/{id}:
 * delete:
 * summary: Deleta um usuário
 * tags: [Autenticação e Usuários]
 * security:
 * - bearerAuth: []
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: string
 * format: uuid
 * description: ID do usuário a ser deletado.
 * responses:
 * 204:
 * description: Usuário deletado com sucesso (sem conteúdo).
 * 401:
 * description: Não autorizado.
 * 404:
 * description: Usuário não encontrado.
 * 500:
 * description: Erro interno do servidor.
 */
router.delete('/:id', authMiddleware, authController.delete);


export default router;