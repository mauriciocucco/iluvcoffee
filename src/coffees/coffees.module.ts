import { Injectable, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomEvent } from '../events/entities/custom-event.entity';
import { COFFEE_BRANDS } from './coffees.constants';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';
import { Connection } from 'typeorm';

// class ConfigService {}
// class DevelopmentConfigService {}
// class productionCongigService {}

// @Injectable()
// export class CoffeeBrandsFactory {
//   create() {
//     return ['Starbucks', 'Dunkin Donuts', 'Staropramen'];
//   }
// }

@Module({
  controllers: [CoffeesController],
  providers: [
    CoffeesService,
    // { provide: COFFEE_BRANDS, useValue: ['Starbucks', 'Dunkin Donuts'] },
    // CoffeeBrandsFactory,
    // {
    //   provide: COFFEE_BRANDS,
    //   inject: [CoffeeBrandsFactory],
    //   useFactory: (brandsFactory: CoffeeBrandsFactory) =>
    //     brandsFactory.create(),
    // },
    // {
    //   provide: ConfigService,
    //   useClass:
    //     process.env.NODE_ENV === 'development'
    //       ? DevelopmentConfigService
    //       : productionCongigService,
    // },
    {
      provide: COFFEE_BRANDS,
      inject: [Connection],
      useFactory: async (connection: Connection): Promise<string[]> => {
        const coffeeBrands = await Promise.resolve([
          'Starbucks',
          'Dunkin Donuts',
        ]);
        // console.log('Async factory');
        return coffeeBrands;
      },
    },
  ],
  imports: [TypeOrmModule.forFeature([Coffee, Flavor, CustomEvent])],
  exports: [CoffeesService],
})
export class CoffeesModule {}
