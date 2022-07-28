import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CustomEvent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column()
  name: string;

  @Column('json')
  payload: Record<string, any>;
}
