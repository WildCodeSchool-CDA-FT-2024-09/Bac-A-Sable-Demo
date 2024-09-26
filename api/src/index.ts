import express from "express";
import router from "./router"
const app = express();

// app.get('/maroute, fonction de callback)
app.use(express.json());



app.use('/api', router);

app.listen(3001, () => {
  console.log(`Serveur is listenning on http://localhost:3001`);
});
