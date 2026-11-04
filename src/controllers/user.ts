import { Request, Response } from "express";
import { User } from "../models/user";

export async function createUser(req: Request, res: Response) {
    const data = req.body;

    const newUser = await User.create({
        name: data.name,
        email: data.email,
        cpf: data.cpf,
        password: data.password
    });

    return res.json(newUser);
}