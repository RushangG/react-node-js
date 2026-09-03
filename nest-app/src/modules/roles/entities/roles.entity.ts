import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Users } from '../../users/entities/users.entity';
@Entity('roles')
export class Roles {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;
}
