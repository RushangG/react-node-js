import { Product } from 'src/modules/products/entities/product.entity';
import { Roles } from '../../roles/entities/roles.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
  ManyToMany,
  JoinColumn,
  JoinTable,
} from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: 'user' })
  role: string;

  @OneToMany(() => Product, (product) => product.user_id)
  products: Product[];

  @ManyToMany(() => Roles)
  @JoinTable({ name: 'users_roles' })
  roles: Roles[];

  @Column({ type: 'varchar', nullable: true })
  hashedRefreshToken: string | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
