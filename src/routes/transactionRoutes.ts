// src/routes/transactionRoutes.ts
import { Router } from 'express';
import { TransactionController } from '../controllers/TransactionController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();
const transactionController = new TransactionController();

router.post('/', authMiddleware, transactionController.create);


router.put('/:id', authMiddleware, transactionController.update);

router.delete('/:id', authMiddleware, transactionController.delete);

export default router;