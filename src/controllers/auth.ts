import { Request, Response } from "express";
import { User } from "../models/user";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";

export async function login(req: Request, res: Response) {
    const data = req.body;

    const user = await User.findOne({
        where: {
            email: data.email
        }
    })

    if(!user) {
        return res
            .status(404)
            .json({ message: "Email não encontrado" })
    }

    const isSamePassword = await bcrypt.compare(data.password, user.password)

    if (!isSamePassword) {
        return res
            .status(401)
            .json({ message: "Senha invalida" })
    }

    const JWT_SECRET = process.env.JWT_SECRET!;

    const jwt = sign(
        { 
            id: user.id,
            email: user.email,
            name: user.name,
            cpf: user.cpf,
            password: user.password 
        },
        JWT_SECRET,
        {
            algorithm: "HS256",
            expiresIn: "1h"
        }
    )

    return res.json({
        user: user.convertToResponse(),
        token: jwt
    })
}