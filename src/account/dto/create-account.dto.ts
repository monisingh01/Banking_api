/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsNumber,  Min } from 'class-validator';

export class CreateAccountDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsNumber()
  bankId: number;

  @IsNumber()
  @Min(0)
  balance: number;
}
