import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateCoffeeDto {
  @ApiProperty({ description: 'The name of a coffee.' })
  @IsString()
  readonly name: string;

  @ApiProperty({ description: 'The description of a coffee.' })
  @IsString()
  readonly description: string;

  @ApiProperty({ description: 'The price of a coffee.' })
  @IsNumber()
  readonly price: number;

  @ApiProperty({ description: 'The flavors of a coffee.', example: [] })
  @IsString({ each: true })
  flavors: string[];
}
