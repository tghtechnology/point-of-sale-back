import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { secret } from "../config.js";
const prisma = new PrismaClient();

/**
 * Middleware para verificar la sesión del usuario mediante un token JWT.
 *
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @param {Function} next - Función de siguiente middleware.
 * @returns {void}
 *
 * @description Este middleware verifica si el usuario tiene una sesión activa mediante un token JWT proporcionado en los encabezados de la solicitud.
 * Si el token no está presente, devuelve un error de no autorizado.
 * Si el token está presente, se verifica su validez utilizando la clave secreta.
 * Si el token es válido, se decodifica para obtener el ID de usuario.
 * Luego, busca al usuario en la base de datos y lo adjunta a la solicitud.
 * Si el usuario no está autenticado o el token no es válido, devuelve un error de no autorizado.
 **/
export const verificarSesion = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: "Token no proporcionado" });
  }
  try {
    const decoded = jwt.verify(token, secret);
    req.usuarioId = decoded.id;

    const usuario = await prisma.usuario.findFirst({
      where: {id: usuarioId,},
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