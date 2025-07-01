import { Request, Response } from 'express';
import { CategoryService } from '../services/CategoryService';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { CreateCategoryDTO } from '../dtos/CreateCategoryDTO';

export class CategoryController {
  constructor(private categoryService = new CategoryService()) {
    this.create = this.create.bind(this);
    this.list = this.list.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  async create(req: Request, res: Response) {
    const input = plainToInstance(CreateCategoryDTO, req.body);
    const errors = await validate(input);

    if (errors.length > 0) {
      const messages = errors.flatMap(e => Object.values(e.constraints || {}));
      return res.status(400).json({ errors: messages });
    }

    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: 'Usuário não autenticado' });

    const category = await this.categoryService.createCategory(input, userId);
    return res.status(201).json(category);
  }

  async list(req: Request, res: Response) {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: 'Usuário não autenticado' });

    const categories = await this.categoryService.listCategories(userId);
    return res.json(categories);
  }
 async update(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const userId = req.user!.id;

    const updated = await this.categoryService.updateCategory(id, userId, name);
    return res.json(updated);
  } catch (err: any) {
    return res.status(500).json({ error: 'Erro ao atualizar categoria', details: err.message });
  }
}
 async delete(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const userId = req.user!.id;

    await this.categoryService.deleteCategory(id, userId);
    return res.status(204).send();
  } catch (err: any) {
    return res.status(500).json({ error: 'Erro ao deletar categoria' });
  }
}

}
