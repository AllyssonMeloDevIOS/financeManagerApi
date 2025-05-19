import dotenv from 'dotenv';

dotenv.config();

export const authConfig = {
  secret: process.env.JWT_SECRET || 'secret-padrao-dev', // Nunca usar em produção!
  expiresIn: process.env.JWT_EXPIRES_IN || '1d',
  refreshSecret: process.env.JWT_REFRESH_SECRET || 'refresh-secret-dev',
  refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d'
};