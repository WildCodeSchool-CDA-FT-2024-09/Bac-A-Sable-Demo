import express, { Response, Request  } from "express";

import { Lang } from "./lang.entitites";

const langControllers = express.Router();

langControllers.get("/", async (_: any, res: Response) => {
  try {
    const lang = await Lang.find();
    res.status(200).json(lang)
  } catch (error) {
    res.sendStatus(500)
  }
});
langControllers.post("/", async (req: Request, res: Response) => {
  try {
    const lang = new Lang();
    lang.label = req.body.label;

    await lang.save();
    res.status(201).json(lang);

  } catch (error) {
    res.sendStatus(500)
  }
});

export default langControllers;
