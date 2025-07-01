// src/services/UserService.ts
import { AppDataSource } from '../database/data-source';
import { User } from '../entities/User';
import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { authConfig } from '../config/auth';

export class UserService {
  private userRepository: Repository<User>;

  constructor() {
    this.userRepository = AppDataSource.getRepository(User);
  }

  async createUser(userData: { name: string; email: string; password: string }) {
    const existingUser = await this.userRepository.findOne({
      where: { email: userData.email }
    });

    if (existingUser) {
      throw new Error('Email já cadastrado');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userData.password, salt);

    const user = this.userRepository.create({
      name: userData.name,
      email: userData.email,
      password: hashedPassword
    });

    await this.userRepository.save(user);

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt
    };
  }

  async listUsers(pagination: { page: number; limit: number } = { page: 1, limit: 10 }) {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }

    const [users, total] = await this.userRepository.findAndCount({
      select: ['id', 'name', 'email', 'createdAt'],
      skip: (pagination.page - 1) * pagination.limit,
      take: pagination.limit,
      order: { createdAt: 'DESC' }
    });

    return {
      data: users,
      meta: {
        total,
        page: pagination.page,
        limit: pagination.limit,
        totalPages: Math.ceil(total / pagination.limit)
      }
    };
  }

  async authenticate(email: string, password: string) {
    const user = await this.userRepository.findOne({
      where: { email },
      select: ['id', 'name', 'email', 'password', 'createdAt']
    });

// console.log('[DEBUG] Usuário carregado:', user.name, user.email);

    if (!user) {
      throw new Error('Credenciais inválidas');
    }

// console.log('[DEBUG] Senha recebida:', password);
// console.log('[DEBUG] Hash armazenado:', user.password);

    const passwordMatch = await bcrypt.compare(password, user.password);
// console.log('[DEBUG] Resultado da comparação:', passwordMatch);


    if (!passwordMatch) {
      throw new Error('Credenciais inválidas');
    }

    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  generateToken(user: { id: string }) {
    return jwt.sign(
      { id: user.id },
      authConfig.secret,
      { expiresIn: authConfig.expiresIn }
    );
  }

  generateRefreshToken(user: { id: string }) {
    return jwt.sign(
      { id: user.id },
      authConfig.refreshSecret,
      { expiresIn: authConfig.refreshExpiresIn }
    );
  }

  verifyRefreshToken(token: string) {
      // Forçando o tipo para string diretamente no jwt.verify
      const refreshSecretKey: string = authConfig.refreshSecret;
      return jwt.verify(token, refreshSecretKey) as { id: string };
    }

  async getUserById(id: string) {
    return this.userRepository.findOne({
      where: { id },
      select: ['id', 'name', 'email', 'createdAt']
    });
  }

  async updateUser(id: string, data: Partial<User>) {
    const repo = AppDataSource.getRepository(User);
    const user = await repo.findOneBy({ id });
    if (!user) throw new Error('Usuário não encontrado');

    Object.assign(user, data);
    return await repo.save(user);
  }

  async deleteUser(id: string) {
    const repo = AppDataSource.getRepository(User);
    const result = await repo.delete(id);
    if (result.affected === 0) throw new Error('Usuário não encontrado');
  }


}
