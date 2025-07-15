import { Request, Response } from 'express';
import { UserService } from '../services/UserService';
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
        this.getProfile = this.getProfile.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
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

        const token = this.userService.generateToken(user);
        const refreshToken = this.userService.generateRefreshToken(user);

        return res.status(201).json({
            accessToken: token,
            refreshToken
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
      } catch (error: any) {
        console.error('Refresh token error:', error);
        return res.status(401).json({ error: 'Refresh token inválido ou expirado' });
      }
    }
async getProfile(req: Request, res: Response) {
    try {
        const user = await this.userService.getUserById(req.user!.id);

        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado' });

            }
        return res.json(user);
        } catch (error: any) {
            console.error('[PROFILE ERROR]', error);
            return res.status(500).json({ error: 'Erro ao carregar perfil' })

            }

}

async update(req: Request, res: Response) {
  try {
    const { name, email, password } = req.body;

    const user = await this.userService.updateUser(req.user!.id, { name, email, password });

    return res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      updatedAt: user.updatedAt
    });
  } catch (error: any) {
    console.error('[UPDATE USER ERROR]', error);
    return res.status(500).json({ error: 'Erro ao atualizar o usuário' });
  }
}

async delete(req: Request, res: Response) {
  try {
    await this.userService.deleteUser(req.user!.id);
    return res.status(204).send();
  } catch (error: any) {
    console.error('[DELETE USER ERROR]', error);
    return res.status(500).json({ error: 'Erro ao deletar o usuário' });
  }
}



}