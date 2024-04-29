import { validarNombrePais } from "../helpers/helperPais";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { logout } from "../Services/AuthServicio";
import { cuerpoCorreo } from "../helpers/helperEmail";
import { envioCorreo } from "../Utils/SendEmail";
import { getUTCTime } from "../Utils/Time";

const prisma = new PrismaClient();

/**
 * Busca un usuario por su ID en la base de datos.
 *
 * @param {string} id - El ID del usuario a buscar.
 * @returns {Promise<Object>} - Los datos del usuario encontrado.
 *
 * @throws {Error} - Si no se encuentra ningún usuario con el ID proporcionado.
 *
 * @description Esta función busca un usuario en la base de datos utilizando su ID y devuelve sus datos.
 **/
const buscarUsuarioPorId = async (id) => {
  const usuario = await prisma.usuario.findUnique({
    where: { id: parseInt(id) },
  });
  if (!usuario) {
    throw new Error(`No se encontró ningún usuario con el ID ${id}`);
  }
  return usuario;
};

/**
 * Valida la contraseña de un usuario.
 *
 * @param {Object} usuario - Los datos del usuario.
 * @param {string} contraseña - La contraseña a validar.
 *
 * @throws {Error} - Si la contraseña proporcionada no coincide con la contraseña del usuario.
 *
 * @description Esta función valida la contraseña proporcionada comparándola con la contraseña almacenada del usuario.
 **/
const validarContraseña = async (usuario, contraseña) => {
  const match = await bcrypt.compare(contraseña, usuario.password);
  if (!match) {
    throw new Error("Contraseña incorrecta");
  }
};

/**
 * Crea un nuevo usuario en la base de datos.
 *
 * @param {string} nombre - El nombre del nuevo usuario.
 * @param {string} email - El correo electrónico del nuevo usuario.
 * @param {string} password - La contraseña del nuevo usuario.
 * @param {string} pais - El país del nuevo usuario.
 * @param {string} telefono - El número de teléfono del nuevo usuario.
 * @returns {Promise<Object>} - Los datos del nuevo usuario creado.
 *
 * @throws {Error} - Si el país proporcionado es inválido.
 *
 * @description Esta función crea un nuevo usuario en la base de datos con los datos proporcionados.
 **/
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
      rol: "Propietario",
      telefono,
      cargo: "Gerente",
      estado: true,
      nombreNegocio:nombreNegocio,
      fecha_creacion: fechaCreacion,
    },
  });
  return newUsuario;
};

/**
 * Edita los datos de un usuario en la base de datos.
 *
 * @param {string} id - El ID del usuario a editar.
 * @param {string} nombre - El nuevo nombre del usuario.
 * @param {string} email - El nuevo correo electrónico del usuario.
 * @param {string} telefono - El nuevo número de teléfono del usuario.
 * @param {string} pais - El nuevo país del usuario.
 * @returns {Promise<Object>} - Los datos del usuario actualizado.
 *
 * @throws {Error} - Si el país proporcionado es inválido.
 * @throws {Error} - Si no se encuentra ningún usuario con el ID proporcionado.
 *
 * @description Esta función edita los datos de un usuario en la base de datos utilizando su ID y los nuevos datos proporcionados.
 **/
export const editarUsuarioPorId = async (id, nombre, email, telefono, pais) => {
  if (!validarNombrePais(pais)) {
    throw new Error("País inválido");
  }
  const usuarioExistente = await buscarUsuarioPorId(id);
  const updatedUsuario = await prisma.usuario.update({
    where: { id: usuarioExistente.id },
    data: {
      nombre,
      email,
      telefono,
      pais,
      fecha_modificacion: getUTCTime(new Date().toISOString()),
    },
  });
  return updatedUsuario;
};

/**
 * Lista todos los usuarios activos en la base de datos.
 *
 * @returns {Promise<Array>} - Un arreglo que contiene los datos de todos los usuarios activos.
 *
 * @description Esta función busca y devuelve todos los usuarios activos en la base de datos.
 **/
export const listarUsuarios = async () => {
  return await prisma.usuario.findMany({
    where: { estado: true, rol: "Propietario" },
  });
};

/**
 * Cambia la contraseña de un usuario.
 *
 * @param {string} id - El ID del usuario cuya contraseña se va a cambiar.
 * @param {string} contraseñaActual - La contraseña actual del usuario.
 * @param {string} nuevaContraseña - La nueva contraseña del usuario.
 * @param {string} verificarContraseña - La confirmación de la nueva contraseña.
 * @returns {Promise<Object>} - Un objeto que indica que la contraseña ha sido actualizada correctamente.
 *
 * @throws {Error} - Si la contraseña actual no es válida.
 * @throws {Error} - Si la nueva contraseña y la verificación no coinciden.
 *
 * @description Esta función cambia la contraseña de un usuario utilizando su ID y las nuevas contraseñas proporcionadas.
 **/
