import "reflect-metadata";
import { BaseEntity, Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { LangsRepos } from "../langs_repos/langs_repos.entities";

@Entity()
export class Lang extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  label: string;

  @ManyToMany(() => LangsRepos, langsRepo => langsRepo.langs)
  repos?: LangsRepos[]
}