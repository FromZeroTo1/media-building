import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { ProductTypeDto } from './dto/product-type.dto'
import { GetAllProductTypeDto } from './dto/query.dto'
import { ProductTypeService } from './product-type.service'

@Controller('product-types')
export class ProductTypeController {
  constructor(private readonly productTypeService: ProductTypeService) {}

  @UsePipes(new ValidationPipe())
  @Get()
  async getAll(@Query() queryDto: GetAllProductTypeDto) {
    return this.productTypeService.getAll(queryDto)
  }

  // Admin Place

  @Auth('admin')
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post()
  async create(@Body() dto: ProductTypeDto) {
    return this.productTypeService.create(dto)
  }

  @Auth('admin')
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: ProductTypeDto) {
    return this.productTypeService.update(+id, dto)
  }

  @Auth('admin')
  @HttpCode(200)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.productTypeService.delete(+id)
  }
}
