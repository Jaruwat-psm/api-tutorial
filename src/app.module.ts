import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthMiddleware } from './common/middleware/logger.middleware';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ProfileModule } from './profile/profile.module';
import { ProfileController } from './profile/profile.controller';
import { PrismaModule } from './prisma/prisma.module';
import { GlobalCacheModule } from './cache/GlobalCacheModule';
import { DocumentsModule } from './documents/documents.module';
import { DocumentsController } from './documents/documents.controller';
@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true
  }),
  GlobalCacheModule, AuthModule, ProfileModule, PrismaModule, DocumentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(ProfileController, DocumentsController);
  }
}
