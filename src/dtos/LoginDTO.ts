// src/dtos/LoginDTO.ts
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

/**
 * @swagger
 * components:
 * schemas:
 * LoginDTO:
 * type: object
 * required:
 * - email
 * - password
 * properties:
 * email:
 * type: string
 * format: email
 * description: Email do usuário para login.
 * example: usuario@example.com
 * password:
 * type: string
 * format: password
 * description: Senha do usuário para login (mínimo 6 caracteres).
 * example: senha123
 */
export class LoginDTO {
  @IsEmail({}, { message: 'Email inválido' })
  email!: string;

  @IsNotEmpty({ message: 'A senha é obrigatória' })
  @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres' })
  password!: string;
}