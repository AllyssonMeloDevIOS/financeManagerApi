// src/index.ts

import 'reflect-metadata';
import 'express-async-errors';
import { errors } from 'celebrate';
import { AppDataSource } from './database/data-source';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

// Importações para o Swagger
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerOptions from './config/swagger'; // Importe suas opções de swagger

// Importe suas rotas
import authRoutes from './routes/authRoutes';
import transactionRoutes from './routes/transactionRoutes';
import categoryRoutes from './routes/categoryRoutes';
import dashboardRoutes from './routes/dashboardRoutes';

class Server {
  private app: express.Application;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
    this.errorHandling();
  }

  private config(): void {
    this.app.use(helmet());
    this.app.use(cors({
      origin: process.env.NODE_ENV === 'production'
          ? ['https://seu-frontend.com']
          : ['http://localhost:3001'],
      credentials: true
    }));
    this.app.use(express.json({ limit: '10kb' }));

    // Geração e setup do Swagger UI
    const swaggerSpec = swaggerJsdoc(swaggerOptions);
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec)); // <--- ADICIONE ESTAS DUAS LINHAS
  }

  private routes(): void {
    this.app.use('/api/auth', authRoutes);
    this.app.use('/api/transactions', transactionRoutes);
    this.app.use('/api/categories', categoryRoutes);
    this.app.use('/api/dashboard', dashboardRoutes);

    this.app.get('/', (_req, res) => {
      res.status(200).json({
        status: 'API running',
        database: AppDataSource.isInitialized ? 'connected' : 'disconnected',
        environment: process.env.NODE_ENV || 'development'
      });
    });
  }

  private errorHandling(): void {
    this.app.use(errors());

    this.app.use((_req, res) => {
      res.status(404).json({ message: 'Endpoint not found' });
    });

    this.app.use((error: Error, _req: express.Request, res: express.Response) => {
      console.error('🔥 Error:', error);
      res.status(500).json({
        error: 'Internal server error',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    });
  }

  public async start(): Promise<void> {
    try {
      await AppDataSource.initialize();
      console.log('📦 Database connected successfully');

      const PORT = process.env.PORT || 3000;
      this.app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
        console.log(`🔗 http://localhost:${PORT}`);
        console.log(`📖 Documentação Swagger: http://localhost:${PORT}/api-docs`); // <--- NOVO LOG
      });
    } catch (error) {
      console.error('❌ Failed to initialize app:', error);
      process.exit(1);
    }
  }
}

new Server().start();