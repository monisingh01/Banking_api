/* eslint-disable prettier/prettier */
 import{IsString, IsNotEmpty, MinLength,MaxLength, IsEmail, Length } from 'class-validator'



 export class AuthDto {
  @IsString()
 @IsNotEmpty()
 @MinLength(3)
 @MaxLength(50) 
  public firstName: string;


  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
  public lastName: string;


@IsEmail()
@IsString()
@IsNotEmpty()
public email: string;


@IsNotEmpty()
@IsString()
@Length(3,20, {message: 'Password has to be at between 3 and 20 characters'})
 public password: string;

 }