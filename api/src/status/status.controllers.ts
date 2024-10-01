import express, { Response, Request  } from "express";

import { Status } from "./status.entities";

const statusControllers = express.Router();

statusControllers.get("/", async (_: any, res: Response) => {
  try {
    const status = await Status.find({
      relations: {
        repos: true
      }
    });
    res.status(200).json(status)
  } catch (error) {
    res.sendStatus(500)
  }
});
statusControllers.post("/", async (req: Request, res: Response) => {
  try {
    const status = new Status();
    status.label = req.body.label;

    await status.save();
    res.status(201).json(status);

  } catch (error) {
    res.sendStatus(500)
  }
});

export default statusControllers;
