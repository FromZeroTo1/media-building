import { Module } from '@nestjs/common'
import { ProductTypeController } from './product-type.controller'
import { ProductTypeService } from './product-type.service'
import { PaginationService } from 'src/pagination/pagination.service'
import { PrismaService } from 'src/prisma.service'

@Module({
  controllers: [ProductTypeController],
  providers: [ProductTypeService, PrismaService, PaginationService],
})
export class ProductTypeModule {}
