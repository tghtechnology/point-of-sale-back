import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import getVerificationEmailTemplate from "../helpers/helperPlantilla";
import { PrismaClient } from "@prisma/client";
import { restaurarCuenta } from "./UsuarioServicio";
import { getUTCTime } from "../Utils/Time";

const prisma = new PrismaClient();

/**
 * Autentica a un usuario y crea una nueva sesión.
 *
 * @param {string} email - El correo electrónico del usuario que intenta iniciar sesión.
 * @param {string} password - La contraseña asociada a la cuenta del usuario.
 *
 * @returns {Object} - Un objeto que contiene el ID del usuario autenticado y un token JWT válido por 24 horas.
 *
 * @throws {Error} - Si el correo electrónico no corresponde a ningún usuario en la base de datos.
 * @throws {Error} - Si la contraseña no coincide con la del usuario encontrado.
 * @throws {Error} - Si hay algún problema al restaurar la cuenta o al crear una nueva sesión.
 **/
export const login = async (email, password) => {
  const results = await prisma.usuario.findMany({
    where: {
      email: email,
    },
  });
  if (results.length === 0) {
    throw new Error("Nombre de usuario o contraseña incorrectos");
  }
  const usuario = results[0];

  const match = await bcrypt.compare(password, usuario.password);
  if (!match) {
    throw new Error("Nombre de usuario o contraseña incorrectos");
  }
  await prisma.sesion.deleteMany({
    where: {
      usuario_id: usuario.id,
    },
  });
  const cuentaRestaurada = await restaurarCuenta(usuario.id);
  if (cuentaRestaurada) {
    console.log("La cuenta fue restaurada exitosamente");
  }
  const token = jwt.sign(
    { id: usuario.id, email: usuario.email },
    "secreto_del_token",
    { expiresIn: "24h" }
  );

  const todayISO = new Date().toISOString();
  const expiracion = getUTCTime(todayISO);
  expiracion.setHours(expiracion.getHours() + 24);

  const result = await prisma.sesion.create({
    data: {
      usuario_id: usuario.id,
      token: token,
      expiracion: expiracion,
    },
  });

  return {
    usuario_id: result.usuario_id,
    token: result.token,
  };
};

/**
 * Cierra la sesión de un usuario eliminando su token de autenticación.
 *
 * @param {string} token - El token JWT del usuario que desea cerrar sesión.
 * @throws {Error} - Si el token no es válido o la verificación con la clave secreta falla.
 * @returns {void} - No devuelve ningún valor. Simplemente elimina la sesión del usuario.
 **/
// Lógica para cerrar sesión
export const logout = async (token) => {
  const decodedToken = jwt.verify(token, "secreto_del_token");
  // Eliminación del token de sesión del usuario
  await prisma.sesion.deleteMany({
    where: {
      usuario_id: decodedToken.id,
      token: token,
    },
  });
};

// Función para obtener los datos de un usuario por su ID
export const obtenerDatosUsuarioPorId = async (usuarioId) => {
  const usuario = await prisma.usuario.findUnique({
    where: { id: usuarioId },
  });
  return usuario;
};

/**
 * Envía un correo electrónico al usuario con un enlace para cambiar la contraseña.
 *
 * @param {string} email - La dirección de correo electrónico del usuario al que se enviará el enlace.
 * @throws {Error} - Si el correo no se encuentra en la base de datos.
 * @returns {void} - No devuelve ningún valor. Solo envía el correo electrónico.
 *
 * @description
 * 1. Verifica si el correo electrónico proporcionado existe en la base de datos.
 * 2. Genera un token JWT con una validez de 1 hora para el cambio de contraseña.
 * 3. Crea un registro en la base de datos para el token de restablecimiento de contraseña.
 * 4. Genera un enlace con el token para que el usuario pueda cambiar su contraseña.
 * 5. Configura el transporte de correo electrónico con nodemailer usando las credenciales proporcionadas.
 * 6. Envía el correo electrónico al usuario con el enlace de restablecimiento de contraseña.
 **/
