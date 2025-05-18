import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';

const router = Router();
const authController = new AuthController();

// Rotas públicas
router.post('/register', authController.register);
router.get('/users', authController.listUsers);
router.get('/health', (_req, res) => {
  res.status(200).json({ status: 'OK' });
});

export default router;