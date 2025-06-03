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

    await this.categoryRepository.save(category);

    return category;
  }

  async listCategories(userId: string) {
    return this.categoryRepository.find({
      where: { user: { id: userId } },
      order: { name: 'ASC' }
    });
  }
}
