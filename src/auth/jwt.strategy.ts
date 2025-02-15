/* eslint-disable prettier/prettier */
import {ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtSecret } from 'src/constants';
import {Request} from 'express'
 
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([JwtStrategy.extractJWT]),
       secretOrKey: jwtSecret,
    });
  }

  private static extractJWT(req:Request): string | null {
    if (req.cookies && 'token' in req.cookies){
      return req.cookies.token;
    }
    return null;
  }
  async validate(payload: { id: number, email: string}){
return payload;
  }
  }


  