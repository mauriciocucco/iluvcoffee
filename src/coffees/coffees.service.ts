import { Injectable } from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';

@Injectable()
export class CoffeesService {
  private coffees: Coffee[] = [];

  constructor() {
    this.coffees.push(new Coffee(1, 'Cappuccino', 'Frothy milky coffee', 7));
    this.coffees.push(
      new Coffee(2, 'Latte', 'Frothy milky coffee with milk', 10),
    );
    this.coffees.push(new Coffee(3, 'Espresso', 'Short, strong coffee', 5));
  }

  getCoffees(): Coffee[] {
    return this.coffees;
  }

  getCoffee(id: number): Coffee {
    return this.coffees.find((coffee) => coffee.id === +id);
  }

  createCoffee(createCoffeeDto: CreateCoffeeDto): Coffee {
    this.coffees.push({ ...createCoffeeDto, id: this.coffees.length + 1 });
    const coffee = this.coffees[this.coffees.length - 1];
    return coffee;
  }

  updateCoffee(id: number, updateCoffeeDto: UpdateCoffeeDto): Coffee {
    const index = this.coffees.findIndex((c) => c.id === +id);
    const coffee = this.coffees[index];
    this.coffees[index] = { ...coffee, ...updateCoffeeDto };
    return this.coffees[index];
  }

  deleteCoffee(id: number): Coffee {
    const index = this.coffees.findIndex((c) => c.id === +id);
    const deletedCoffee = this.coffees[index];
    this.coffees.splice(index, 1);
    return deletedCoffee;
  }
}
