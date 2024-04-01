import { NextFunction, Request, Response } from "express"
import { UnauthorizedException } from "../exceptions/unathorized"
import { ErrorCode } from "../exceptions/root"
import * as jwt from "jsonwebtoken"
import { JWT_SECRET } from "../secrets"
import {prismaClient } from ".."

const authMiddleware = async(req, res, next) => {
    const token = req.headers.authorization
    if (!token) {
        next(new UnauthorizedException("No autorizado", ErrorCode.UNAUTHORIZED))
    }
    try {
        const payload = jwt.verify(token, JWT_SECRET) as any
        const usuario = await prismaClient.usuario.findFirst({where: {id: payload.userId}})
    }
}