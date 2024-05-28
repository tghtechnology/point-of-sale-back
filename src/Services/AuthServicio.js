import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import getVerificationEmailTemplate from "../helpers/helperPlantilla";
import { PrismaClient } from "@prisma/client";
import { restaurarCuenta } from "./UsuarioServicio";
import { getUTCTime } from "../Utils/Time";

const prisma = new PrismaClient();

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const asyncErrorHandler = (promise) => promise.catch((error) => { throw error; });

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
 *
 * @description Esta función verifica las credenciales proporcionadas por el usuario para iniciar sesión. 
 * Si las credenciales son válidas, crea un token de sesión JWT que se utilizará para autenticar 
 * al usuario en futuras solicitudes.
 **/
export const login = async (email, password) => {
  const usuario = await asyncErrorHandler(prisma.usuario.findUnique({
    where: { email },
  }));
    // Verificar si el estado es falso y la fecha de eliminación temporal no es null
    if ( usuario.eliminado_temporal_fecha === null && usuario.estado===false) {
      throw new Error("La cuenta está eliminada permanentemente");
    }
  const match = await bcrypt.compare(password, usuario.password);
  if (!match) throw new Error("Nombre de usuario o contraseña incorrectos");

  await asyncErrorHandler(prisma.sesion.deleteMany({
    where: { usuario_id: usuario.id },
  }));

  await restaurarCuenta(usuario.id);

  const token = jwt.sign({ id: usuario.id, email: usuario.email }, "secreto_del_token", { expiresIn: "24h" });

  const todayISO = new Date().toISOString();
  const expiracion = getUTCTime(todayISO);
  expiracion.setHours(expiracion.getHours() + 24);

  const result = await asyncErrorHandler(prisma.sesion.create({
    data: {
      usuario_id: usuario.id,
      token,
      expiracion,
      //id_puntoDeVenta
    },
  }));

  return { usuario_id: result.usuario_id, token: result.token };
};

/**
 * Cierra la sesión de un usuario eliminando su token de autenticación.
 *
 * @param {string} token - El token JWT del usuario que desea cerrar sesión.
 * @throws {Error} - Si el token no es válido o la verificación con la clave secreta falla.
 * @returns {void} - No devuelve ningún valor. Simplemente elimina la sesión del usuario.
 *
 * @description Esta función revoca la sesión de un usuario, eliminando el token de sesión 
 * JWT asociado, lo que requiere que el usuario inicie sesión nuevamente para acceder a recursos protegidos.
 **/
export const logout = async (token) => {
  const decodedToken = jwt.verify(token, "secreto_del_token");
  await asyncErrorHandler(prisma.sesion.deleteMany({
    where: { usuario_id: decodedToken.id, token },
  }));
};

/**
 * Obtiene los datos de un usuario por su ID.
 *
 * @param {string} usuarioId - El ID del usuario del que se desean obtener los datos.
 * @returns {Object|null} - Los datos del usuario si se encuentran, de lo contrario, null.
 *
 * @description Esta función busca en la base de datos los datos de un usuario específico 
 * utilizando su ID y los devuelve si se encuentran. Si no se encuentra ningún usuario 
 * con el ID proporcionado, devuelve null.
 **/
export const obtenerDatosUsuarioPorId = async (usuarioId, usuario_id) => {
  const id_puntoDeVenta = await obtenerIdPunto(usuario_id)
  console.log(id_puntoDeVenta)

  return await asyncErrorHandler(prisma.usuario.findUnique({
    where: { 
      id: usuarioId,
      id_puntoDeVenta: id_puntoDeVenta
    },
  }));
};

/**
 * Envía un correo electrónico al usuario con un enlace para cambiar la contraseña.
 *
 * @param {string} email - La dirección de correo electrónico del usuario al que se enviará el enlace.
 * @throws {Error} - Si el correo no se encuentra en la base de datos.
 * @returns {void} - No devuelve ningún valor. Solo envía el correo electrónico.
 *
 * @description Esta función se utiliza para enviar un correo electrónico al usuario 
 * con un enlace único que le permite restablecer su contraseña en caso de olvido o 
 * necesidad de cambio.
 **/
