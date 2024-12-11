import { Module, Global } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import redisStore from 'cache-manager-redis-store';
@Global()
@Module({
  imports: [
    CacheModule.register({
      store: redisStore as unknown as string,
      host: 'localhost',
      port: 6379,
      ttl: 300, // TTL ในวินาที
    }),
  ],
  exports: [CacheModule], // Export CacheModule ให้โมดูลอื่น ๆ ใช้งาน
})
export class GlobalCacheModule {}
