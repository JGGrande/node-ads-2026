import express from "express";
import { connectToDb } from "./database/sequelize";
import { Music } from "./models/music";
import { Author } from "./models/author";
import { createMusic, deleteMusic, findMusicById, listAllMusics, updateMusic } from "./controllers/music";
import { createAuthor, deleteAuthor, findAuthorById, listAllAuthors, updateAuthor } from "./controllers/author";
import cors from "cors";
import dotenv from "dotenv";
import { createUser } from "./controllers/user";
import { login } from "./controllers/auth";
import { authMiddleware } from "./middlewares/authMiddleware";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors({ origin: "*" }))

connectToDb()
.then(()=> {
    new Music();
    new Author();
});

app.post("/auth/login", login);
app.post("/users", createUser);

app.use(authMiddleware);

app.post("/musics", createMusic); // C
app.get("/musics", listAllMusics);  // R
app.get("/musics/:id", findMusicById);
app.put("/musics/:id", updateMusic); // U
app.delete("/musics/:id", deleteMusic); //D

app.post("/authors", createAuthor);
app.get("/authors", listAllAuthors);
app.get("/authors/:id", findAuthorById);
app.put("/authors/:id", updateAuthor);
app.delete("/authors/:id", deleteAuthor);

app.listen(Number(process.env.SERVER_PORT!), () => {
    console.log("Servidor rodando em http://localhost:3000");
})