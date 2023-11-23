import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { PaginationModule } from './pagination/pagination.module'
import { PrismaService } from './prisma.service'
import { ProductTypeModule } from './product-type/product-type.module'
import { ConfigModule } from '@nestjs/config'
import { UserModule } from './user/user.module';
import { FileModule } from './file/file.module';

@Module({
  imports: [ConfigModule.forRoot(), ProductTypeModule, PaginationModule, AuthModule, UserModule, FileModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
