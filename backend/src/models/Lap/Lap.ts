import { Field, ObjectType, ID } from "type-graphql";
import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column, 
  OneToMany,
  ManyToOne,
  JoinColumn } from 'typeorm';
 import CanvasInput from "../../types/CanvasInput";
 import Image from "../Image/Image";
 import Difficulty from "../Difficulty/Difficulty";


@Entity()
@ObjectType()
class Lap extends BaseEntity {
  @Field(_type => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(_type => String)
  @Column({ type: "varchar", length: 55 })
  name!: string;

  @Field(_type => String, { nullable: true })
  @Column({ type: "time", nullable: true })
  duration?: string;

  @Field(_type => String)
  @Column({ type: "linestring" })
  geometry!: string;

  @Field()
  @CreateDateColumn()
  createdAt!: Date;

  @Field(_type => [Image], { nullable: true })
  @OneToMany(() => Image, (image) => image.lap, { 
    cascade: true, 
    nullable: true,
    onDelete: 'CASCADE',
    eager: true
  })
  images?: Image[];

  @Field(_type => Difficulty)
  @ManyToOne(() => Difficulty, (difficulty) => difficulty.laps, { 
    eager: true
  })
  @JoinColumn()
  difficulty!: Difficulty;

  static findByCanvas(canvas: CanvasInput) {
    const { northWest, northEst, southEst, southWest } = canvas;
    const polygon: String = `Polygon((${northWest}, ${northEst}, ${southEst}, ${southWest}, ${northWest}))`;
    return this.createQueryBuilder("lap")
      .leftJoinAndSelect("lap.difficulty", "difficulty")
      .where("ST_Intersects(geometry, ST_GeomFromText(:polygon))", { polygon })
      .getMany();
  };

  static findByCity(city: string) {
    return this.createQueryBuilder("lap")
      .leftJoinAndSelect("lap.difficulty", "difficulty")
      .where("ST_Intersects(geometry, ST_GeomFromText(:city))", { city })
      .getMany();
  }
};

export default Lap;