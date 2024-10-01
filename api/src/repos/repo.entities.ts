import "reflect-metadata";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { Min, Max, IsString } from "class-validator";
import { Status } from "../status/status.entities";

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

  @ManyToOne(() => Status, status => status.id)
  @Min(1)
  @Max(2)
  status: Status;
}