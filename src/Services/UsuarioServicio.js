import { validarNombrePais } from "../helpers/helperPais";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { logout } from "../Services/AuthServicio";
import { cuerpoCorreo } from "../helpers/helperEmail";
import { envioCorreo } from "../Utils/SendEmail";
import { getUTCTime } from "../Utils/Time";
const prisma = new PrismaClient();




/**
 * Crea un nuevo usuario (propietario) y lo guarda en la base de datos.
 * 
 * @param {string} nombre - El nombre del usuario.
 * @param {string} email - El correo electrónico del usuario.
 * @param {string} password - La contraseña del usuario, que será encriptada.
 * @param {string} pais - El país del usuario. Debe ser válido.
 * @param {string} telefono - El número de teléfono del usuario.
 * @param {string} nombreNegocio - El nombre del negocio del usuario.
 * 
 * @returns {Object} - El objeto representando el usuario creado.
 * @throws {Error} - Si el país no es válido o si ocurre un error durante la creación del usuario.
 */
export const crearUsuario = async (nombre, email, password, pais, telefono, nombreNegocio) => {
  if (!validarNombrePais(pais)) {
    throw new Error("País inválido");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const fechaCreacion = getUTCTime(new Date().toISOString());
  const newUsuario = await prisma.usuario.create({
    data: {
      nombre,
      email,
      pais,
      password: hashedPassword,
      nombreNegocio:nombreNegocio,
      rol: "Propietario",
      telefono,
      cargo: "Gerente",
      estado: true,
      fecha_creacion: fechaCreacion,
    },
  });
  return newUsuario;
};

const validarUsuario = async (id, password, token) => {
  if (!token) {
    throw new Error("Token no proporcionado");
  }
  const sesion = await prisma.sesion.findFirst({
    where: {
      token,
    },
  });
  if (!sesion) {
    throw new Error("Debe iniciar sesión");
  }
  const usuario = await prisma.usuario.findUnique({
    where: {
      id: parseInt(id),
      estado: true,
    },
    select: {
      password: true,
    },
  });
  if (!usuario) {
    throw new Error("Usuario no encontrado");
  }
  const match = await bcrypt.compare(password, usuario.password);
  if (!match) {
    throw new Error("Contraseña incorrecta");
  }
  return usuario;
};




/**
 * Elimina todas las sesiones activas para un usuario específico.
 * 
 * @param {number|string} usuario_id - El ID del usuario para el cual se eliminarán las sesiones activas.
 * 
 * @returns {void}
 * @throws {Error} - Si ocurre un error durante la eliminación de las sesiones.
 */

const eliminarSesionesActivas = async (usuario_id) => {
  const activeSessions = await prisma.sesion.findMany({
    where: { usuario_id: usuario_id, expiracion: { gt: new Date() } },
  });

  if (activeSessions.length > 0) await logout(activeSessions[0].token);
};




/**
 * Elimina temporalmente un usuario por ID, desactivando su cuenta.
 * 
 * @param {number|string} usuario_id - El ID del usuario a eliminar temporalmente.
 * @param {string} password - La contraseña del usuario para verificación.
 * @param {string} token - El token de sesión para autenticación.
 * 
 * @returns {Object} - El objeto representando el usuario actualizado después de la eliminación temporal.
 * @throws {Error} - Si la cuenta ya está eliminada, si las credenciales no son válidas, o si ocurre un error durante el proceso.
 */

export const eliminarTemporalmente = async (usuario_id, password, token) => {
  const usuarioverificado = await prisma.usuario.findUnique({
    where: {
      id: parseInt(usuario_id),
      estado: false,
    },
  });
  if (usuarioverificado) {
    throw new Error("Cuenta eliminada");
  }

  const usuario = await validarUsuario(usuario_id, password, token);

  const usuarioInfo = await prisma.usuario.findUnique({
    where: {
      id: parseInt(usuario_id),
    },
    select: {
      email: true,
      nombre: true,
    },
  });

  const cuerpo = cuerpoCorreo(usuarioInfo.nombre);
  await envioCorreo(
    usuarioInfo.email,
    "Cuenta eliminada temporalmente",
    cuerpo
  );

  await eliminarSesionesActivas(usuario_id);
  const todayISO = new Date().toISOString()
  const eliminado_temporal_fecha = getUTCTime(todayISO)
  const results = await prisma.usuario.update({
    
    where: { id: parseInt(usuario_id) },
    data: {
      estado: false,
      eliminado_temporal_fecha:eliminado_temporal_fecha,
    },
  });

  return results;
};




/**
 * Elimina permanentemente un usuario por su ID, removiéndolo de la base de datos.
 * 
 * @param {number|string} usuario_id - El ID del usuario a eliminar permanentemente.
 * @param {string} password - La contraseña del usuario para verificación.
 * @param {string} token - El token de sesión para autenticación.
 * 
 * @returns {Object} - El objeto representando el usuario eliminado.
 * @throws {Error} - Si las credenciales no son válidas, si ocurre un error durante la eliminación, o si no se encuentra el usuario.
 */

export const eliminarPermanentemente = async (usuario_id, password, token) => {
  const usuario = await validarUsuario(usuario_id, password, token);
  await eliminarSesionesActivas(usuario_id);
  const results = await prisma.usuario.delete({
    where: {
      id: parseInt(usuario_id),
    },
  });
  return results;
};




/**
 * Elimina las cuentas que fueron desactivadas hace más de una semana.
 * 
 * @param {number|string} id - El ID de la cuenta a verificar para eliminación.
 * 
 * @returns {boolean} - Verdadero si al menos una cuenta fue eliminada, falso si no se eliminó ninguna.
 * @throws {Error} - Si ocurre un error durante la eliminación de las cuentas vencidas.
 */

export const eliminarCuentasVencidas = async (id) => {
  const fechaUnaSemanaAtras = new Date();
  fechaUnaSemanaAtras.setDate(fechaUnaSemanaAtras.getDate() - 7);

  const results = await prisma.usuario.deleteMany({
    where: {
      id: parseInt(id),
      estado: false,
      eliminado_temporal_fecha: { lte: fechaUnaSemanaAtras },
    },
  });

  return results.count > 0;
};




/**
 * Restaura una cuenta eliminada temporalmente si se encuentra dentro del período de gracia de una semana.
 * 
 * @param {number|string} id - El ID del usuario a restaurar.
 * 
 * @returns {boolean} - Verdadero si la cuenta fue restaurada, falso si el período de gracia ya pasó o la cuenta no puede ser restaurada.
 * @throws {Error} - Si ocurre un error durante la restauración de la cuenta.
 */

export const restaurarCuenta = async (id) => {
  const usuario = await prisma.usuario.findUnique({
    where: { id: parseInt(id) },
    select: { eliminado_temporal_fecha: true },
  });
  if (!usuario || !usuario.eliminado_temporal_fecha) {
    return false;
  }
  const unaSemanaEnMiliseg = 7 * 24 * 60 * 60 * 1000;
  const fechaEliminacion = new Date(usuario.eliminado_temporal_fecha);

  if (Date.now() - fechaEliminacion <= unaSemanaEnMiliseg) {
    await prisma.usuario.update({
      where: { id: parseInt(id) },
      data: { estado: true, eliminado_temporal_fecha: null },
    });
    return true;
  } else {
    return false;
  }
};