import { Field, ObjectType, ID } from "type-graphql";
import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column } from 'typeorm';
 import CanvasInput from "../../types/CanvasInput";


@Entity()
@ObjectType()
class Lap extends BaseEntity {
  @Field(_type => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(_type => String, { nullable: true })
  @Column({ type: "time", nullable: true })
  duration?: string;

  @Field(_type => String)
  @Column({ type: "linestring" })
  geometry!: string;

  @Field(_type => String, { nullable: true })
  @Column({ type: "varchar", length: 25, nullable: true})
  difficulty?: string;

  @Field()
  @CreateDateColumn()
  createdAt!: Date;

  static findByCanvas(canvas: CanvasInput) {
    const { northWest, northEst, southEst, southWest } = canvas;
    const polygon: String = `Polygon((${northWest}, ${northEst}, ${southEst}, ${southWest}, ${northWest}))`;
    return this.createQueryBuilder("lap")
      .where("ST_Intersects(geometry, ST_GeomFromText(:polygon))", { polygon })
      .getMany();
  };
};

export default Lap;