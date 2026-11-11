import { Request, Response } from "express";
import { Author } from "../models/author";

export async function createAuthor(req: Request, res: Response) {
    const data = req.body;

    const newAuthor = await Author.create({
        name: data.name,
        photoUrl: data.photoUrl
    });

    return res.json(newAuthor);
}

export async function listAllAuthors(req: Request, res: Response) {
    const authors = await Author.findAll();
    return res.json(authors);
}

export async function findAuthorById(req: Request, res: Response) {
    try {
        const data = req.params;

        const author = await Author.findByPk(Number(data.id));

        if (!author) {
            return res.sendStatus(404);
        }

        return res.json(author);
    } catch {
        return res.status(500).json({ message: "Erro interno no servidor!" });
    }
}

export async function updateAuthor(req: Request, res: Response) {
    const data = req.body;
    const params = req.params;

    const author = await Author.findByPk(Number(params.id));

    if (!author) {
        return res.status(404).json({ message: "Autor não encontrado." });
    }

    author.name = data.name;
    author.photoUrl = data.photoUrl;

    await author.save();

    return res.json(author);
}

export async function deleteAuthor(req: Request, res: Response) {
    const params = req.params;
    const id = Number(params.id);

    const author = await Author.findByPk(id);

    if (!author) {
        return res.status(404).json({ message: "Autor não encontrado" });
    }

    await author.destroy();

    return res.sendStatus(204);
}
