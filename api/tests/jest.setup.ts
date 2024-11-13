import { beforeAll, afterAll } from "@jest/globals";

import { dataSource } from "../src/db/client";

beforeAll(async () => await dataSource.initialize());

afterAll(async () => await dataSource.destroy());
