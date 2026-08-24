import { PrimaryGeneratedColumn, Column, Entity } from "typeorm";
import { Users } from "./Users";

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 255 })
  address: string;

  @Column({ type: "varchar", length: 20 })
  phone: string;

}
