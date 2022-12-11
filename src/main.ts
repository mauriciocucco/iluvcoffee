import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { WrapResponseInterceptor } from './common/interceptors/wrap-response.interceptor';
// import { ApiKeyGuard } from './common/guards/api-key.guard';
import { TimeoutInterceptor } from './common/interceptors/timeout.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // I can add useGlobal methods if the class within doesn't use dependecy injection
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // removes extra properties from the request body
      // forbidNonWhiteListed: true, // returns an errors if there is an extra property
      transform: true, //transform the controllers inputs to class instances or primitives
      transformOptions: {
        enableImplicitConversion: true, // transform the properties according to a class validations
      },
    }),
  );

  app.useGlobalFilters(new HttpExceptionFilter());

  // app.useGlobalGuards(new ApiKeyGuard());

  app.useGlobalInterceptors(
    new WrapResponseInterceptor(),
    new TimeoutInterceptor(),
  );

  // SWAGGER
  const options = new DocumentBuilder()
    .setTitle('Iluvcoffe')
    .setDescription('Coffee application')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('api', app, document);

  // PORT
  await app.listen(configService.get('PORT'));
}

bootstrap();
