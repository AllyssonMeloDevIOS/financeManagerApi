// src/entities/Transaction.ts
import {
  Entity, PrimaryGeneratedColumn, Column,
  ManyToOne, CreateDateColumn, UpdateDateColumn
} from 'typeorm';
import { User } from './User';
import { Category } from './Category';

export type TransactionType = 'receita' | 'despesa';

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