export const cambiarContraseña = async (id, contraseñaActual, nuevaContraseña, verificarContraseña) => {
  const usuario = await buscarUsuarioPorId(id);
  await validarContraseña(usuario, contraseñaActual);
  if (nuevaContraseña !== verificarContraseña) {
    throw new Error("La nueva contraseña y la verificación no coinciden");
  }
  const hashedNuevaContraseña = await bcrypt.hash(nuevaContraseña, 10);
  await prisma.usuario.update({
    where: { id: usuario.id },
    data: { password: hashedNuevaContraseña },
  });
  return { message: "Contraseña actualizada correctamente" };
};

/**
 * Elimina las sesiones activas de un usuario.
 *
 * @param {string} usuario_id - El ID del usuario cuyas sesiones se van a eliminar.
 * @returns {Promise<void>} - No devuelve ningún valor.
 *
 * @description Esta función elimina las sesiones activas de un usuario utilizando su ID.
 **/
export const eliminarSesionesActivas = async (usuario_id) => {
  const activeSessions = await prisma.sesion.findMany({
    where: { usuario_id: usuario_id, expiracion: { gt: new Date() } },
  });
  if (activeSessions.length > 0) await logout(activeSessions[0].token);
};

/**
 * Elimina temporalmente la cuenta de un usuario.
 *
 * @param {string} usuario_id - El ID del usuario cuya cuenta se va a eliminar temporalmente.
 * @param {string} password - La contraseña del usuario.
 * @param {string} token - El token de autenticación del usuario.
 * @returns {Promise<Object>} - Un objeto que indica que la cuenta ha sido eliminada temporalmente.
 *
 * @throws {Error} - Si la cuenta ya ha sido eliminada.
 *
 * @description Esta función elimina temporalmente la cuenta de un usuario, enviando un correo electrónico de confirmación.
 **/
export const eliminarTemporalmente = async (usuario_id, password, token) => {
  const usuario = await buscarUsuarioPorId(usuario_id);
  await validarContraseña(usuario, password);
  if (!usuario.estado) {
    throw new Error("Cuenta eliminada");
  }
  const usuarioInfo = await prisma.usuario.findUnique({
    where: { id: usuario.id },
    select: { email: true, nombre: true },
  });
  const cuerpo = cuerpoCorreo(usuarioInfo.nombre);
  await envioCorreo(usuarioInfo.email, "Cuenta eliminada temporalmente", cuerpo);
  await eliminarSesionesActivas(usuario_id);
  const eliminado_temporal_fecha = getUTCTime(new Date().toISOString());
  const results = await prisma.usuario.update({
    where: { id: usuario.id },
    data: {
      estado: false,
      eliminado_temporal_fecha,
    },
  });
  return results;
};

/**
 * Elimina permanentemente la cuenta de un usuario.
 *
 * @param {string} usuario_id - El ID del usuario cuya cuenta se va a eliminar permanentemente.
 * @param {string} password - La contraseña del usuario.
 * @param {string} token - El token de autenticación del usuario.
 * @returns {Promise<void>} - No devuelve ningún valor.
 *
 * @throws {Error} - Si la contraseña no es válida.
 *
 * @description Esta función elimina permanentemente la cuenta de un usuario y todas sus sesiones activas.
 **/
export const eliminarPermanentemente = async (usuario_id, password, token) => {
  const usuario = await buscarUsuarioPorId(usuario_id);
  await validarContraseña(usuario, password);
  await eliminarSesionesActivas(usuario_id);
  return await prisma.usuario.delete({
    where: { id: usuario_id },
  });
};

/**
 * Elimina las cuentas que han estado inactivas durante más de una semana.
 *
 * @param {string} id - El ID de las cuentas a eliminar.
 * @returns {Promise<boolean>} - true si se eliminaron cuentas, de lo contrario, false.
 *
 * @description Esta función elimina permanentemente las cuentas que han estado inactivas durante más de una semana.
 **/
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
 * Restaura la cuenta de un usuario si ha sido eliminada temporalmente y ha pasado menos de una semana.
 *
 * @param {string} id - El ID del usuario cuya cuenta se va a restaurar.
 * @returns {Promise<boolean>} - true si se restauró la cuenta, de lo contrario, false.
 *
 * @description Esta función restaura la cuenta de un usuario si ha sido eliminada temporalmente y ha pasado menos de una semana.
 **/
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