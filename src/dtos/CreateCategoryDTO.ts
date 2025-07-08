// src/dtos/CreateCategoryDTO.ts
import { IsNotEmpty } from 'class-validator';

/**
 * @swagger
 * components:
 * schemas:
 * CreateCategoryDTO:
 * type: object
 * required:
 * - name
 * properties:
 * name:
 * type: string
 * description: Nome da nova categoria.
 * example: Alimentação
 */
export class CreateCategoryDTO {
  @IsNotEmpty({ message: 'O nome da categoria é obrigatório' })
  name!: string;
}