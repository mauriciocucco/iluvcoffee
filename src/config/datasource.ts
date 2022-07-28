import { DataSource } from 'typeorm';
import { basicConfig } from './ormconfig';

const dataSource = new DataSource({
  ...basicConfig,
  migrations: ['src/migrations/*.ts'],
});

export default dataSource;
