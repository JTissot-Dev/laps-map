import { Field, ObjectType, ID } from "type-graphql";
import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column, 
  ManyToOne,
  JoinColumn} from 'typeorm';
  import Lap from "../Lap/Lap";


@Entity()
@ObjectType()
class Image extends BaseEntity {
  @Field(_type => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(_type => String, { nullable: true })
  @Column({ type: "varchar", length: 255 })
  imgUrl: string;

  @Field()
  @CreateDateColumn()
  createdAt!: Date;

  @Field(_type => Lap)
  @ManyToOne(() => Lap, (lap) => lap.images)
  @JoinColumn()
  lap: Lap;
};

export default Image;