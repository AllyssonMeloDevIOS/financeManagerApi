import { Request, Response } from 'express';
import { UserService } from '../services/UserServiceFixed';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import bcrypt from 'bcrypt';
import { User } from '../entities/User';
import { LoginDTO } from '../dtos/LoginDTO';

export class AuthController {
  constructor(private userService: UserService = new UserService()) {
        this.register = this.register.bind(this);
        this.login = this.login.bind(this);
        this.listUsers = this.listUsers.bind(this);
        this.refreshToken = this.refreshToken.bind(this);
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
      const user = await this.userService.createUser({
        name,
        email,
        password
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

  async login(req: Request, res: Response) {
      try {
          // 1. Validação dos dados de entrada
          const loginData = plainToInstance(LoginDTO, req.body);
          const validationErrors = await validate(loginData);

          if (validationErrors.length > 0) {
              const errorMessages = validationErrors.flatMap(error =>
                  Object.values(error.constraints || {})
              );
              return res.status(400).json({ errors: errorMessages });
          }

          const { email, password } = req.body;

          // 2. Autenticação
          console.log(`[LOGIN] Tentativa de login para: ${email}`);
          const user = await this.userService.authenticate(email, password);

          // 3. Geração dos tokens
          const token = this.userService.generateToken(user);
          const refreshToken = this.userService.generateRefreshToken(user);

          console.log(`[LOGIN] Login bem-sucedido para: ${email}`);

          // 4. Retorno dos tokens e dados do usuário
          return res.json({
              user: {
                  id: user.id,
                  name: user.name,
                  email: user.email,
                  createdAt: user.createdAt
              },
              token,
              refreshToken
          });

      } catch (error: any) {
          console.error('[LOGIN ERROR]', error.message);
          return res.status(401).json({
              error: 'Credenciais inválidas',
              ...(process.env.NODE_ENV === 'development' && {
                  details: error.message
              })
          });
      }
  }

    // NOVO MÉTODO: Refresh Token
    async refreshToken(req: Request, res: Response) {
      try {
        const { refreshToken } = req.body;

        if (!refreshToken) {
          return res.status(400).json({ error: 'Refresh token é obrigatório' });
        }

        // Verifica o refresh token
        const decoded = await this.userService.verifyRefreshToken(refreshToken);

        // Obtém o usuário
        const user = await this.userService.getUserById(decoded.id);

        if (!user) {
          return res.status(401).json({ error: 'Usuário não encontrado' });
        }

        // Gera novos tokens
        const newToken = this.userService.generateToken(user);
        const newRefreshToken = this.userService.generateRefreshToken(user);

        return res.json({
          token: newToken,
          refreshToken: newRefreshToken
        });
      } catch (error) {
        console.error('Refresh token error:', error);
        return res.status(401).json({ error: 'Refresh token inválido ou expirado' });
      }
    }
async getProfile(req: Request, res: Response) {
  const user = await this.userService.getUserById(req.user.id);
  return res.json(user);
}


}