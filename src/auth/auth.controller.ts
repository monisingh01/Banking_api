/* eslint-disable prettier/prettier */
import { Response } from 'express';
import { Controller, Post, Body, Req, Res, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() dto: AuthDto, @Res() res: Response) {
    try {
      const { id, firstName, lastName, email } = await this.authService.signup(dto);
      return res.status(HttpStatus.CREATED).json({
        success: true,
        message: 'Sign Up successfully',
        data: {
          id,
          firstName,
          lastName,
          email,
        },
      });
    } catch (error) {
      return  res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: error.message,
      });
    }
  }

  @Post('signin')
  async signin(@Body() dto: AuthDto, @Req() req, @Res() res: Response) {
    try {
      const { id, firstName, lastName, email } = await this.authService.signin(dto, req, res);
      return res.json({
        success: true,
        message: 'Signed in successfully',
        data: {
          id,
          firstName,
          lastName,
          email,
        },
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: error.message,
      });
    }
  }
}


// /* eslint-disable prettier/prettier */
// import { Response } from 'express';
// import { Controller, Post, Body, Req, Res, HttpStatus } from '@nestjs/common';
// import { AuthService } from './auth.service';
// import { AuthDto } from './auth.dto';

// @Controller('auth')
// export class AuthController {
//   constructor(private readonly authService: AuthService) {}

//   @Post('signup')
//   async signup(@Body() dto: AuthDto) {
//     try {
//       const { id, firstName, lastName, email } = await this.authService.signup(dto);
//       return res.status(HttpStatus.CREATED).json({
//         success: true,
//         message: 'Sign Up successfully',
//         data: {
//           id,
//           firstName,
//           lastName,
//           email,
//         },
//       });
//     } catch (error) {
//       return res.status(HttpStatus.BAD_REQUEST).json({
//         success: false,
//         message: error.message,
//       });
//     }
//   }

//   @Post('signin')
//   async signin(@Body() dto: AuthDto, @Req() req, @Res() res: Response) {
//     try {
//       const { id, firstName, lastName, email } = await this.authService.signin(dto, req, res);
//       return res.json({
//         success: true,
//         message: 'Signed in successfully',
//         data: {
//           id,
//           firstName,
//           lastName,
//           email,
//         },
//       });
//     } catch (error) {
//       return res.status(HttpStatus.BAD_REQUEST).json({
//         success: false,
//         message: error.message,
//       });
//     }
//   }
// }



// // /* eslint-disable prettier/prettier */
// // import { Response } from 'express';
// // import { Controller, Post, Body, Req, Res, HttpStatus } from '@nestjs/common';
// // import { AuthService } from './auth.service';
// // import { AuthDto } from './auth.dto';

// // @Controller('auth')
// // export class AuthController {
// //   constructor(private readonly authService: AuthService) {}

// //   @Post('signup')
// //   async signup(@Body() dto: AuthDto, @Res() res: Response) {
// //     try {
// //       const result = await this.authService.signup(dto);
// //       return res.status(HttpStatus.CREATED).json({
// //         success: true,
// //         message: 'User created successfully',
// //         data: result,
// //       });
// //     } catch (error) {
// //       return res.status(HttpStatus.BAD_REQUEST).json({
// //         success: false,
// //         message: error.message,
// //       });
// //     }
// //   }

// //   @Post('signin')
// //   async signin(@Body() dto: AuthDto, @Req() req, @Res() res: Response) {
// //     try {
// //       await this.authService.signin(dto, req, res);
// //     } catch (error) {
// //       return res.status(HttpStatus.BAD_REQUEST).json({
// //         success: false,
// //         message: error.message,
// //       });
// //     }
// //   }
// // }


// // /* eslint-disable prettier/prettier */
// // import { Response } from 'express';
// //  import { Controller,Post, Body , Req , Res, HttpStatus} from '@nestjs/common';
// // import { AuthService } from './auth.service';
// // import {AuthDto} from './auth.dto'
 

// // @Controller('auth')
// // export class AuthController {
// //   constructor(private readonly authService: AuthService) {}

// //   @Post('signup')
// //  async signup(@Body() dto:AuthDto , @Res() res: Response){
// //   const result = await this.authService.signup(dto)
// //   console.log('result', result);
// //     return res.status(HttpStatus.CREATED).
// //     json({
// //       success: true,
// //       message: 'User created successfully',
// //       error: {},
// //       data: result,
// //     })
// //   }

// //   @Post ('signin')
// //   signin(@Body() dto: AuthDto, @Req() req, @Res() res){
// // return this.authService.signin(dto,req,res)
// //   }
   
// // }
