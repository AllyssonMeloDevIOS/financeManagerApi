import { Router } from 'express';
import { TransactionController } from '../controllers/TransactionController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();
const transactionController = new TransactionController();

router.post('/', authMiddleware, transactionController.create);

export default router;
