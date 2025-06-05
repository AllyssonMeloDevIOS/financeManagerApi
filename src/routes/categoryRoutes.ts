import { Router } from 'express';
import { authMiddleware } from '../middleware/authMiddleware';
import { CategoryController } from '../controllers/CategoryController';

const router = Router();
const controller = new CategoryController();

router.post('/', authMiddleware, controller.create);
router.get('/', authMiddleware, controller.list);

export default router;
