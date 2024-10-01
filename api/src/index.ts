import express from "express";
import router from "./router";
import { dataSource } from "./db/client";
import "reflect-metadata";

const app = express();

// app.get('/maroute, fonction de callback)
app.use(express.json());



app.use('/api', router);

app.listen(3001, async () => {
  await dataSource.initialize();
  console.log(`Serveur is listenning on http://localhost:3001`);
});
