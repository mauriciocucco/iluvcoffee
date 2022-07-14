import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';

@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeesService: CoffeesService) {}

  @Get()
  index(@Query() query: any) {
    // const { page } = query;
    return this.coffeesService.getCoffees();
  }

  @Get(':id')
  show(@Param('id') id: number) {
    const coffee = this.coffeesService.getCoffee(id);

    if (!coffee) {
      //   throw new HttpException('Coffee Not found', HttpStatus.NOT_FOUND);
      throw new NotFoundException('Coffee Not found');
    }

    return coffee;
  }

  @Post()
  //   @HttpCode(HttpStatus.GONE)
  store(@Body() createCoffeeDto: CreateCoffeeDto) {
    return this.coffeesService.createCoffee(createCoffeeDto);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateCoffeeDto: UpdateCoffeeDto) {
    return this.coffeesService.updateCoffee(id, updateCoffeeDto);
  }

  @Delete(':id')
  destroy(@Param('id') id: number) {
    return this.coffeesService.deleteCoffee(id);
  }
}
