/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
  import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { AccountModule } from './account/account.module';
import { TransactionModule } from './transaction/transaction.module';
 

@Module({
  imports: [PrismaModule, AuthModule, AccountModule, TransactionModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
