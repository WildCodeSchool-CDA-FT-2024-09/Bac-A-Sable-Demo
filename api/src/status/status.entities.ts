import "reflect-metadata";
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Repo } from "../repos/repo.entities";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Status extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  label: string;

  @OneToMany(() => Repo, (repo) => repo.status)
  repos?: Repo[];
}
