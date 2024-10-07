import "reflect-metadata";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryColumn,
  OneToMany,
} from "typeorm";
import { IsString } from "class-validator";
import { Status } from "../status/status.entities";
import { LangsRepos } from "../langs_repos/langs_repos.entities";

@Entity()
export class Repo extends BaseEntity {
  @PrimaryColumn()
  @IsString()
  id: string;

  @Column()
  @IsString()
  name: string;

  @Column()
  @IsString()
  url: string;

  @ManyToOne(() => Status, (status) => status.id)
  status: Status;

  @OneToMany(() => LangsRepos, (langsRepos) => langsRepos.repos)
  langs?: LangsRepos[];
}
