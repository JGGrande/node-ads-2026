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