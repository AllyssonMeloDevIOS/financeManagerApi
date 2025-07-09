// src/dtos/CreateCategoryDTO.ts
import { IsNotEmpty } from 'class-validator';

export class CreateCategoryDTO {
  @IsNotEmpty({ message: 'O nome da categoria é obrigatório' })
  name!: string;
}