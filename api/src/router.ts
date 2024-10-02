import express from "express";
import { Response } from "express";
import repoControllers from "./repos/repos.controllers";
import statusControllers from "./status/status.controllers";
import langControllers from "./langs/lang.controllers";

const router = express.Router();

router.get("/", (_, res: Response) => {
  console.log(res)
  res.send("Hello wilders")
});

router.use('/repos', repoControllers);
router.use('/status', statusControllers);
router.use('/langs', langControllers);

export default router;