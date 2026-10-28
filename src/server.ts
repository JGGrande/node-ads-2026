import express from "express";
import { connectToDb } from "./database/sequelize";
import { Music } from "./models/music";
import { createMusic, deleteMusic, findMusicById, listAllMusics, updateMusic } from "./controllers/music";

const app = express();

app.use(express.json());

connectToDb()
.then(()=> {
    new Music();
});

app.post("/musics", createMusic); // C
app.get("/musics", listAllMusics);  // R
app.get("/musics/:id", findMusicById);
app.put("/musics/:id", updateMusic); // U
app.delete("/musics/:id", deleteMusic); //D

app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
})