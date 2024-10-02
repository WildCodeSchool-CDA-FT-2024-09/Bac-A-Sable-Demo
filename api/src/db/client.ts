import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
import { Repo } from "../repos/repo.entities";
import { Status } from "../status/status.entities"
import { Lang } from "../langs/lang.entitites";
import { LangsRepos } from "../langs_repos/langs_repos.entities";

dotenv.config();
const { BACKEND_FILE } = process.env;


export const dataSource = new DataSource({
  type: "sqlite",
  database: `${BACKEND_FILE}`,
  entities: [Repo, Status, Lang, LangsRepos],
  synchronize: true,
  logging: true
});