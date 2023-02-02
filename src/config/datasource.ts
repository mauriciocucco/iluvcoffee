import { DataSource, DataSourceOptions } from 'typeorm';
import typeOrmConfig from './typeorm.config';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.production' }); // this is for migrations in Typeorm CLI, it isn't used by Nest

const dataSource = new DataSource(typeOrmConfig() as DataSourceOptions);

export default dataSource;
