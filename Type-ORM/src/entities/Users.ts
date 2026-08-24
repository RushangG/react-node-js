import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToOne,
} from "typeorm";
import { Profile } from "./Profile";
@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 100 })
  name: string;

  @Column({ type: "varchar", length: 100, unique: true })
  email: string;

  @Column({ type: "date", nullable: true })
  birthDate: Date;

  @Column({ type: "varchar", length: 100 })
  password: string;

  @Column({ type: "boolean", default: true })
  isActive: boolean;

  @OneToOne(() => Profile, { cascade: true })
  @JoinColumn()
  profile: Promise<Profile>;

  @Column({ type: "date", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;
}
