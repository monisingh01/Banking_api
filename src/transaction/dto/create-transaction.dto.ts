/* eslint-disable prettier/prettier */
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, Min } from 'class-validator';

export enum TransactionType {
  DEPOSIT = 'DEPOSIT',
  WITHDRAW = 'WITHDRAW',
}

export class CreateTransactionDto {
  @IsNotEmpty()
  @IsEnum(TransactionType)
  type: TransactionType;

  @IsOptional()
  @IsNumber()
  fromAccountId?: number;

  @IsOptional()
  @IsNumber()
  toAccountId?: number;

  @IsOptional()
  @IsNumber()
  userId?: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  amount: number;
}



 