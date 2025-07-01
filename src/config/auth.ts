import dotenv from 'dotenv';

dotenv.config();

export const authConfig = {
  secret: process.env.JWT_SECRET || 'default_jwt_secret',
  expiresIn: (process.env.JWT_EXPIRES_IN || '1d') as `${number}${'d' | 'h' | 'm'}`,
  refreshSecret: process.env.JWT_REFRESH_SECRET || 'default_refresh_secret',
  refreshExpiresIn: (process.env.JWT_REFRESH_EXPIRES_IN || '7d') as `${number}${'d' | 'h' | 'm'}`
};
