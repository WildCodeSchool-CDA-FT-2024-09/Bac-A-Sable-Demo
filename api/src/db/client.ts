import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
import { Repo } from "../repos/repo.entities";
import { Status } from "../status/status.entities";
import { Lang } from "../langs/lang.entitites";

dotenv.config();
const { POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_USER, POSTGRES_HOST } =
  process.env;

// export const dataSource = new DataSource({
//   type: "sqlite",
//   database: `./src/db/db.sqlite`,
//   entities: [Repo, Status, Lang],
//   synchronize: true,
// });

export const dataSource = new DataSource({
  type: "postgres",
  host: POSTGRES_HOST,
  port: 5432,
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  entities: [Repo, Status, Lang],
  synchronize: true,
});
