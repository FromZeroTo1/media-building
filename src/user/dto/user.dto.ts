import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator'

export class UserDto {
  @IsOptional()
  @IsString()
  firstName?: string

  @IsOptional()
  @IsString()
  lastName?: string

  @IsOptional()
  @IsString()
  login?: string

  @IsEmail()
  email: string

  @IsOptional()
  @IsString()
  password?: string

  @IsOptional()
  @IsString()
  phone?: string

  @IsOptional()
  @IsString()
  avatarPath?: string
}
