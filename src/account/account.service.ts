/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { generateAccountNumber } from './utils/generate.accno';
 import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()

export class AccountService {
  constructor(private  prisma : PrismaService) {}

  async create(createAccountDto: CreateAccountDto) {
    const accountNumber =  generateAccountNumber()
    const data = await this.prisma.account.create({
      data: {

         userId: createAccountDto.userId,
         bankId: createAccountDto.bankId,
         balance: createAccountDto.balance,

         accountNumber,
      }
    })
    let findAcc
    if(data) {
     findAcc  = await this.prisma.account.findFirst({
        where: {
          id: data.id
        },
        include:{
          bank: true,
          user: true
        }
      })
    }

     return findAcc
  }


  async findOne(id: number) {

    if(isNaN(id)) {
      throw new Error('Invalid account id')
    }


    let findAcc
      
     { 
      findAcc = await this.prisma.account.findFirst({
      where: {
        id: id
      },
      include:{
        bank: true,
        user: true
      }
    })
  }
    return findAcc
  }

 
  async findAll() {
    const findAcc = await this.prisma.account.findMany({
      include: {
        bank: true,
        user: true
      }
    })
    return findAcc
  }

 
}
