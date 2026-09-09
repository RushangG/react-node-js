import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import { Users } from '../../users/entities/users.entity';
import { UsersRoles } from 'src/modules/users-roles/entities/users-roles.entity';
@Entity('roles')
export class Roles {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => UsersRoles, (usersRoles) => usersRoles.roleId)
  UsersRoles: UsersRoles[];
}
