/* eslint-disable prettier/prettier */

import { Controller, Post, Get, Body, Res,Param, HttpStatus, Query } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Response } from 'express';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}


  @Post('/Deposit')
  async createDepositTransaction(@Body() createTransactionDto: CreateTransactionDto, @Res() res: Response) {
    try {
      const { fromAccount, toAccount } = await this.transactionService.createDepositTransaction(createTransactionDto);
      return res.status(HttpStatus.CREATED).json({
        success: true,
        message: 'Amount Deposit successfully',
        fromAccount,
        toAccount,
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: error.message,
      });
    }
  }

  @Post('/Withdraw')
  async createWithdrawTransaction(@Body() createTransactionDto: CreateTransactionDto, @Res() res:Response) {
    try {
      const {toAccount,fromAccount} = await this.transactionService.createWithdrawTransaction(createTransactionDto)
      return res.status(HttpStatus.CREATED).json({
        success: true,
        message: 'Amount Withdrawn successfully',
        toAccount,
        fromAccount,
      })
    } catch (error) {
      return res.status(HttpStatus.NOT_FOUND).json({
        success:false,
        mesage: error.message,
      })
    }
  }

@Get()
async findAll(@Res() res:Response){
  try {
    const transaction = await this.transactionService.finAllTransaction()
    return res.status(HttpStatus.OK).json({
      success: true,
      transaction,
    })
  } catch (error) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success : false,
      message: error.message,
    })
  }
}


@Get('/:userId')
  async findAllTransactionsByUserId(@Param('userId') userId: number, @Query('type') type: string, @Res() res: Response) {
    try {
      const user = await this.transactionService.findAllTransactionsByUserId(Number(userId), type);
      return res.status(HttpStatus.OK).json({
        success: true,
        user,
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }


@Get('/:id')
async findTransactionById(@Param('id') id:number,@Res() res:Response){
  try {
     const transaction = await this.transactionService.findTransactionById(Number(id))
       return res.status(HttpStatus.OK).json({
        success: true,
        transaction,
      })
    } catch (error) {
      return res.status(HttpStatus.NOT_FOUND).json({
        success : false,
        message: error.message,
      })
  }
}

 
}



 












 
