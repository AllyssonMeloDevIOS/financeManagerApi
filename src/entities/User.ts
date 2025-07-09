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