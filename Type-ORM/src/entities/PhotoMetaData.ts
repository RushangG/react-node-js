import { join } from "node:path";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { Photo } from "./Photo";
@Entity()
export class PhotoMetaData {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "int" })
  height2: number;

  @Column({ type: "int" })
  width2: number;

  @Column({ type: "varchar", length: 255 })
  comments: string;

  @OneToOne(() => Photo)
  @JoinColumn()
  photo: Photo;
}
