import { Request, Response } from "express";
import { Music } from "../models/music";

export async function createMusic(req: Request, res: Response) {
    const data = req.body;

    const newMusic = await Music.create({
        title: data.title,
        durationInSeconds: data.durationInSeconds,
        releaseYear: data.releaseYear,
        photoUrl: data.photoUrl
    });

    return res.json(newMusic)
}

export async function listAllMusics(req: Request, res: Response) {
    const musics = await Music.findAll();
    return res.json(musics);
}

export async function findMusicById(req: Request, res: Response) {
    try {
        const data = req.params;
    
        const music = await Music.findByPk(Number(data.id));
        
        if (!music) {
            return res.sendStatus(404);
        }
    
        return res.json(music);
    } catch {
        return res.status(500).json({ message: "Erro interno no servidor!" })
    }
}

export async function updateMusic(req: Request, res: Response) {
    const data = req.body;
    const params = req.params;

    const music = await Music.findByPk(Number(params.id));

    if (!music) {
        return res.status(404).json({ message: "Musica não encontrada." })
    }

    music.title = data.title;
    music.durationInSeconds = data.durationInSeconds;
    music.releaseYear = data.releaseYear;
    music.photoUrl = data.photoUrl;

    await music.save();

    return res.json(music);
}

export async function deleteMusic(req: Request, res: Response) {
    const params = req.params;
    const id = Number(params.id);

    const music = await Music.findByPk(id);

    if (!music) {
        return res.status(404).json({ message: "Musica não encontrada" })
    }

    await music.destroy();

    return res.sendStatus(204);
}