import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:4200', // อนุญาตเฉพาะต้นทางนี้
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  console.log('CORS Configured with origin:', 'http://localhost:4200');
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
