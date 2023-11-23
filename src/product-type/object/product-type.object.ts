import { Prisma } from '@prisma/client'

export const productTypeObject: Prisma.ProductTypeSelect = {
  id: true,
  name: true,
  slug: true,
  description: true,
  color: true,
  createdAt: true,
}
