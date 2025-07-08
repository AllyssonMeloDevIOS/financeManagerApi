// src/dtos/CreateTransactionDTO.ts
import {
    IsNotEmpty,
    IsUUID,
    IsIn,
    IsNumber,
    IsDateString
} from 'class-validator';

/**
 * @swagger
 * components:
 * schemas:
 * CreateTransactionDTO:
 * type: object
 * required:
 * - title
 * - value
 * - type
 * - categoryId
 * - date
 * properties:
 * title:
 * type: string
 * description: Título da transação (ex: "Salário", "Aluguel").
 * example: Salário Mensal
 * value:
 * type: number
 * format: float
 * description: Valor da transação.
 * example: 1500.00
 * type:
 * type: string
 * enum: [receita, despesa]
 * description: Tipo da transação (receita ou despesa).
 * example: receita
 * categoryId:
 * type: string
 * format: uuid
 * description: ID da categoria à qual a transação pertence.
 * example: a1b2c3d4-e5f6-7890-1234-567890abcdef
 * date:
 * type: string
 * format: date
 * description: Data da transação no formato YYYY-MM-DD.
 * example: 2025-07-08
 */
export class CreateTransactionDTO {
    @IsNotEmpty({ message: 'O título é obrigatório'})
    title!: string;

    @IsNumber ({}, { message: 'O valor deve ser um número'})
    value!: number;

    @IsIn(['receita','despesa'], { message: 'O tipo deve ser receita ou despesa ' })
    type!: 'receita' | 'despesa';

    @IsUUID('4', { message: 'ID da categoria inválido'})
    categoryId!: string;

    @IsDateString({}, {message: 'A data da transação é inválida'})
    date!: string;
}