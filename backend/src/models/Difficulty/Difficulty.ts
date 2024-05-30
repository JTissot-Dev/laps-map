import { Field, ObjectType, ID } from "type-graphql";
import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column, 
  OneToMany} from 'typeorm';
  import Lap from "../Lap/Lap";


@Entity()
@ObjectType()
class Difficulty extends BaseEntity {
  @Field(_type => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(_type => String)
  @Column({ type: "varchar", length: 55 })
  level!: string;

  @Field(_type => [Lap])
  @OneToMany(() => Lap, (lap) => lap.difficulty)
  laps: Lap[];
};

export default Difficulty;