import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser'; // Import cookie-parser

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable validation globally
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Strip away properties that do not have any decorators
    forbidNonWhitelisted: true, // Throw an error if non-whitelisted values are provided
    transform: true, // Automatically transform payloads to be objects typed according to their DTO classes
  }));

  // Enable cookie parsing
  app.use(cookieParser());

  // Enable CORS for your frontend application
  app.enableCors({
    origin: 'http://localhost:5173', // Your frontend URL
    credentials: true,
  });

  // Add a global prefix to all routes (e.g., /api/auth/login)
  app.setGlobalPrefix('api');

  await app.listen(3000);
}
bootstrap();