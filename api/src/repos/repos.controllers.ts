import express, { Response, Request, NextFunction } from "express";
import Joi from "joi";

import repos from "../../data/repos.json";
import type { Repo } from "./repo.type";

let myRepos: Array<Repo> = repos;

const repoControllers = express.Router();

const schema = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().required(),
  url: Joi.string().required(),
  isPrivate: Joi.number().min(1).max(2).required()
})

const validateRepo = (req: Request, res: Response, next: NextFunction) => {
  const { error } = schema.validate(req.body)

  if (error == null) {
    next()
  } else {
    res.status(422).json(error)
  }
}

repoControllers.get('/', (req: Request, res: Response) => {
  const { status } = req.query;
  const result = status !== undefined ? myRepos.filter((repo: Repo) => repo.isPrivate === +status) : myRepos;
  res.status(200).json(result)
})

repoControllers.get('/:id', (req: Request, res: Response) => {
  const repo = myRepos.find(rep => rep.id === req.params.id) as Repo;

  if (repo) {
    res.status(200).json(repo)
  } else {
    res.sendStatus(404)
  }
})

repoControllers.post('/', validateRepo, (req: Request, res: Response) => {
  myRepos.push(req.body)
  res.status(201).json(req.body)
})// http://localhost:3001/api/repos/ <=> http://localhost:3001/users/:id/repos/

repoControllers.delete('/:id', (req: Request, res: Response) => {
  myRepos = myRepos.filter((repo: Repo) => repo.id !== req.params.id)
  res.sendStatus(204)
})


export default repoControllers;