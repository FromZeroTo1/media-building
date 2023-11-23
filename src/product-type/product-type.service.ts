import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PaginationService } from 'src/pagination/pagination.service'
import { PrismaService } from 'src/prisma.service'
import { generateSlug } from 'src/utils/generate-slug'
import { ProductTypeDto } from './dto/product-type.dto'
import { EnumProductTypeSort, GetAllProductTypeDto } from './dto/query.dto'
import { productTypeObject } from './object/product-type.object'

@Injectable()
export class ProductTypeService {
  constructor(
    private prisma: PrismaService,
    private paginationService: PaginationService
  ) {}

  async getAll(dto: GetAllProductTypeDto = {}) {
    const { perPage, skip } = this.paginationService.getPagination(dto)

    const filters = this.getSearchTermFilter(dto.searchTerm)

    const types = await this.prisma.productType.findMany({
      where: filters,
      orderBy: this.getSortOption(dto.sort),
      skip,
      take: perPage,
      select: productTypeObject,
    })

    return {
      types,
      length: await this.prisma.productType.count({
        where: filters,
      }),
    }
  }

  private getSortOption(
    sort: EnumProductTypeSort
  ): Prisma.ProductTypeOrderByWithRelationInput[] {
    switch (sort) {
      case EnumProductTypeSort.NEWEST:
        return [{ createdAt: 'desc' }]
      case EnumProductTypeSort.OLDEST:
        return [{ createdAt: 'asc' }]
      default:
        return [{ createdAt: 'desc' }]
    }
  }

  private getSearchTermFilter(
    searchTerm: string
  ): Prisma.ProductTypeWhereInput {
    return {
      name: {
        contains: searchTerm,
        mode: 'insensitive',
      },
    }
  }

  // Admin Place

  async create(dto: ProductTypeDto) {
    return this.prisma.productType.create({
      data: {
        name: dto.name,
        slug: generateSlug(dto.name),
        description: dto.description,
        color: dto.color,
      },
    })
  }

  async update(id: number, dto: ProductTypeDto) {
    return this.prisma.productType.update({
      where: {
        id,
      },
      data: {
        name: dto.name,
        slug: generateSlug(dto.name),
        description: dto.description,
        color: dto.color,
      },
    })
  }

  async delete(id: number) {
    return this.prisma.productType.delete({
      where: {
        id,
      },
    })
  }
}
