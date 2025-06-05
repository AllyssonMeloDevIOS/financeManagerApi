import { AppDataSource } from '../database/data-source';
import { Category } from '../entities/Category';
import { Repository } from 'typeorm';
import { CreateCategoryDTO } from '../dtos/CreateCategoryDTO';

export class CategoryService {
  private categoryRepository: Repository<Category>;

  constructor() {
    this.categoryRepository = AppDataSource.getRepository(Category);
  }

  async createCategory(data: CreateCategoryDTO, userId: string) {
    const category = this.categoryRepository.create({
      name: data.name,
      user: { id: userId }
    });

    const savedCategory = await this.categoryRepository.save(category);

    // Monta um objeto customizado para a resposta:
    return {
      categoryId: savedCategory.id,
      name: savedCategory.name,
      createdAt: savedCategory.createdAt,
      updatedAt: savedCategory.updatedAt,
      userId: savedCategory.user.id,
    };
  }

  async listCategories(userId: string) {
    const categories = await this.categoryRepository.find({
      where: { user: { id: userId } },
      order: { name: 'ASC' }
    });

    // Opcional: montar uma lista customizada para clareza também
    return categories.map(cat => ({
      categoryId: cat.id,
      name: cat.name,
      createdAt: cat.createdAt,
      updatedAt: cat.updatedAt,
      userId: cat.user.id,
    }));
  }
}
