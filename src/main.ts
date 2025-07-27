import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Activer CORS
  app.enableCors({
    origin: ['http://localhost:3000', 'http://localhost:5173'], // URLs autorisées
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  
  app.setGlobalPrefix('api');
  await app.listen(3001);
  console.log('Backend running on http://localhost:3001/api');
}
bootstrap();
