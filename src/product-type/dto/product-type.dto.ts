import { IsString } from 'class-validator'

export class ProductTypeDto {
  @IsString()
  name: string

  @IsString()
  description: string

  @IsString()
  color: string
}
