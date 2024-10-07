import { dataSource } from "./client";

import { Lang } from "../langs/lang.entitites";
import langs from "../../data/langs.json";

import { Status } from "../status/status.entities";
import status from "../../data/status.json";

import { Repo } from "../repos/repo.entities";
import repos from "../../data/repos.json";
import lang_by_repo from "../../data/lang_by_repo.json";
import { LangsRepos } from "../langs_repos/langs_repos.entities";
(async () => {
  await dataSource.initialize();
  const queryRunner = dataSource.createQueryRunner();

  try {
    await queryRunner.startTransaction();
    await queryRunner.query("DELETE FROM langs_repos");
    await queryRunner.query("DELETE FROM lang");
    await queryRunner.query("DELETE FROM repo");
    await queryRunner.query("DELETE FROM status");

    await queryRunner.query(
      'DELETE FROM sqlite_sequence WHERE name="status" OR name="lang" OR name="langs_repos"'
    );

    const savedLangs = await Promise.all(
      langs.map(async (el) => {
        const lang = new Lang();
        lang.label = el.label;

        return await lang.save();
      })
    );

    console.log(savedLangs);

    const savedStatus = await Promise.all(
      status.map(async (el) => {
        const status = new Status();
        status.label = el.label;

        return await status.save();
      })
    );

    console.log(savedStatus);

    const savedRepos = await Promise.all(
      repos.map(async (el) => {
        const repo = new Repo();
        repo.id = el.id;
        repo.name = el.name;
        repo.url = el.url;

        const status = savedStatus.find(
          (st) => st.id === el.isPrivate
        ) as Status;
        repo.status = status;

        return await repo.save();
      })
    );

    console.log(savedRepos);

    const savedLangsRepos = await Promise.all(
      lang_by_repo.map((lgByRep) => {
        const langsRepos = new LangsRepos();
        langsRepos.repos = savedRepos.find(
          (svRepos) => svRepos.id === lgByRep.repo_id
        ) as Repo;
        langsRepos.langs = savedLangs.find(
          (svLangs) => svLangs.label === lgByRep.label
        ) as Lang;
        langsRepos.size = lgByRep.size;
        return langsRepos.save();
      })
    );

    console.log(savedLangsRepos);

    await queryRunner.commitTransaction();
  } catch (error) {
    console.log(error);
    await queryRunner.rollbackTransaction();
  }
})();
