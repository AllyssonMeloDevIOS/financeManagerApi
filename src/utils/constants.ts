export const JWT_CONFIG = {
  SECRET: process.env.JWT_SECRET!,
  EXPIRES_IN: '1d'
};

export const BCRYPT_SALT_ROUNDS = 10;