import { dataSource } from "./client";

import { Lang } from "../langs/lang.entitites";
import langs from "../../data/langs.json";

import { Status } from "../status/status.entities";
import status from "../../data/status.json";

import { Repo } from "../repos/repo.entities";
import repos from "../../data/repos.json";
import lang_by_repo from "../../data/lang_by_repo.json"
(async() => {
  await dataSource.initialize();
  const queryRunner = dataSource.createQueryRunner();
  console.log("Hello")

  try {
    await queryRunner.startTransaction()
    await queryRunner.query('DELETE FROM lang_repos_repo');
    await queryRunner.query('DELETE FROM lang');
    await queryRunner.query('DELETE FROM repo');
    await queryRunner.query('DELETE FROM status');

    await queryRunner.query('DELETE FROM sqlite_sequence WHERE name="status" OR name="lang"');

    const savedlangs = await Promise.all(
      langs.map(async (el) => {
        const lang = new Lang();
        lang.label = el.label;

        return await lang.save();
      })
    )

    console.log(savedlangs)

    const savedStatus = await Promise.all(
      status.map(async (el) => {
        const status = new Status();
        status.label = el.label;

        return await status.save();
      })
    )

    console.log(savedStatus)

    const savedRepos = await Promise.all(
      repos.map(async (el) => {
        const repo = new Repo();
        repo.id = el.id;
        repo.name = el.name;
        repo.url = el.url;

        const status = savedStatus.find((st) => st.id === el.isPrivate) as Status;
        repo.status = status;

        const mylangs = savedlangs.filter((svLg) => {
          const associatedlang = lang_by_repo.filter(lgbyrep => lgbyrep.repo_id === el.id);
          const langLabel = langs.filter(lg => associatedlang.some((assolg) => assolg.lang_id === lg.id))
          return langLabel.some(lgLabel => lgLabel.label === svLg.label)
        })
        repo.langs = mylangs;

        return await repo.save();
      })
    )

    console.log(savedRepos)





    await queryRunner.commitTransaction();
  } catch (error) {
    console.log(error)
    await queryRunner.rollbackTransaction();
  }
})()