import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesModule } from './coffees/coffees.module';
import { CoffeeRatingModule } from './coffee-rating/coffee-rating.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import appConfig from './config/app.config';
import { DataSourceOptions } from 'typeorm';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig],
    }),
    CoffeesModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return configService.get<DataSourceOptions>('database');
      },
    }),
    CoffeeRatingModule,
    // DatabaseModule, // this is a dinamic module example
    CommonModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
