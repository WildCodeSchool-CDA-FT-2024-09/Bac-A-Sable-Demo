import "reflect-metadata";
import { BaseEntity, Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Repo } from "../repos/repo.entities";

@Entity()
export class Lang extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  label: string;

  @ManyToMany(() => Repo, repo => repo.langs)
  @JoinTable()
  repos?: Repo[]
}