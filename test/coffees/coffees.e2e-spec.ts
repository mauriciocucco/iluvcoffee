import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeesModule } from '../../src/coffees/coffees.module';
import { CreateCoffeeDto } from '../../src/coffees/dto/create-coffee.dto';
import * as request from 'supertest';

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
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          port: 5433,
          username: 'postgres',
          password: 'password',
          database: 'postgres',
          autoLoadEntities: true,
          synchronize: true,
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
