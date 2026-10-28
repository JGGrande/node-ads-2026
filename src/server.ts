import express from "express";
import { connectToDb } from "./database/sequelize";
import { Music } from "./models/music";
import { createMusic } from "./controllers/music";

const app = express();

app.use(express.json());

connectToDb()
.then(()=> {
    new Music();
});

app.post("/musics", createMusic);

app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
})