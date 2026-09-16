import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Name } from '../../name/entities/name.entity';
import { Message } from '../../message/entities/message.entity';
@Entity('users')
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  passwordHash: string;

  @Column({ default: 'user' })
  role: string;

  @OneToMany(() => Name, (Name) => Name.user_id)
  Names: Name[];

  @OneToMany(() => Message, (Message) => Message.user_id)
  Messages: Message[];
}
