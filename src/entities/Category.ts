// src/entities/Category.ts
import {
  Entity, PrimaryGeneratedColumn, Column,
  ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn
} from 'typeorm';
import { User } from './User';
import { Transaction } from './Transaction';

/**
 * @swagger
 * components:
 * schemas:
 * Category:
 * type: object
 * properties:
 * id:
 * type: string
 * format: uuid
 * description: ID único da categoria.
 * example: a1b2c3d4-e5f6-7890-1234-567890abcdef
 * name:
 * type: string
 * description: Nome da categoria.
 * example: Salário
 * user:
 * $ref: '#/components/schemas/User' # Referência à entidade User
 * transactions:
 * type: array
 * items:
 * $ref: '#/components/schemas/Transaction' # Referência à entidade Transaction
 * createdAt:
 * type: string
 * format: date-time
 * description: Data de criação da categoria.
 * updatedAt:
 * type: string
 * format: date-time
 * description: Última data de atualização da categoria.
 */
@Entity()
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @ManyToOne(() => User, user => user.categories)
  user!: User;

  @OneToMany(() => Transaction, transaction => transaction.category)
  transactions!: Transaction[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}