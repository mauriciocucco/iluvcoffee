import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const basicConfig: any = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'password',
  database: 'postgres',
  logging: true,
  // migrationsRun: true,
  entities: [__dirname + '/../**/entities/*.entity.{ts,js}'],
  /* Note : it is unsafe to use synchronize: true for schema synchronization
    on production once you get data in your database. */
  // synchronize: true,
};

export const typeOrmModuleOptions: TypeOrmModuleOptions = {
  ...basicConfig,
  autoLoadEntities: true,
};
