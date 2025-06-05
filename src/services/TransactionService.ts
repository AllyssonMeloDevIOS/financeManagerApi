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

    // Verifica se a categoria existe e pertence ao usuário
    const category = await this.categoryRepository.findOne({
      where: { id: categoryId, user: { id: userId } }
    });

    if (!category) {
      throw new Error('Categoria inválida ou não pertence ao usuário');
    }

    // Cria a transação
    const transaction = this.transactionRepository.create({
      title,
      value,
      type,
      date: new Date(date),
      user: { id: userId },
      category
    });

    // Salva no banco
    const savedTransaction = await this.transactionRepository.save(transaction);

    // Retorna resposta formatada
    return {
      transactionId: savedTransaction.id,
      title: savedTransaction.title,
      value: savedTransaction.value,
      type: savedTransaction.type,
      date: savedTransaction.date,
      createdAt: savedTransaction.createdAt,
      updatedAt: savedTransaction.updatedAt,
      user: {
        userId: savedTransaction.user.id
      },
      category: {
        categoryId: category.id,
        name: category.name,
        createdAt: category.createdAt,
        updatedAt: category.updatedAt
      }
    };
  }
}
