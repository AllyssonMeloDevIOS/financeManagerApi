import { Router } from 'express';
import { authMiddleware } from '../middleware/authMiddleware';
import { DashboardController } from '../controllers/DashboardController';

const router = Router();

router.get('/', authMiddleware, DashboardController.getDashboard);
router.get('/monthly', authMiddleware, DashboardController.getMonthlyDashboard);

export default router;
