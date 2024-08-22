/* eslint-disable prettier/prettier */
import { Controller, 
         Post, 
         Body,
         Param,
         Get,
           
        } from '@nestjs/common';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/create-account.dto';
 

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) { }

  @Post('create')
  create(@Body() createAccountDto: CreateAccountDto) {
    return this.accountService.create(createAccountDto);
  }


   @Get('/:id')
   findOne(@Param('id') id: number) {
    return this.accountService.findOne(id);
  }

  @Get()
  findAll() {
    return this.accountService.findAll();
  }

  
  
}
