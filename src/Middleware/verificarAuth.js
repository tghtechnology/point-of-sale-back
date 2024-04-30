import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");

/**
 * Middleware para verificar la autenticación del usuario.
 *
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @param {Function} next - Función de siguiente middleware.
 * @returns {void}
 *
 * @description Este middleware verifica si el usuario está autenticado mediante un token de autorización.
 * Si el token no está presente, devuelve un error de no autorizado.
 * Si el token está presente, verifica su validez y extrae el ID de usuario.
 * Luego busca al usuario en la base de datos y lo adjunta a la solicitud.
 * Si el usuario no está autenticado o el token no es válido, devuelve un error de no autorizado.
 */
export const verificarAuth = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Requiere token de autorización" });
  }

  const token = authorization.split(" ")[1];

  try {
    const { id } = jwt.verify(token, process.env.SECRET);
    const usuario = await prisma.usuario.findUnique({
      where: {id: id,},
      select: {id: true,},
    });
    req.usuario = usuario;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "No autorizado" });
  }
};

/**
 * Middleware para verificar si el usuario es propietario.
 *
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @param {Function} next - Función de siguiente middleware.
 * @returns {void}
 *
 * @description Este middleware verifica si el usuario autenticado tiene el rol de "Propietario".
 * Si el usuario no es propietario, devuelve un error de acceso prohibido.
 **/
export const isPropietario = async (req, res, next) => {
  try {
    const usuario = await prisma.usuario.findUnique({
      where: {id: req.usuario.id,},
    });

    if (usuario && usuario.rol === "Propietario") {
      next();
    } else {
      return res.status(403).json({ message: "Requiere rol de Propietario" });
    }
  } catch (error) {
    console.error("Error en middleware isPropietario:", error);
    return res.status(500).json({ message: "Error en el servidor" });
  }
};

/**
 * Middleware para verificar si el usuario es empleado.
 *
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @param {Function} next - Función de siguiente middleware.
 * @returns {void}
 *
 * @description Este middleware verifica si el usuario autenticado tiene el rol de "Empleado".
 * Si el usuario no es empleado, devuelve un error de acceso prohibido.
 **/
export const isEmpleado = async (req, res, next) => {
  try {
    const usuario = await prisma.usuario.findUnique({
      where: {id: req.usuario.id,},
    });

    if (usuario && usuario.rol === "Empleado") {
      next();
    } else {
      return res.status(403).json({ message: "Requiere rol de Empleado" });
    }
  } catch (error) {
    console.error("Error en middleware", error);
    return res.status(500).json({ message: "Error en el servidor" });
  }
};