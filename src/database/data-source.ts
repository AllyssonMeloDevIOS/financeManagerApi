import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from '../entities/User';
import { Category } from '../entities/Category';
import { Transaction } from '../entities/Transaction';
import dotenv from 'dotenv';
import 'dotenv/config';

dotenv.config(); // Carrega as variáveis do .env

// Configurações base para o banco de dados
const baseDbConfig = {
  type: 'postgres',
  synchronize: false, // Em produção, geralmente false. Você roda migrations.
  logging: process.env.NODE_ENV === 'development', // Loga queries em dev
  entities: [User, Category, Transaction],
  migrations: ['src/database/migrations/*.ts'],
};

// Objeto de configuração para o AppDataSource
let dbConfig: any = {};

// Se DATABASE_URL estiver definido (ambiente de produção como Railway)
if (process.env.DATABASE_URL) {
  dbConfig = {
    ...baseDbConfig,
    url: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false // Necessário para Railway e a maioria dos DBs em nuvem
    }
  };
} else {
  // Ambiente de desenvolvimento local (Docker Compose)
  dbConfig = {
    ...baseDbConfig,
    host: process.env.DB_HOST || 'localhost', // USA O DB_HOST DO .ENV (que será 'postgres' no Docker)
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: false // SSL desativado para desenvolvimento local
  };
}

// Seus console.log de DEBUG para verificar as variáveis (mantenha para depuração)
console.log('DEBUG - DB_HOST:', process.env.DB_HOST);
console.log('DEBUG - DB_PORT:', process.env.DB_PORT);
console.log('DEBUG - DB_USER:', process.env.DB_USER);
console.log('DEBUG - DB_PASSWORD:', process.env.DB_PASSWORD ? '******' : 'UNDEFINED/EMPTY');
console.log('DEBUG - DB_NAME:', process.env.DB_NAME);
console.log('DEBUG - DATABASE_URL:', process.env.DATABASE_URL ? '******' : 'UNDEFINED/EMPTY');
console.log('DEBUG - Conectando com:', dbConfig.url ? 'URL' : 'Campos separados');


export const AppDataSource = new DataSource(dbConfig);