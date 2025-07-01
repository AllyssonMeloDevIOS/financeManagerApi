import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { authConfig } from '../config/auth';

interface JwtPayload {
  id: string;
}


export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = jwt.verify(token, authConfig.secret as string) as JwtPayload;
    console.log('[AUTH] Token OK. User ID extraído:', decoded.id);

    req.user = { id: decoded.id };
    next();
  } catch (error: any) {
    console.error('[AUTH ERROR]', error);
    return res.status(401).json({ error: 'Token inválido ou expirado' });
  }
}
