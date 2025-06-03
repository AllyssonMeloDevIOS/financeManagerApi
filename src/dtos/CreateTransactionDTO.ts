import {
    IsNotEmpty,
    IsUUID,
    IsIn,
    IsNumber,
    IsDateString
    } from 'class-validator';

export class CreateTransactionDTO {
    @IsNotEmpty({ message: 'O título é obrigatório'})
    title: string;

    @IsNumber ({}, { message: 'O valor deve ser um número'})
    value: number;

    @IsIn(['receita','despesa'], { message: 'O tipo deve ser receita ou despesa ' })
    type: 'receita' | 'despesa';

    @IsUUID('4', { message: 'ID da categoria inválido'})
    categoryID: string;

    @IsDateString({}, {message: 'A data da transação é inválida'})
    date: string;
    }