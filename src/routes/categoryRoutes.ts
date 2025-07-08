// src/routes/categoryRoutes.ts
import { Router } from 'express';
import { authMiddleware } from '../middleware/authMiddleware';
import { CategoryController } from '../controllers/CategoryController';

const router = Router();
const controller = new CategoryController();

/**
 * @swagger
 * tags:
 * name: Categorias
 * description: Gerenciamento de categorias de transações.
 */

/**
 * @swagger
 * /api/categories:
 * post:
 * summary: Cria uma nova categoria para o usuário autenticado
 * tags: [Categorias]
 * security:
 * - bearerAuth: [] # Indica que esta rota requer autenticação JWT
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/CreateCategoryDTO' # Reutiliza o schema definido no DTO
 * responses:
 * 201:
 * description: Categoria criada com sucesso.
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/Category' # Retorna a categoria completa
 * 400:
 * description: Dados de entrada inválidos.
 * 401:
 * description: Não autorizado (token JWT ausente ou inválido).
 * 500:
 * description: Erro interno do servidor.
 */
router.post('/', authMiddleware, controller.create);

/**
 * @swagger
 * /api/categories:
 * get:
 * summary: Lista todas as categorias do usuário autenticado
 * tags: [Categorias]
 * security:
 * - bearerAuth: [] # Indica que esta rota requer autenticação JWT
 * responses:
 * 200:
 * description: Lista de categorias retornada com sucesso.
 * content:
 * application/json:
 * schema:
 * type: array
 * items:
 * $ref: '#/components/schemas/Category' # Retorna uma lista de categorias
 * 401:
 * description: Não autorizado (token JWT ausente ou inválido).
 * 500:
 * description: Erro interno do servidor.
 */
router.get('/', authMiddleware, controller.list);

/**
 * @swagger
 * /api/categories/{id}:
 * put:
 * summary: Atualiza uma categoria existente
 * tags: [Categorias]
 * security:
 * - bearerAuth: [] # Indica que esta rota requer autenticação JWT
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: string
 * format: uuid
 * description: ID da categoria a ser atualizada.
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * required:
 * - name
 * properties:
 * name:
 * type: string
 * description: Novo nome da categoria.
 * example: Lazer
 * responses:
 * 200:
 * description: Categoria atualizada com sucesso.
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/Category' # Retorna a categoria atualizada
 * 400:
 * description: Dados de entrada inválidos.
 * 401:
 * description: Não autorizado.
 * 404:
 * description: Categoria não encontrada.
 * 500:
 * description: Erro interno do servidor.
 */
router.put('/:id', authMiddleware, controller.update);

/**
 * @swagger
 * /api/categories/{id}:
 * delete:
 * summary: Deleta uma categoria
 * tags: [Categorias]
 * security:
 * - bearerAuth: [] # Indica que esta rota requer autenticação JWT
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: string
 * format: uuid
 * description: ID da categoria a ser deletada.
 * responses:
 * 204:
 * description: Categoria deletada com sucesso (sem conteúdo).
 * 401:
 * description: Não autorizado.
 * 404:
 * description: Categoria não encontrada ou não pertence ao usuário.
 * 500:
 * description: Erro interno do servidor.
 */
router.delete('/:id', authMiddleware, controller.delete);

export default router;