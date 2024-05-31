import { Field, ObjectType, ID } from "type-graphql";
import { IsISO8601, Length } from "class-validator";
import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column } from 'typeorm';

@ObjectType()
abstract class Person extends BaseEntity {
  @Field(_type => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(_type => String)
  @Column({ type: "varchar", length: 55 })
  @Length(2, 55)
  firstName!: string;

  @Field(_type => String)
  @Column({ type: "varchar", length: 55 })
  @Length(2, 55)
  lastName!: string;

  @Field()
  @Column({ type: "date" })
  @IsISO8601()
  birthDay!: Date;
};

export default Person;