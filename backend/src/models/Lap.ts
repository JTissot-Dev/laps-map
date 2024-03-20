import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column } from 'typeorm';


@Entity()
class Lap extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "time", nullable: true })
  duration: string;

  @Column({ type: "linestring" })
  geometry: string;

  @Column({ type: "varchar", length: 25, nullable: true})
  difficulty: string;

  @CreateDateColumn()
  createdAt: Date;
}


export default Lap;