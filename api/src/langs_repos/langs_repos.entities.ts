import "reflect-metadata";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Repo } from "../repos/repo.entities";
import { Lang } from "../langs/lang.entitites";

@Entity()
export class LangsRepos extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // Relation avec la table Repos (Many-to-One)
  @ManyToOne(() => Repo, repo => repo.langs)
  repos: Repo;

  // Relation avec la table Lang (Many-to-One)
  @ManyToOne(() => Lang, lang => lang.repos)
  langs: Lang;

  // Colonne supplémentaire dans la table de jointure
  @Column()
  size: number;
}