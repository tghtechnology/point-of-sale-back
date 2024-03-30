import * as AuthServicio from "../Services/AuthServicio";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { verificarSesion as verificacion } from "../Middleware/verificarSesion";

const prisma = new PrismaClient(); // Inicializa PrismaClient

/*export const verificarSesion = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      throw new Error("Token de autorización no proporcionado");
    }
    const usuarioId = await verificacion(token);
    req.usuarioId = usuarioId; // Corrige la asignación a req.usuarioId
    next();
  } catch (error) {
    console.error("Error al verificar sesión:", error);
    return res.status(401).json({ error: error.message });
  }
};*/

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await AuthServicio.login(email, password);
    
    return res.status(200).json({
      token: result.token,
      usuario_id: result.usuario_id
    });
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    if (error.message === "Nombre de usuario o contraseña incorrectos") {
      return res.status(401).json({ error: "Nombre de usuario o contraseña incorrectos" });
    } else if (error.message === "Sesión activa encontrada") {
      return res.status(401).json({ error: "Ya has iniciado sesión", activeSessions: true });
    } else {
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  }
};

export const logout = async (req, res) => {  
  try {
    const token = req.headers.authorization.split(" ")[1];
    await AuthServicio.logout(token);
    return res.json({ message: "Sesión cerrada exitosamente" });
  } catch (error) {
    console.error("Error al cerrar sesión:", error.message);
    return res.status(500).json({ error: "Error del servidor" });
  }
};

export const enviarTokenCambioPassword = async (req, res) => {
  const { email } = req.body;
  
  if (!email) {
    return res.status(400).json({ message: 'El correo electrónico es obligatorio' });
  }

  try {
    await AuthServicio.enviarCorreoCambioPass(email);
    return res.status(200).json({
      message: 'Se ha enviado un correo electrónico de cambio de contraseña',
    });
  } catch (error) {
    console.error("Error al enviar correo de cambio de contraseña:", error);
    if (error.message === "Correo no encontrado") {
      return res.status(404).json({ message: error.message });
    } else {
      return res.status(500).json({
        message: 'Ocurrió un error al enviar el correo. Por favor, inténtalo de nuevo más tarde',
      });
    }
  }
};

export const cambiarPassword = async (req, res) => {
  const { token, password } = req.body;
  
  try {
    await AuthServicio.cambiarPassword(token, password);
    return res.json({ message: "Contraseña actualizada" });
  } catch (error) {
    console.error("Error al cambiar la contraseña:", error.message);
    return res.status(500).json({ error: "Error del servidor" });
  }
};

export const eliminarTokensExpirados = async () => {
  try {
    await AuthServicio.eliminarTokensExpirados();
    console.log("Tokens expirados eliminados correctamente.");
  } catch (error) {
    console.error("Error al eliminar tokens expirados:", error.message);
  }
};

// Programación de la ejecución periódica para eliminar tokens expirados cada hora
const horasEnMilisegundos = 60 * 60 * 1000; // 1 hora en milisegundos
setInterval(eliminarTokensExpirados, horasEnMilisegundos);