// Función para enviar un correo electrónico al usuario con un enlace para cambiar la contraseña
export const enviarCorreoCambioPass = async (email) => {
  // Verificar si el correo electrónico existe en la base de datos
  const usuario = await prisma.usuario.findUnique({
    where: {
      email: email,
    },
    select: {
      id: true,
      nombre: true,
    },
  });

  if (!usuario) {
    throw new Error("Correo no encontrado");
  }
  // Generar un token para el cambio de contraseña
  const token = jwt.sign(
    { usuarioId: usuario.id, email },
    "secreto_del_token_para_cambio_password",
    { expiresIn: "1h" }
  );

  const todayISO = new Date().toISOString();
  const expiracion = getUTCTime(todayISO);
  expiracion.setHours(expiracion.getHours() + 1);

  console.log("Token generado para el cambio de contraseña:", token);
  console.log("Fecha de expiración del token:", expiracion);

  await prisma.resetToken.create({
    data: {
      token: token,
      expiracion: expiracion,
      usuario_id: usuario.id,
    },
  });

  // Generar el enlace para cambiar la contraseña
  const resetPasswordLink = `http://${process.env.URL}/cambiar?token=${token}`;

  // Configurar el transporte de correo electrónico
  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // Enviar el correo electrónico con el enlace para cambiar la contraseña
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Cambio de Contraseña",
    html: getVerificationEmailTemplate(usuario.nombre, resetPasswordLink),
  });
};

/**
 * Cambia la contraseña del usuario a través de un enlace con un token de restablecimiento.
 *
 * @param {string} token - El token JWT que se ha enviado al usuario para el cambio de contraseña.
 * @param {string} password - La nueva contraseña que se asignará al usuario.
 *
 * @throws {Error} - Si el token está vacío, es inválido o ha expirado, o si el usuario no se encuentra.
 *
 * @returns {void} - No devuelve ningún valor. Realiza la acción de cambio de contraseña.
 *
 * @description
 * 1. Verifica si el token proporcionado es válido y no ha expirado.
 * 2. Busca al usuario asociado con el token para verificar su existencia.
 * 3. Encripta la nueva contraseña con bcrypt y la actualiza en la base de datos.
 * 4. Elimina el token de restablecimiento de contraseña una vez que se ha cambiado la contraseña.
 * 5. Comprueba si el usuario tiene sesiones activas y las cierra para seguridad.
 **/
export const cambiarPassword = async (token, password) => {
  // Verificar si el token está vacío
  if (!token) {
    throw new Error("Falta el token");
  }
  // Descodificar el token
  const decodedToken = jwt.verify(
    token,
    "secreto_del_token_para_cambio_password"
  );
  //Verificacion de token
  const resetToken = await prisma.resetToken.findFirst({
    where: {
      token: token,
      /*expiracion: {
            gt: new Date(),
          },*/
    },
  });

  if (!resetToken) {
    throw new Error("El token no es válido o ha expirado");
  }
  //Busqueda del usuario
  const usuario = await prisma.usuario.findUnique({
    where: {
      id: resetToken.usuario_id,
    },
  });

  if (!usuario) {
    throw new Error("Usuario no encontrado");
  }

  // Encriptar la nueva contraseña
  const hashedNewPassword = await bcrypt.hash(password, 10);

  // Actualizar la contraseña del usuario en la base de datos
  await prisma.usuario.update({
    where: {
      id: resetToken.usuario_id,
    },
    data: {
      password: hashedNewPassword,
    },
  });

  // Eliminar el token usado de la base de datos después de cambiar la contraseña
  await prisma.resetToken.deleteMany({
    where: {
      usuario_id: resetToken.usuario_id,
    },
  });

  // Verificar si el usuario tiene una sesión activa
  const activeSessions = await prisma.sesion.findMany({
    where: {
      usuario_id: usuario.id,
      expiracion: {
        gt: new Date(),
      },
    },
  });

  // Si el usuario tiene una sesión activa, cerrarla
  if (activeSessions.length > 0) {
    await logout(activeSessions[0].token);
  }
};

/**
 * Elimina los tokens de sesión expirados y los tokens de cambio de contraseña expirados de la base de datos.
 *
 * @returns {void} - No devuelve ningún valor. Realiza la acción de eliminación de tokens expirados.
 *
 * @description
 * 1. Elimina todos los tokens de sesión cuyo campo de expiración sea menor que la fecha actual.
 * 2. Elimina todos los tokens de restablecimiento de contraseña con un campo de expiración menor que la fecha actual.
 * 3. Si se eliminan tokens, muestra un mensaje de éxito en la consola.
 *
 * @throws {Error} - Si ocurre algún error durante la eliminación de tokens.
 **/
export const eliminarTokensExpirados = async () => {
  const eliminarTokenSesion = await prisma.resetToken.deleteMany({
    where: {
      expiracion: {
        lt: new Date(),
      },
    },
  });

  const eliminarTokenPassword = await prisma.sesion.deleteMany({
    where: {
      expiracion: {
        lt: new Date(),
      },
    },
  });

  if (
    eliminarTokenSesion.affectedRows > 0 ||
    eliminarTokenPassword.affectedRows > 0
  ) {
    console.log("Tokens expirados eliminados correctamente.");
  }
};
