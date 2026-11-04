import express from "express";
import { connectToDb } from "./database/sequelize";
import { Music } from "./models/music";
import { createMusic, deleteMusic, findMusicById, listAllMusics, updateMusic } from "./controllers/music";
import cors from "cors";
import dotenv from "dotenv";
import { createUser } from "./controllers/user";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors({ origin: "*" }))

connectToDb()
.then(()=> {
    new Music();
});

app.post("/users", createUser);

app.post("/musics", createMusic); // C
app.get("/musics", listAllMusics);  // R
app.get("/musics/:id", findMusicById);
app.put("/musics/:id", updateMusic); // U
app.delete("/musics/:id", deleteMusic); //D

app.listen(Number(process.env.SERVER_PORT!), () => {
    console.log("Servidor rodando em http://localhost:3000");
})