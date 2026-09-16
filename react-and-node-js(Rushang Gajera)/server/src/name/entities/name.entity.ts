import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Users } from '../../users/entities/users.entity';
@Entity('name')
export class Name {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  course: string;

  @ManyToOne(() => Users, (Users) => Users.Names)
  @JoinColumn({ name: 'user_id' })
  user_id: Users;
}
