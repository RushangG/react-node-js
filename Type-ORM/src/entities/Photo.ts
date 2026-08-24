import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Photo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 100 })
  name: string;

  @Column({ type: "text" })
  description: string;

  @Column({ type: "varchar", length: 255 })
  filename: string;

  @Column({ type: "double precision" })
  views: number;

  @Column({ type: "boolean" })
  isPublished: boolean;
}