export const enviarCorreoCambioPass = async (email) => {
  const usuario = await asyncErrorHandler(prisma.usuario.findUnique({
    where: { email },
    select: { id: true, nombre: true },
  }));

  if (!usuario) throw new Error("Correo no encontrado");

  const token = jwt.sign({ usuarioId: usuario.id, email }, "secreto_del_token_para_cambio_password", { expiresIn: "1h" });

  const todayISO = new Date().toISOString();
  const expiracion = getUTCTime(todayISO);
  expiracion.setHours(expiracion.getHours() + 1);

  await asyncErrorHandler(prisma.resetToken.create({
    data: {
      token,
      expiracion,
      usuario_id: usuario.id,
    },
  }));

  const resetPasswordLink = `http://${process.env.URL}/cambiar?token=${token}`;

  await asyncErrorHandler(transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Cambio de Contraseña",
    html: getVerificationEmailTemplate(usuario.nombre, resetPasswordLink),
  }));
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
 * @description Esta función permite al usuario cambiar su contraseña utilizando un token 
 * de restablecimiento previamente enviado a su correo electrónico. La contraseña se 
 * actualiza en la base de datos una vez que se verifica la validez del token.
 **/
export const cambiarPassword = async (token, password) => {
  if (!token) throw new Error("Falta el token");

  const decodedToken = jwt.verify(token, "secreto_del_token_para_cambio_password");
  const resetToken = await asyncErrorHandler(prisma.resetToken.findFirst({
    where: { token },
  }));

  if (!resetToken) throw new Error("El token no es válido o ha expirado");

  const usuario = await asyncErrorHandler(prisma.usuario.findUnique({
    where: { id: resetToken.usuario_id },
  }));

  if (!usuario) throw new Error("Usuario no encontrado");

  const hashedNewPassword = await bcrypt.hash(password, 10);

  await asyncErrorHandler(prisma.usuario.update({
    where: { id: resetToken.usuario_id },
    data: { password: hashedNewPassword },
  }));

  await asyncErrorHandler(prisma.resetToken.deleteMany({
    where: { usuario_id: resetToken.usuario_id },
  }));

  const activeSessions = await asyncErrorHandler(prisma.sesion.findMany({
    where: {
      usuario_id: usuario.id,
      expiracion: { gt: new Date() },
    },
  }));

  if (activeSessions.length > 0) await logout(activeSessions[0].token);
};

/**
 * Elimina los tokens de sesión expirados y los tokens de cambio de contraseña expirados de la base de datos.
 *
 * @returns {void} - No devuelve ningún valor. Realiza la acción de eliminación de tokens expirados.
 *
 * @throws {Error} - Si ocurre algún error durante la eliminación de tokens.
 *
 * @description Esta función elimina de la base de datos los tokens de sesión y los tokens 
 * de restablecimiento de contraseña que han expirado, manteniendo la base de datos limpia 
 * y reduciendo el almacenamiento de información innecesaria.
 **/
export const eliminarTokensExpirados = async () => {
  const eliminarTokenSesion = await asyncErrorHandler(prisma.resetToken.deleteMany({
    where: { expiracion: { lt: new Date() } },
  }));

  const eliminarTokenPassword = await asyncErrorHandler(prisma.sesion.deleteMany({
    where: { expiracion: { lt: new Date() } },
  }));

  if (eliminarTokenSesion.affectedRows > 0 || eliminarTokenPassword.affectedRows > 0) {
    console.log("Tokens expirados eliminados correctamente.");
  }
};

const obtenerIdPunto = async (usuario_id) => {
  const usuario = await prisma.usuario.findFirst({
    where: { id: usuario_id },
    select: { id_puntoDeVenta: true }
  });

  if (!usuario) {
    throw new Error("Usuario no encontrado");
  }

  return usuario.id_puntoDeVenta;
};
