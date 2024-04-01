import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column } from 'typeorm';
import Canvas from '../../types/Canvas';


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

  static findByCanvas(canvas: Canvas) {
    const { northWest, northEst, southEst, southWest } = canvas;
    const polygon: String = `Polygon((${northWest}, ${northEst}, ${southEst}, ${southWest}, ${northWest}))`;
    return this.createQueryBuilder("lap")
      .where("ST_Intersects(geometry, ST_GeomFromText(:polygon))", { polygon })
      .getMany();
  };
};

export default Lap;