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
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';

@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeesService: CoffeesService) {}

  @Get()
  index(@Query() paginationQuery: PaginationQueryDto) {
    return this.coffeesService.getCoffees(paginationQuery);
  }

  @Get(':id')
  show(@Param('id') id: number) {
    return this.coffeesService.getCoffee(id);
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
