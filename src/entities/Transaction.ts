// src/entities/Transaction.ts
import {
  Entity, PrimaryGeneratedColumn, Column,
  ManyToOne, CreateDateColumn, UpdateDateColumn
} from 'typeorm';
import { User } from './User';
import { Category } from './Category';

export type TransactionType = 'receita' | 'despesa';

/**
 * @swagger
 * components:
 * schemas:
 * Transaction:
 * type: object
 * properties:
 * id:
 * type: string
 * format: uuid
 * description: ID único da transação.
 * example: f1e2d3c4-b5a6-9876-5432-10fedcba9876
 * title:
 * type: string
 * description: Título da transação.
 * example: Pagamento de Aluguel
 * value:
 * type: number
 * format: float
 * description: Valor da transação.
 * example: 800.00
 * type:
 * type: string
 * enum: [receita, despesa]
 * description: Tipo da transação.
 * example: despesa
 * date:
 * type: string
 * format: date
 * description: Data da transação.
 * example: 2025-07-05
 * user:
 * $ref: '#/components/schemas/User' # Referência à entidade User
 * category:
 * $ref: '#/components/schemas/Category' # Referência à entidade Category
 * createdAt:
 * type: string
 * format: date-time
 * description: Data e hora de criação da transação.
 * example: 2025-07-05T14:30:00Z
 * updatedAt:
 * type: string
 * format: date-time
 * description: Última data e hora de atualização da transação.
 * example: 2025-07-05T15:00:00Z
 */
@Entity()
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title!: string;

  @Column('decimal', { precision: 10, scale: 2 })
  value!: number;

  @Column()
  type!: TransactionType;

  @Column()
  date!: Date;

  @ManyToOne(() => User, user => user.transactions)
  user!: User;

  @ManyToOne(() => Category, category => category.transactions)
  category!: Category;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}