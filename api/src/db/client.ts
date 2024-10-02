import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
import { Repo } from "../repos/repo.entities";
import { Status } from "../status/status.entities"
import { Lang } from "../langs/lang.entitites";

dotenv.config();
const { BACKEND_FILE } = process.env;


export const dataSource = new DataSource({
  type: "sqlite",
  database: `${BACKEND_FILE}`,
  entities: [Repo, Status, Lang],
  synchronize: true,
  logging: true
});