import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'phones' })
export class Phone {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column()
  serial: string;

  @Column()
  color: string;

  @Column({ type: 'json' })
  metadata: object;

  constructor(
    id?: number,
    type?: string,
    serial?: string,
    color?: string,
    metadata?: object,
  ) {
    this.id = id;
    this.type = type;
    this.serial = serial;
    this.color = color;
    this.metadata = metadata;
  }
}
