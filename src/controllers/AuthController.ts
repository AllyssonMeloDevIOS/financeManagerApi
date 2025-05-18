import { Request, Response } from 'express';
import { UserService } from '../services/UserService';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import bcrypt from 'bcrypt';
import { User } from '../entities/User';

export class AuthController {
  constructor(private userService: UserService = new UserService()) {
    this.register = this.register.bind(this);
    this.listUsers = this.listUsers.bind(this);
  }

  async register(req: Request, res: Response) {
    try {
      const userInput = plainToInstance(User, req.body);
      const validationErrors = await validate(userInput);

      if (validationErrors.length > 0) {
        const errorMessages = validationErrors.flatMap(error =>
          Object.values(error.constraints || {})
        );
        return res.status(400).json({ errors: errorMessages });
      }

      const { name, email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await this.userService.createUser({
        name,
        email,
        password: hashedPassword
      });

      return res.status(201).json({
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt
      });
    } catch (error: any) {
      console.error('Registration error:', error);
      const status = error.code === '23505' ? 409 : 500;
      const message = status === 409
        ? 'Email já cadastrado'
        : 'Erro interno no servidor';

      return res.status(status).json({
        error: message,
        ...(process.env.NODE_ENV === 'development' && {
          details: error.message
        })
      });
    }
  }

  async listUsers(req: Request, res: Response) {
    try {
      const page = Math.max(1, parseInt(req.query.page as string) || 1);
      const limit = Math.min(100, parseInt(req.query.limit as string) || 10);

      const result = await this.userService.listUsers({ page, limit });
      return res.json(result);
    } catch (error: any) {
      console.error('Error listing users:', error);
      return res.status(500).json({
        error: 'Erro ao listar usuários',
        ...(process.env.NODE_ENV === 'development' && {
          details: error.message
        })
      });
    }
  }
}