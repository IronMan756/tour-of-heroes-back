import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import bodyParser = require('body-parser');
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const options = new DocumentBuilder()
    .setTitle('HEROES')
    .setDescription('The 222-Discipline API')
    .setVersion('1.0')
    .build();
  app.use(
    bodyParser.json({
      limit: '50mb',
    }),
  );




  
  app.use(
    bodyParser.urlencoded({
      extended: true,
      limit: '50mb',
      parameterLimit: 100000,
    }),
  );
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  const configService: ConfigService = app.get(ConfigService);
  const port: string = configService.get('PORT') as string;
  await app.listen(port);
}
bootstrap();
