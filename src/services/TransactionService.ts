import { AppDataSource } from '../database/data-source';
import { Transaction } from '../entities/Transaction';
import { Category } from '../entities/Category';
import { Repository } from 'typeorm';
import { CreateTransactionDTO } from '../dtos/CreateTransactionDTO';

export class TransactionService {
  private transactionRepository: Repository<Transaction>;
  private categoryRepository: Repository<Category>;

  constructor() {
    this.transactionRepository = AppDataSource.getRepository(Transaction);
    this.categoryRepository = AppDataSource.getRepository(Category);
  }

  async createTransaction(data: CreateTransactionDTO, userId: string) {
    const { title, value, type, date, categoryId } = data;

    // 1. Verifica se a categoria existe e pertence ao usuário
    const category = await this.categoryRepository.findOne({
      where: { id: categoryId, user: { id: userId } }
    });

    if (!category) {
      throw new Error('Categoria inválida ou não pertence ao usuário');
    }

    // 2. Cria a transação
    const transaction = this.transactionRepository.create({
      title,
      value,
      type,
      date: new Date(date),
      user: { id: userId },
      category
    });

    // 3. Salva no banco
    await this.transactionRepository.save(transaction);

    return transaction;
  }

  async updateTransaction(id: string, userId: string, data: Partial<Transaction>) {
    const repo = AppDataSource.getRepository(Transaction);
    const transaction = await repo.findOne({ where: { id, user: { id: userId } } });

    if (!transaction) throw new Error('Transação não encontrada');

    Object.assign(transaction, data);
    return await repo.save(transaction);
  }

  async deleteTransaction(id: string, userId: string) {
    const repo = AppDataSource.getRepository(Transaction);
    const result = await repo.delete({ id, user: { id: userId } });

    if (result.affected === 0) throw new Error('Transação não encontrada ou não pertence ao usuário');
  }


}
