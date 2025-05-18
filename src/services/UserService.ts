import { AppDataSource } from '../database/data-source';
import { User } from '../entities/User';
import { Repository } from 'typeorm';

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
      const error = new Error('Email já cadastrado');
      (error as any).code = '23505'; // Código de erro PostgreSQL para violação de unique
      throw error;
    }

    const user = this.userRepository.create(userData);
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
}