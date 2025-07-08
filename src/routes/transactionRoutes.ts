// src/routes/transactionRoutes.ts
import { Router } from 'express';
import { TransactionController } from '../controllers/TransactionController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();
const transactionController = new TransactionController();

/**
 * @swagger
 * tags:
 * name: Transações
 * description: Gerenciamento de transações financeiras (receitas e despesas).
 */

/**
 * @swagger
 * /api/transactions:
 * post:
 * summary: Cria uma nova transação para o usuário autenticado
 * tags: [Transações]
 * security:
 * - bearerAuth: [] # Indica que esta rota requer autenticação JWT
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/CreateTransactionDTO' # Reutiliza o schema do DTO
 * responses:
 * 201:
 * description: Transação criada com sucesso.
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/Transaction' # Retorna a transação completa
 * 400:
 * description: Dados de entrada inválidos.
 * 401:
 * description: Não autorizado (token JWT ausente ou inválido).
 * 404:
 * description: Categoria inválida ou não pertence ao usuário.
 * 500:
 * description: Erro interno do servidor.
 */
router.post('/', authMiddleware, transactionController.create);

/**
 * @swagger
 * /api/transactions/{id}:
 * put:
 * summary: Atualiza uma transação existente
 * tags: [Transações]
 * security:
 * - bearerAuth: [] # Indica que esta rota requer autenticação JWT
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: string
 * format: uuid
 * description: ID da transação a ser atualizada.
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * title:
 * type: string
 * description: Novo título da transação.
 * example: Supermercado
 * value:
 * type: number
 * format: float
 * description: Novo valor da transação.
 * example: 250.75
 * type:
 * type: string
 * enum: [receita, despesa]
 * description: Novo tipo da transação.
 * example: despesa
 * date:
 * type: string
 * format: date
 * description: Nova data da transação no formato YYYY-MM-DD.
 * example: 2025-07-08
 * categoryId:
 * type: string
 * format: uuid
 * description: Novo ID da categoria da transação.
 * example: a1b2c3d4-e5f6-7890-1234-567890abcdef
 * responses:
 * 200:
 * description: Transação atualizada com sucesso.
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/Transaction' # Retorna a transação atualizada
 * 400:
 * description: Dados de entrada inválidos.
 * 401:
 * description: Não autorizado.
 * 404:
 * description: Transação não encontrada.
 * 500:
 * description: Erro interno do servidor.
 */
router.put('/:id', authMiddleware, transactionController.update);

/**
 * @swagger
 * /api/transactions/{id}:
 * delete:
 * summary: Deleta uma transação
 * tags: [Transações]
 * security:
 * - bearerAuth: [] # Indica que esta rota requer autenticação JWT
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: string
 * format: uuid
 * description: ID da transação a ser deletada.
 * responses:
 * 204:
 * description: Transação deletada com sucesso (sem conteúdo).
 * 401:
 * description: Não autorizado.
 * 404:
 * description: Transação não encontrada ou não pertence ao usuário.
 * 500:
 * description: Erro interno do servidor.
 */
router.delete('/:id', authMiddleware, transactionController.delete);

export default router;