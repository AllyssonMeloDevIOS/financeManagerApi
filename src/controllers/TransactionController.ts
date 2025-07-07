import { Request, Response } from 'express';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { CreateTransactionDTO } from '../dtos/CreateTransactionDTO';
import { TransactionService } from '../services/TransactionService';

export class TransactionController {
  constructor(private transactionService = new TransactionService()) {
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  async create(req: Request, res: Response) {
    try {
      // 1. Converte o body para a instância do DTO
      const input = plainToInstance(CreateTransactionDTO, req.body);

      // 2. Valida o DTO
      const errors = await validate(input);

      if (errors.length > 0) {
        const errorMessages = errors.flatMap(err => Object.values(err.constraints || {}));
        return res.status(400).json({ errors: errorMessages });
      }

      // 3. Pega o ID do usuário logado (vem do middleware de autenticação)
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({ error: 'Usuário não autenticado' });
      }

      // 4. Cria a transação
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

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const userId = req.user!.id;
      const data = req.body;

      const updated = await this.transactionService.updateTransaction(id, userId, data);
      return res.json(updated);
    } catch (err: any) {
      return res.status(500).json({ error: 'Erro ao atualizar transação', details: err.message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const userId = req.user!.id;

      await this.transactionService.deleteTransaction(id, userId);
      return res.status(204).send();
    } catch (err: any) {
      return res.status(500).json({ error: 'Erro ao deletar transação', details: err.message });
    }
  }

}
