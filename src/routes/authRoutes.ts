import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';
import { celebrate, Joi, Segments } from 'celebrate';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();
const authController = new AuthController();

// Rotas públicas
router.post('/register', authController.register);
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

router.get('/users', authController.listUsers);
router.get('/health', (_req, res) => {
  res.status(200).json({ status: 'OK' });
});

router.get('/profile', authMiddleware, authController.getProfile);
router.put('/:id', authMiddleware, authController.update);
router.delete('/:id', authMiddleware, authController.delete);


export default router;