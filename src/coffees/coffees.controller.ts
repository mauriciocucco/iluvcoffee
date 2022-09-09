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
  SetMetadata,
} from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { ParseIntPipe } from '../common/pipes/parse-int.pipe';
import { Protocol } from 'src/common/decorators/protocol.decorator';
import { ApiResponse, ApiForbiddenResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('coffees')
@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeesService: CoffeesService) {}

  // @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  // @SetMetadata('isPublic', true)
  @Public() // is better to use custom decorators
  @Get()
  index(
    @Protocol('https') protocol: string,
    @Query() paginationQuery: PaginationQueryDto,
  ) {
    console.log('Protocol: ', protocol);
    return this.coffeesService.getCoffees(paginationQuery);
  }

  @Get(':id')
  show(@Param('id', ParseIntPipe) id: number) {
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
