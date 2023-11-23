import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { hash } from 'argon2'
import { PrismaService } from 'src/prisma.service'
import { UserDto } from './dto/user.dto'
import { userObject } from './object/user.object'

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getAll(searchTerm?: string) {
    let options = {}

    if (searchTerm) {
      options = {
        OR: [
          {
            email: {
              contains: searchTerm,
              mode: 'insensitive',
            },
          },
          {
            name: {
              contains: searchTerm,
              mode: 'insensitive',
            },
          },
        ],
      }
    }

    const users = await this.prisma.user.findMany({
      where: options,
      orderBy: {
        createdAt: 'desc',
      },
      select: userObject,
    })

    return users
  }

  async byId(id: number, selectObject: Prisma.UserSelect = {}) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        ...userObject,
        ...selectObject,
      },
    })

    if (!user) throw new NotFoundException('User not found')

    return user
  }

  async toggleFavorite(userId: number, productId: number) {
    const user = await this.byId(userId)

    if (!user) throw new NotFoundException('User not found')

    const isExists = user.favorites.some((product) => product.id === productId)

    await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        favorites: {
          [isExists ? 'disconnect' : 'connect']: {
            id: productId,
          },
        },
      },
    })

    return { message: 'Success' }
  }

  async updateProfile(id: number, dto: UserDto) {
    const isSameUser = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    })

    if (isSameUser && id !== isSameUser.id)
      throw new BadRequestException('Email already in use')

    const user = await this.byId(id)

    return this.prisma.user.update({
      where: {
        id,
      },
      data: {
        firstName: dto.firstName,
        lastName: dto.lastName,
        login: dto.login,
        email: dto.email,
        password: dto.password ? await hash(dto.password) : user.password,
        phone: dto.phone,
        avatarPath: dto.avatarPath,
      },
    })
  }

  async delete(id: number) {
    return this.prisma.user.delete({
      where: {
        id,
      },
    })
  }
}
