// src/entities/User.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  UpdateDateColumn
} from 'typeorm';
import { IsNotEmpty, IsEmail, MinLength, MaxLength } from 'class-validator';
import { Transaction } from './Transaction';
import { Category } from './Category';

/**
 * @swagger
 * components:
 * schemas:
 * User:
 * type: object
 * properties:
 * id:
 * type: string
 * format: uuid
 * description: ID único do usuário.
 * example: d1e2f3g4-h5i6-7890-1234-567890abcdef
 * name:
 * type: string
 * description: Nome completo do usuário.
 * example: Maria Souza
 * email:
 * type: string
 * format: email
 * description: Endereço de email do usuário (único).
 * example: maria.souza@example.com
 * password:
 * type: string
 * format: password
 * description: Senha criptografada do usuário (não retornada em algumas operações).
 * transactions:
 * type: array
 * items:
 * $ref: '#/components/schemas/Transaction' # Referência à entidade Transaction
 * description: Lista de transações associadas a este usuário.
 * categories:
 * type: array
 * items:
 * $ref: '#/components/schemas/Category' # Referência à entidade Category
 * description: Lista de categorias associadas a este usuário.
 * createdAt:
 * type: string
 * format: date-time
 * description: Data e hora de criação do usuário.
 * example: 2025-01-15T10:00:00Z
 * updatedAt:
 * type: string
 * format: date-time
 * description: Última data e hora de atualização do usuário.
 * example: 2025-01-15T10:30:00Z
 */
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ length: 100 })
  @IsNotEmpty()
  @MaxLength(100)
  name!: string;

  @Column({ length: 255, unique: true })
  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @Column({ select: false })
  @IsNotEmpty()
  @MinLength(6)
  password!: string;

  @OneToMany(() => Transaction, transaction => transaction.user)
  transactions!: Transaction[];

  @OneToMany(() => Category, category => category.user)
  categories!: Category[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}