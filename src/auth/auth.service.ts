/* eslint-disable prettier/prettier */
 import { Injectable, BadRequestException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { AuthDto } from './auth.dto';
import { JwtService } from '@nestjs/jwt';
import { jwtSecret } from 'src/constants';
import { Request, Response } from 'express';



@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService) {}

  async signup(dto: AuthDto) {
    const { firstName, lastName, email, password } = dto;

    const foundUser = await this.prisma.user.findUnique({ 
      where: { email }
     });

    if (foundUser) {
      throw new BadRequestException('Email already exists');
    }

    const hashedPassword = await this.hashPassword(password);

    const newUser = await this.prisma.user.create({
      data: {
        firstname: firstName,
        lastname: lastName,
        email: email,
        hashedPassword: hashedPassword,
      },
    });

    return {
      id: newUser.id,
      firstName: newUser.firstname,
      lastName: newUser.lastname,
      email: newUser.email,
    };
  }

  async hashPassword(password: string) {
    const saltOrRounds = 10;
    return await bcrypt.hash(password, saltOrRounds);
  }
  
  async signin(dto: AuthDto, req: Request, res: Response) {
    const { email, password } = dto;

    const foundUser = await this.prisma.user.findUnique({ where: { email } });

    if (!foundUser) {
      throw new BadRequestException('Invalid credentials');
    }

    const isMatch = await this.comparePassword({
      password,
      hash: foundUser.hashedPassword,
    });

    if (!isMatch) {
      throw new BadRequestException('Invalid credentials');
    }

    const token = await this.signToken({
      id: foundUser.id,
      email: foundUser.email,
    });

    if (!token) {
      throw new ForbiddenException();
    }

    res.cookie('token', token);

    return {
      id: foundUser.id,
      firstName: foundUser.firstname,
      lastName: foundUser.lastname,
      email: foundUser.email,
    };
  }

  async comparePassword(args: { password: string; hash: string }) {
    return await bcrypt.compare(args.password, args.hash);
  }

  async signToken(args: { id: number; email: string }) {
    const payload = args;
    return this.jwt.sign(payload, { secret: jwtSecret });
  }
}



// /* eslint-disable prettier/prettier */
// import { Injectable, BadRequestException, ForbiddenException } from '@nestjs/common';
// import { PrismaService } from 'src/prisma/prisma.service';
// import * as bcrypt from 'bcrypt';
// import { AuthDto } from './auth.dto';
// import { JwtService } from '@nestjs/jwt';
// import { jwtSecret } from 'src/constants';
// import { Request, Response } from 'express';

// @Injectable()
// export class AuthService {
//   constructor(private prisma: PrismaService, private jwt: JwtService) {}

//   async signup(dto: AuthDto) {
//     const { firstName, lastName, email, password } = dto;

//     const foundUser = await this.prisma.user.findUnique({ where: { email } });

//     if (foundUser) {
//       throw new BadRequestException('Email already exists');
//     }

//     const hashedPassword = await this.hashPassword(password);

//     const newUser = await this.prisma.user.create({
//       data: {
//         firstname: firstName,
//         lastname: lastName,
//         email: email,
//         hashedPassword: hashedPassword,
//       },
//     });

//     return {
//       id: newUser.id,
//       firstName: newUser.firstname,
//       lastName: newUser.lastname,
//       email: newUser.email,
//     };
//   }

//   async hashPassword(password: string) {
//     const saltOrRounds = 10;
//     return await bcrypt.hash(password, saltOrRounds);
//   }

//   async signin(dto: AuthDto, req: Request, res: Response) {
//     const { email, password } = dto;

//     const foundUser = await this.prisma.user.findUnique({ where: { email } });

//     if (!foundUser) {
//       throw new BadRequestException('Invalid credentials');
//     }

//     const isMatch = await this.comparePassword({
//       password,
//       hash: foundUser.hashedPassword,
//     });

//     if (!isMatch) {
//       throw new BadRequestException('Invalid credentials');
//     }

//     const token = await this.signToken({
//       id: foundUser.id,
//       email: foundUser.email,
//     });

//     if (!token) {
//       throw new ForbiddenException();
//     }

//     res.cookie('token', token);

//     return {
//       id: foundUser.id,
//       firstName: foundUser.firstname,
//       lastName: foundUser.lastname,
//       email: foundUser.email,
//     };
//   }

//   async comparePassword(args: { password: string; hash: string }) {
//     return await bcrypt.compare(args.password, args.hash);
//   }

//   async signToken(args: { id: number; email: string }) {
//     const payload = args;
//     return this.jwt.sign(payload, { secret: jwtSecret });
//   }
// }




