import { Request, Response } from "express";
import { User } from "../models/user";
import bcrypt from "bcrypt";

export async function createUser(req: Request, res: Response) {
    const data = req.body;

    const salt = Number(process.env.BCRYPT_SALT_ROUNDS);

    const passwordHashed = await bcrypt.hash(data.password, salt);

    const newUser = await User.create({
        name: data.name,
        email: data.email,
        cpf: data.cpf,
        password: passwordHashed
    });

    return res.json(newUser.convertToResponse());
}