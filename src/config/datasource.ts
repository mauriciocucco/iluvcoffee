import { DataSource, DataSourceOptions } from 'typeorm';
import typeOrmConfig from './typeorm.config';
import * as dotenv from 'dotenv';

dotenv.config(); // very very important!!

const dataSource = new DataSource(typeOrmConfig() as DataSourceOptions);

export default dataSource;
