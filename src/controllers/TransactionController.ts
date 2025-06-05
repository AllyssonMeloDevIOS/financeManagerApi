import { Request, Response } from 'express';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { CreateTransactionDTO } from '../dtos/CreateTransactionDTO';
import { TransactionService } from '../services/TransactionService';

export class TransactionController {
  constructor(private transactionService = new TransactionService()) {
    this.create = this.create.bind(this);
  }

  async create(req: Request, res: Response) {
    try {
      const input = plainToInstance(CreateTransactionDTO, req.body);
      const errors = await validate(input);

      if (errors.length > 0) {
        const errorMessages = errors.flatMap(err => Object.values(err.constraints || {}));
        return res.status(400).json({ errors: errorMessages });
      }

      const userId = req.user?.id;
      if (!userId) {
        return res.status(401).json({ error: 'Usuário não autenticado' });
      }

      const transaction = await this.transactionService.createTransaction(input, userId);

      return res.status(201).json(transaction);
    } catch (error: any) {
      console.error('[TRANSACTION ERROR]', error);
      return res.status(500).json({
        error: 'Erro ao criar transação',
        ...(process.env.NODE_ENV === 'development' && { details: error.message })
      });
    }
  }
}
