import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { PrismaClient } from "@prisma/client";
import { connect } from "../database";
import getVerificationEmailTemplate from "../helpers/helperPlantilla";

const prisma = new PrismaClient();

// Lógica para iniciar sesión
export const login = async (email, password) => {
    const connection = await connect();
    const results = await prisma.usuario.findMany({
        where: {
            email: email
        }
    });
    
    if (results.length === 0) {
        throw new Error("Nombre de usuario o contraseña incorrectos");
    }

    const usuario = results[0];
    const match = await bcrypt.compare(password, usuario.password);
    
    if (!match) {
        throw new Error("Nombre de usuario o contraseña incorrectos");
    }

    const existingSessions = await prisma.sesion.findMany({
        where: {
            usuario_id: usuario.id
        }
    });

    if (existingSessions.length > 0) {
        throw new Error("Sesión activa encontrada");
    }
    
    const token = jwt.sign(
        { id: usuario.id, email: usuario.email },
        "secreto_del_token",
        { expiresIn: "24h" }
    );

    const expiracion = new Date();
    expiracion.setHours(expiracion.getHours() + 24);
    
    const result = await prisma.sesion.create({
        data: {
            usuario_id: usuario.id,
            token: token,
            expiracion: expiracion
        }
    });

    return {
        usuario_id: result.usuario_id,
        token: result.token
    };
};
  export const logout = async (token) => {
    //Decodificación de token
      const decodedToken = jwt.verify(token, "secreto_del_token"); 
      // Conexión a la base de datos
      const connection = await connect(); 
      // Eliminación del token de sesión del usuario
      await prisma.sesion.deleteMany({
        where: {
          usuario_id: decodedToken.id,
          token: token,
        },
      });
  };
// Función para enviar un correo electrónico al usuario con un enlace para cambiar la contraseña
export const enviarCorreoCambioPass = async (email) => {
    const usuario = await prisma.usuario.findUnique({
        where: { email: email },
        select: { id: true, nombre: true }
    });

    if (!usuario) {
        throw new Error("Correo no encontrado");
    }

    const token = jwt.sign(
        { usuarioId: usuario.id, email },
        "secreto_del_token_para_cambio_password",
        { expiresIn: "1h" }
    );

    const expiracion = new Date();
    expiracion.setHours(expiracion.getHours() + 1);

    await prisma.resetToken.create({
        data: {
            token: token,
            expiracion: expiracion,
            usuario_id: usuario.id
        }
    });

    const resetPasswordLink = `http://${process.env.URL}/cambiar?token=${token}`;
    
    const transporter = nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Cambio de Contraseña",
        html: getVerificationEmailTemplate(usuario.nombre, resetPasswordLink)
    });
};

// Cambiar la contraseña del usuario a través de un enlace con token
export const cambiarPassword = async (token, password) => {
  if (!token) {
      throw new Error("Falta el token");
  }

  const decodedToken = jwt.verify(token, "secreto_del_token_para_cambio_password");
  const resetToken = await prisma.resetToken.findFirst({
      where: {
          token: token,
          expiracion: { gt: new Date() }
      }
  });

  if (!resetToken) {
      throw new Error("El token no es válido o ha expirado");
  }

  const usuario = await prisma.usuario.findUnique({
      where: { id: resetToken.usuario_id }
  });

  if (!usuario) {
      throw new Error("Usuario no encontrado");
  }

  const hashedNewPassword = await bcrypt.hash(password, 10);

  await prisma.usuario.update({
      where: { id: resetToken.usuario_id },
      data: { password: hashedNewPassword }
  });

  await prisma.resetToken.deleteMany({
      where: { usuario_id: resetToken.usuario_id }
  });

  const activeSessions = await prisma.sesion.findMany({
      where: {
          usuario_id: usuario.id,
          expiracion: { gt: new Date() }
      }
  });

  if (activeSessions.length > 0) {
      await logout(activeSessions[0].token);
  }

  // Devolver un mensaje de éxito
  return "Cambio de contraseña exitoso";
};


// Función para eliminar tokens de sesión expirados y tokens de cambio de contraseña expirados de la base de datos
export const eliminarTokensExpirados = async () => {
    const eliminarTokenSesion = await prisma.resetToken.deleteMany({
        where: { expiracion: { lt: new Date() } }
    });

    const eliminarTokenPassword = await prisma.sesion.deleteMany({
        where: { expiracion: { lt: new Date() } }
    });

    if (eliminarTokenSesion.affectedRows > 0 || eliminarTokenPassword.affectedRows > 0) {
        console.log("Tokens expirados eliminados correctamente.");
    }
};

// Función para verificar contraseña antes de eliminar
export const verificarContrasena = async (id, password) => {
    const passwordFromRequest = password;
    const contrasena = await prisma.usuario.findUnique({
        where: {
            id: parseInt(id),
            estado: true
        }
    });

    if (!contrasena) {
        return null;
    }

    const hashedPasswordFromDatabase = contrasena.password;
    const match = await bcrypt.compare(passwordFromRequest, hashedPasswordFromDatabase);

    return match;
};

module.exports = {
  login,
  logout,
  enviarCorreoCambioPass,
  cambiarPassword,
  eliminarTokensExpirados,
  verificarContrasena 
}