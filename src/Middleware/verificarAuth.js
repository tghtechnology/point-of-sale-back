import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const jwt = require('jsonwebtoken');

const verificarAuth = async (req, res, next) => {

    //Verificar autenticación
    const { authorization } = req.headers

    if (!authorization) {
        return res.status(401).json({error: "Requiere token de autorización"})
    }

    const token = authorization.split(' ')[1]

    try {
        const {id} = jwt.verify(token, process.env.SECRET)
        const usuario = await prisma.usuario.findUnique({
            where: {
                id: id
            },
            select: {
                id: true
            }
        })
        next()

    } catch (error) {
        console.log(error)
        res.status(401).json({error: "No autorizado"})
    }
}

module.exports = verificarAuth