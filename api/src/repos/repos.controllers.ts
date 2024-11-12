import express, { Response, Request } from "express";
// import { validate } from "class-validator";
// import Joi from "joi";

import { Repo } from "./repo.entities";
import { Status } from "../status/status.entities";
import { Lang } from "../langs/lang.entitites";
import { In } from "typeorm";

// import repos from "../../data/repos.json";
// import type { Repo } from "./repo.type";

// let myRepos: Array<Repo> = repos;

const repoControllers = express.Router();

// const schema = Joi.object({
//   id: Joi.string().required(),
//   name: Joi.string().required(),
//   url: Joi.string().required(),
//   isPrivate: Joi.number().min(1).max(2).required(),
// });

// const validateRepo = (req: Request, res: Response, next: NextFunction) => {
//   const { error } = schema.validate(req.body);

//   if (error == null) {
//     next();
//   } else {
//     res.status(422).json(error);
//   }
// };

repoControllers.get("/", async (_: any, res: Response) => {
  console.log("GET REPOS");
  try {
    const repos = await Repo.find({
      relations: {
        status: true,
        langs: true,
      },
    });
    res.status(200).json(repos);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

repoControllers.get("/:id", async (req: Request, res: Response) => {
  console.log("GET REPOS");
  try {
    const repos = await Repo.find({
      where: {
        id: req.params.id,
      },
      relations: {
        status: true,
        langs: true,
      },
    });
    res.status(200).json(repos);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

repoControllers.post("/", async (req: Request, res: Response) => {
  try {
    const repo = new Repo();
    repo.id = req.body.id;
    repo.name = req.body.name;
    repo.url = req.body.url;

    const status = await Status.findOneOrFail({
      where: { id: req.body.isPrivate },
    });
    repo.status = status;

    const langs = await Lang.find({
      where: { id: In(req.body.langs.map((l: number) => l)) },
    });
    repo.langs = langs;

    await repo.save();
    res.status(201).json(repo);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}); // http://localhost:3001/api/repos/ <=> http://localhost:3001/users/:id/repos/

// repoControllers.delete("/:id", (req: Request, res: Response) => {
//   myRepos = myRepos.filter((repo: Repo) => repo.id !== req.params.id);
//   res.sendStatus(204);
// });

repoControllers.patch("/:id", async (req: Request, res: Response) => {
  console.log("Pathc REPOS", req.body);
  try {
    const repos = await Repo.findOneOrFail({
      where: {
        id: req.params.id,
      },
    });

    repos.isFavorite = req.body.isFavorite;
    repos.save();

    res.sendStatus(203);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

export default repoControllers;
