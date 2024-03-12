import { connect } from "../database";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import getVerificationEmailTemplate from "../helpers/helperPlantilla";

// Función para autenticar a un usuario
export const login = async (email, password) => {
  try {
    const connection = await connect();

    const [results] = await connection.execute(
      "SELECT * FROM usuarios WHERE email = ?",
      [email]
    );

    if (results.length === 0) {
      throw new Error("Nombre de usuario o contraseña incorrectos");
    }

    const usuario = results[0];

    const match = await bcrypt.compare(password, usuario.password);
    if (!match) {
      throw new Error("Nombre de usuario o contraseña incorrectos");
    }

    const [existingSessions] = await connection.execute(
      "SELECT * FROM sesiones WHERE usuario_id = ?",
      [usuario.id]
    );

    if (existingSessions.length > 0) {
      throw new Error("Ya hay una sesión activa para este usuario");
    }

    const token = jwt.sign(
      { id: usuario.id, email: usuario.email },
      "secreto_del_token",
      { expiresIn: "24h" }
    );

    await connection.execute(
      "INSERT INTO sesiones (usuario_id, token, expiracion) VALUES (?, ?, DATE_ADD(NOW(), INTERVAL 24 HOUR))",
      [usuario.id, token]
    );

    return token;
  } catch (error) {
    console.error("Error al autenticar al usuario:", error);
    throw new Error("Ocurrió un error. Por favor, inténtelo de nuevo más tarde");
  }
};

// Función para enviar token de cambio de contraseña por correo electrónico
export const enviarTokenCambioPassword = async (email) => {
  try {
    const connection = await connect();

    const [results] = await connection.execute(
      "SELECT id, nombre FROM usuarios WHERE email = ?",
      [email]
    );

    if (results.length === 0) {
      // No se encontró ningún usuario con ese correo electrónico, no enviamos un mensaje de error al cliente
      return;
    }

    const usuario = results[0];

    const token = jwt.sign(
      { userId: usuario.id, email },
      process.env.JWT_RESET_SECRET,
      { expiresIn: "1h" }
    );

    const resetPasswordLink = `https://ejemplo/cambiar-pass?token=${token}`;

    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Cambio de Contraseña",
      html: getVerificationEmailTemplate(usuario.nombre, resetPasswordLink),
    });

    // Si todo está bien, no enviamos ningún mensaje de éxito al cliente
    return;
  } catch (error) {
    console.error("Error al enviar el correo electrónico:", error);
    // No enviamos mensajes de error específicos al cliente, solo una respuesta genérica
    return "Ocurrió un error. Por favor, inténtelo de nuevo más tarde";
  }
};

// Función para cambiar la contraseña del usuario a través de un enlace con token
export const cambiarPassword = async (token, newPassword) => {
  try {
    if (!token) {
      throw new Error("Falta el token");
    }

    if (newPassword.length < 8) {
      throw new Error("La nueva contraseña debe tener al menos 8 caracteres");
    }

    const decodedToken = jwt.verify(token, "secreto_del_token_para_cambio_password");

    const connection = await connect();

    const [results] = await connection.execute(
      "SELECT * FROM usuarios WHERE id = ?",
      [decodedToken.userId]
    );

    if (results.length === 0) {
      throw new Error("Usuario no encontrado");
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    await connection.execute(
      "UPDATE usuarios SET password = ? WHERE id = ?",
      [hashedNewPassword, decodedToken.userId]
    );

    return "¡Contraseña actualizada exitosamente!";
  } catch (error) {
    console.error("Error al cambiar la contraseña:", error);
    throw new Error("Ocurrió un error. Por favor, inténtelo de nuevo más tarde");
  }
};

// Función para eliminar tokens de sesión expirados y tokens de cambio de contraseña expirados de la base de datos
export const eliminarTokensExpirados = async () => {
  try {
    const connection = await connect();

    // Eliminar tokens de sesión expirados
    const [deletedSessionTokens] = await connection.execute(
      "DELETE FROM sesiones WHERE expiracion < NOW()"
    );

    // Eliminar tokens de cambio de contraseña expirados
    const [deletedResetTokens] = await connection.execute(
      "DELETE FROM reset_tokens WHERE expiracion < NOW()"
    );

    if (deletedSessionTokens.affectedRows > 0 || deletedResetTokens.affectedRows > 0) {
      console.log("Tokens expirados eliminados correctamente.");
    }
  } catch (error) {
    console.error("Error al eliminar tokens expirados:", error);
    throw new Error("Ocurrió un error. Por favor, inténtelo de nuevo más tarde");
  }
};