import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  ManyToMany,
  ManyToOne,
  Table,
  JoinColumn,
} from 'typeorm';
import { Users } from '../../users/entities/users.entity';
import { Roles } from '../../roles/entities/roles.entity';

@Entity('users_roles')
@Unique(['userId', 'roleId'])
export class UsersRoles {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Users, (user) => user.UsersRoles, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  userId: Users;

  @ManyToOne(() => Roles, (role) => role.UsersRoles, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'roleId' })
  roleId: Roles;
}
