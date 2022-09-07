import typeOrmConfig from './typeorm.config';

export default () => ({
  environment: process.env.NODE_ENV || 'development',
  database: {
    ...typeOrmConfig(),
  },
});
