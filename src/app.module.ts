import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthMiddleware } from './common/middleware/logger.middleware';
import { ProductsController } from './products/products.controller';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ProfileModule } from './profile/profile.module';
import { ProfileController } from './profile/profile.controller';
import { PrismaModule } from './prisma/prisma.module';
import { GlobalCacheModule } from './cache/GlobalCacheModule';
@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true
  }),
  GlobalCacheModule, ProductsModule, AuthModule, ProfileModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(ProductsController, ProfileController);
  }
}
