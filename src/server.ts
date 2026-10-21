import express from "express";
import { connectToDb } from "./database/sequelize";
import { Music } from "./models/music";

const app = express();

connectToDb()
.then(()=> {
    new Music();
});

app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
})