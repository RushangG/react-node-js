import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Users } from '../../users/entities/users.entity';

@Entity('auth_user_session')
export class AuthUserSession {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Users, (user) => user.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  userId: Users;

  @Column()
  accessToken: string;

  @Column()
  accessTokenExpiry: Date;

  @Column()
  refreshToken: string;

  @Column()
  refreshTokenExpiry: Date;

  @CreateDateColumn()
  createdAt: Date;
}
