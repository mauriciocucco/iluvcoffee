const typeOrmConfig = () => ({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: +process.env.DB_PORT || 3306,
  database: process.env.DB_NAME || '',
  username: process.env.DB_USER || '',
  password: process.env.DB_PASSWORD || '',
  entities: [__dirname + '/../**/entities/*.entity.{ts,js}'],
  /* Note : it is unsafe to use synchronize: true for schema synchronization
    on production once you get data in your database. */
  synchronize: process.env.DB_SYNCHRONIZE || false,
  // autoLoadEntities: true,
  migrationsTableName: 'migration',
  migrations: [__dirname + 'src/migrations/*.ts'],
  cli: {
    migrationsDir: 'src/migrations',
  },
});

export default typeOrmConfig;
