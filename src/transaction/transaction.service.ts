/* eslint-disable prettier/prettier */

 
import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { TransactionType } from '@prisma/client';  

@Injectable()
export class TransactionService {
  constructor(private prisma: PrismaService) {}

  async createDepositTransaction(dto: CreateTransactionDto): Promise<{ fromAccount: any, toAccount: any }> {
    const { fromAccountId, toAccountId, userId, amount } = dto;

    const fromAccount = await this.prisma.account.findUnique(
      {
       where: 
       { id: fromAccountId }
       }
      );
    const toAccount = await this.prisma.account.findUnique(
      { where:
         { id: toAccountId } 
        }
      );

    if (!fromAccount || !toAccount) {
      throw new BadRequestException('One or both accounts do not exist')
    }

 
    if (toAccount.bankId !== fromAccount.bankId) {
      throw new BadRequestException('Sender and receiver bank is not the same')
    }


    if(fromAccount.balance < amount){
      throw new BadRequestException('Sender has Insufficient balance');
    }


    const transactionType = TransactionType.DEPOSIT;

    try {
      await this.prisma.$transaction([
        this.prisma.account.update({
          where: { id: fromAccountId },
          data: { balance: { decrement: amount } },
        }),
        this.prisma.account.update({
          where: { id: toAccountId },
          data: { balance: { increment: amount } },
        }),
        this.prisma.transaction.create({
          data: {
            type: transactionType,
            fromAccountId,
            toAccountId,
            userId,
            amount,
          },
        }),
      ])

      const updatedFromAccount = await this.prisma.account.findFirst({
        where: { id: fromAccountId },
        include: {
          bank: true,
          user: true
        }
      })
      const updatedToAccount = await this.prisma.account.findFirst({
        where: { id: toAccountId },
        include: {
          bank: true,
          user: true
        }
      });

      return {
        fromAccount: updatedFromAccount,
        toAccount: updatedToAccount,
      };
    } catch (error) {
      throw new InternalServerErrorException('Transaction failed');
    }
  }

  async createWithdrawTransaction(dto: CreateTransactionDto): Promise<{ toAccount: any, fromAccount: any }> {
    const { toAccountId, fromAccountId, userId, amount } = dto;

    const toAccount = await this.prisma.account.findUnique(
      {
         where:
          { id: toAccountId }
         }
      );
    const fromAccount = await this.prisma.account.findUnique(
      {
         where:
          { id: fromAccountId }
         }
      )

    if (!toAccount || !fromAccount) {
      throw new BadRequestException('One or both accounts do not exist')
    }

    if (fromAccount.bankId !== toAccount.bankId) {
      throw new BadRequestException('Receiver and sender bank is not the same')
    }

    if(toAccount.balance < amount){
      throw new BadRequestException('Sender has Insufficient balance')
    }

    const transactionType = TransactionType.WITHDRAW;

    try {
      await this.prisma.$transaction([
        this.prisma.account.update({
          where: { id: fromAccountId },
          data: { balance: { decrement: amount } },
        }),
        this.prisma.account.update({
          where: { id: toAccountId },
          data: { balance: { increment: amount } },
        }),
        this.prisma.transaction.create({
          data: {
            type: transactionType,
            fromAccountId,
            toAccountId,
            userId,
            amount,
          },
        }),
      ])

      const updatedToAccount = await this.prisma.account.findFirst({
        where: { id: toAccountId },
        include: {
          bank: true,
          user: true
        }
      });
      const updatedFromAccount = await this.prisma.account.findFirst({
        where: { id: fromAccountId },
        include: {
          bank: true,
          user: true
        }
      })

      return {
        toAccount: updatedToAccount,
        fromAccount: updatedFromAccount,
      };
    } catch (error) {
      throw new InternalServerErrorException('Transaction failed');
    }
  }


async finAllTransaction(){
  try {
    const transaction = await this.prisma.transaction.findMany({
      include:{
        fromAccount: true,
        toAccount: true,
        user: true,
       }
    })
    return transaction;
  } catch (error) {
    throw new Error(error.message)
  }
}

async findTransactionById(id:number){
  try {
    if(isNaN(id)){
      throw new BadRequestException('Invalid transaction id')
    }
    const transaction = await this.prisma.transaction.findUnique({
      where : {id:id},
      include:{
        fromAccount: true,
        toAccount: true,
        user: true,
 
      }
    })
    return transaction;
  } catch (error) {
    throw new Error(error.message)
  }
}

async findAllTransactionsByUserId(userId: number , type?: string) {
   try {
    let accounts;

    if(type == 'from') {
    accounts = await this.prisma.account.findMany({
      where: {
        userId: userId
      },
      include: {
        transactionsFrom: true
      }
    })
     }else if(type == 'to') {
      accounts = await this.prisma.account.findMany({
        where: {
          userId: userId
        },
        include: {
          transactionsTo: true
        }
      })

    }else{
      accounts = await this.prisma.user.findFirst({
        where: { id : userId },
        include:{
          accounts: true,
          transactions: true,
        }

      });
    }
   

    return accounts
  }
  catch (error) {
    throw new Error(error.message)
  
}
}
 
  }






  // async createBlog(createBlogDto: CreateBlogDto, user: User) {
  //   if (user.role !== 'AUTHOR') {
  //     throw new ForbiddenException('Only authors can create blogs.');
  //   }

  //   const existingBlog = await this.prisma.blog.findUnique({
  //     where: { title: createBlogDto.title },
  //   });

  //   if (existingBlog) {
  //     throw new ConflictException('A blog with the same title already exists.');
  //   }