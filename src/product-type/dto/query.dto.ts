import { IsEnum, IsOptional, IsString } from 'class-validator'
import { PaginationDto } from 'src/pagination/dto/pagination.dto'

export enum EnumProductTypeSort {
  NEWEST = 'newest',
  OLDEST = 'oldest',
}

export class GetAllProductTypeDto extends PaginationDto {
  @IsOptional()
  @IsEnum(EnumProductTypeSort)
  sort?: EnumProductTypeSort

  @IsOptional()
  @IsString()
  searchTerm?: string
}
