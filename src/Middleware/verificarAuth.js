import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const jwt = require('jsonwebtoken');

export const verificarAuth = async (req, res, next) => {

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
        req.usuario = usuario
        next()

    } catch (error) {
        console.log(error)
        res.status(401).json({error: "No autorizado"})
    }
}

export const isPropietario = async (req, res, next) => {
    try {
    const usuario = await prisma.usuario.findUnique({
        where: {
            id: req.usuario.id,
        }
    })

    if(usuario && usuario.rol === "Propietario") {
        next()
    } else {
        return res.status(403).json({message: "Requiere rol de Propietario"})
    }
    } catch (error) {
    // Manejar cualquier error de la base de datos u otros errores
    console.error("Error en middleware isPropietario:", error);
    return res.status(500).json({ message: "Error en el servidor" });
}
}

export const isEmpleado = async (req, res, next) => {
    try {
        const usuario = await prisma.usuario.findUnique({
            where: {
                id: req.usuario.id,
            }
        })
    
        if(usuario && usuario.rol === "Empleado") {
            next()
        } else {
            return res.status(403).json({message: "Requiere rol de Empleado"})
        }
        } catch (error) {
        // Manejar cualquier error de la base de datos u otros errores
        console.error("Error en middleware", error);
        return res.status(500).json({ message: "Error en el servidor" });
    }
}