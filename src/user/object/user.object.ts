import { Prisma } from '@prisma/client'

export const userObject: Prisma.UserSelect = {
  id: true,
  firstName: true,
  lastName: true,
  login: true,
  email: true,
  password: false,
  phone: true,
  avatarPath: true,
  balance: true,
  bonus: true,
  createdAt: true,
  favorites: true,
}
