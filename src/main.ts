import * as dotenv from 'dotenv';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  if (process.env.NODE_ENV !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('Twitter API')
      .setDescription('The Twitter API description')
      .setVersion('1.0')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    
    SwaggerModule.setup('api', app, document);
  }

  await app.listen(3000);
}

bootstrap();
