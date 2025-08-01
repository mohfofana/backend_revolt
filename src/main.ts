import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
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

  // Configuration de Swagger
  const config = new DocumentBuilder()
    .setTitle('API Revolte-TechOps')
    .setDescription('Documentation de l\'API Revolte-TechOps')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Entrez le token JWT',
        in: 'header',
      },
      'JWT-auth', // Ce nom est utilisé pour marquer les routes protégées
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      tagsSorter: 'alpha',
      operationsSorter: 'method',
    },
  });

  await app.listen(3001);
  console.log('Backend tourne sur http://localhost:3001/api');
  console.log('Documentation Swagger disponible sur http://localhost:3001/api/docs');
}
bootstrap();
