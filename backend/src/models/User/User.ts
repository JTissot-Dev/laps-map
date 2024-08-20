import { Field, ObjectType } from "type-graphql";
import {
  Entity,
  Column, 
  OneToMany} from 'typeorm';
import { 
  IsEmail,
  Length } from "class-validator";
import Person from "../Person/Person";
import Lap from "../Lap/Lap";


@Entity()
@ObjectType()
class User extends Person {
  @Field(_type => String)
  @Column({ type: "varchar", length: 100, unique: true})
  @IsEmail()
  email!: string;

  @Field(_type => String)
  @Column({ type: "varchar", length: 255 })
  @Length(8, 255)
  password!: string;

  @Field(_type => [Lap])
  @OneToMany(() => Lap, (lap) => lap.user)
  laps: Lap[];
};

export default User;