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

  async updateCategory(id: string, userId: string, name: string) {

     const repo = AppDataSource.getRepository(Category);
       const category = await repo.findOne({ where: { id, user: { id: userId } } });

       if (!category) throw new Error('Categoria não encontrada');
       category.name = name;
       return await repo.save(category);
     }

     async deleteCategory(id: string, userId: string) {
       const repo = AppDataSource.getRepository(Category);
       const result = await repo.delete({ id, user: { id: userId } });

       if (result.affected === 0) throw new Error('Categoria não encontrada ou não pertence ao usuário');
     }

      }
