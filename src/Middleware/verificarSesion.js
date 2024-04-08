import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { secret } from "../config.js"
const prisma = new PrismaClient();

export const verificarSesion = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: "Token no proporcionado" }); 
  }

  try {
    const decoded = jwt.verify(token, secret); 
    req.usuarioId = decoded.id;

    const usuario = await prisma.usuario.findFirst({
      where: {
        id: usuarioId
      }
    });

    if (!usuario || usuario.id !== usuario) {
      return res.status(401).json({ error: "Usuario no encontrado" });
    }

    req.usuarioId = usuario; 
    next(); 
  } catch (error) {
    return res.status(401).json({ error: "Token inválido" }); 
  }
};