// /* eslint-disable prettier/prettier */

//  import { Injectable, BadRequestException, ForbiddenException } from '@nestjs/common';
// import { PrismaService } from 'src/prisma/prisma.service';
// import * as bcrypt from 'bcrypt';
// import { AuthDto } from './auth.dto';
// import { JwtService } from '@nestjs/jwt';
// import { jwtSecret } from 'src/constants';
// import { Request, Response } from 'express';

// @Injectable()
// export class AuthService {
//   constructor(private prisma: PrismaService, private jwt: JwtService) {}

//   async signup(dto: AuthDto) {
//     const { firstName, lastName, email, password } = dto;

//     const foundUser = await this.prisma.user.findUnique({ where: { email } });

//     if (foundUser) {
//       throw new BadRequestException('Email already exists');
//     }

//     const hashedPassword = await this.hashPassword(password);

//     await this.prisma.user.create({
//       data: {
//         firstname: firstName,
//         lastname: lastName,
//         email: email,
//         hashedPassword: hashedPassword,
//       },
//     });

//     return { message: 'User created successfully' };
//   }

//   async hashPassword(password: string) {
//     const saltOrRounds = 10;
//     return await bcrypt.hash(password, saltOrRounds);
//   }

//   async signin(dto: AuthDto, req: Request, res: Response) {
//     const { email, password } = dto;

//     const foundUser = await this.prisma.user.findUnique({ where: { email } });

//     if (!foundUser) {
//       throw new BadRequestException('Invalid credentials');
//     }

//     const isMatch = await this.comparePassword({
//       password,
//       hash: foundUser.hashedPassword,
//     });

//     if (!isMatch) {
//       throw new BadRequestException('Invalid credentials');
//     }

//     const token = await this.signToken({
//       id: foundUser.id,
//       email: foundUser.email,
//     });

//     if (!token) {
//       throw new ForbiddenException();
//     }

//     res.cookie('token', token);

//     return res.json({ message: 'User signed in successfully' });
//   }

//   async comparePassword(args: { password: string; hash: string }) {
//     return await bcrypt.compare(args.password, args.hash);
//   }

//   async signToken(args: { id: number; email: string }) {
//     const payload = args;
//     return this.jwt.sign(payload, { secret: jwtSecret });
//   }
// }




// /* eslint-disable prettier/prettier */
// import { Injectable, BadRequestException, ForbiddenException } from '@nestjs/common';
// import { PrismaService } from 'src/prisma/prisma.service';
// import * as bcrypt from 'bcrypt';
// import { AuthDto } from './auth.dto';
// import { JwtService } from '@nestjs/jwt';
// import { jwtSecret } from 'src/constants';
// import {Request, Response} from 'express'

// @Injectable()
// export class AuthService {
//   constructor(private prisma: PrismaService, private jwt: JwtService) {}

//   async signup(dto: AuthDto) {
//     const { firstName, lastName, email, password } = dto;

//     const foundUser = await this.prisma.user.findUnique({ where: { email } });
 
//     if (foundUser) {
//       throw new BadRequestException('Email already exists');
//     }

//     const hashedPassword = await this.hashPassword(password);
    
//     await this.prisma.user.create({
//       data: {
//         firstname: firstName,
//         lastname: lastName,
//         email: email,
//         hashedPassword: hashedPassword, 
//       },
//     });
//     return { message: 'User created successfully' };
//   }

//  async hashPassword(password:string){
//   const saltOrRounds = 10;
//   return await bcrypt.hash(password,saltOrRounds)
//  }


//  async signin(dto: AuthDto, req: Request, res: Response){
// const {email,password} = dto

// const foundUser = await this.prisma.user.findUnique({where:{email}})

// if(!foundUser){
//   throw new BadRequestException('Invalid credentials')
// }
// const isMatch = await this.comparePassword
// ({
//   password,
//   hash: foundUser.hashedPassword,
// })

// if(!isMatch){
//   throw new BadRequestException('Invalid credentials')
// }

// const token = await this.signToken({
//   id: foundUser.id,
//   email: foundUser.email,
// });
// if(!token){
//   throw new  ForbiddenException();
// }

// res.cookie('token',token);

// return res.send ({message: 'User signed in successfully'});
//  }

// async comparePassword(args: {password:string; hash:string}){
//   return await bcrypt.compare(args.password,args.hash);
// }

// async signToken(args: {id:number; email:string}){
//   const payload = args;
//   return this.jwt.sign(payload, {secret: jwtSecret});

//  }
// }




 
