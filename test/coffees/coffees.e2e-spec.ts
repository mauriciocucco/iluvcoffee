import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CoffeesModule } from '../../src/coffees/coffees.module';
import { CreateCoffeeDto } from '../../src/coffees/dtos/create-coffee.dto';
import * as request from 'supertest';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import appConfig from '../../src/config/app.config';
import { Coffee } from '../../src/coffees/entities/coffee.entity';

describe('[Feature] Coffees - /coffees', () => {
  const coffee = {
    id: 1,
    name: 'Café prueba',
    description: 'Es una prueba',
    price: 200,
    recommendations: 0,
    flavors: ['chocolate', 'vanilla'],
  };
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        CoffeesModule,
        ConfigModule.forRoot({
          envFilePath: `.env.${process.env.NODE_ENV}`,
          isGlobal: true,
          load: [appConfig],
        }),
        TypeOrmModule.forRootAsync({
          inject: [ConfigService],
          useFactory: (configService: ConfigService) => {
            return configService.get<DataSourceOptions>('database');
          },
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      }),
    );

    await app.init();
  });

  beforeEach(async () => {
    const dataSource = app.get(DataSource);
    const coffeeRepository = dataSource.getRepository(Coffee);

    if (dataSource.hasMetadata(Coffee))
      await coffeeRepository.query('TRUNCATE coffee RESTART IDENTITY CASCADE;');
  });

  it('Create [POST /])', () => {
    return request(app.getHttpServer())
      .post('/coffees')
      .send(coffee as CreateCoffeeDto)
      .expect(HttpStatus.CREATED)
      .then(({ body }) => {
        const expectedCoffee = {
          ...coffee,
          flavors: coffee.flavors.map((name, i) => ({ id: i + 1, name })),
        };

        expect(body).toEqual(expectedCoffee);
      });
  });

  it.todo('Get all [GET /])');
  it.todo('Get one [GET /:id])');
  it.todo('Update one [PATCH /:id])');
  it.todo('Delete one [DELETE /:id])');

  afterAll(async () => {
    await app.close();
  });
});
