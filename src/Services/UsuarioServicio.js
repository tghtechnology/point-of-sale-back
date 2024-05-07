import { validarNombrePais } from "../helpers/helperPais";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { logout } from "../Services/AuthServicio";
import { cuerpoCorreo } from "../helpers/helperEmail";
import { envioCorreo } from "../Utils/SendEmail";
import { getUTCTime } from "../Utils/Time";
import { cuerpoPermanente } from "../helpers/helperPermanente";
import { cuerpoRestaurado } from "../helpers/helperRestaurado";
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
  const usuario=await validarUsuario(usuario_id, password, token);
  await eliminarSesionesActivas(usuario_id);

  const usuarioInfo = await prisma.usuario.findUnique({
    where: {
      id: parseInt(usuario_id)
    },
    select: {
      email: true,
      nombre:true 
    }
  });
  const cuerpo = cuerpoPermanente(usuarioInfo.nombre);
  await envioCorreo(usuarioInfo.email,  "Cuenta eliminada permanente",cuerpo);
  
  const results = await prisma.usuario.delete({ 
    where: { 
      id: parseInt(usuario_id) 
    } });
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
    select: { eliminado_temporal_fecha: true }
  });
  if (!usuario || !usuario.eliminado_temporal_fecha) {
    return false;
  }
  const unaSemanaEnMiliseg = 7 * 24 * 60 * 60 * 1000;
  const fechaEliminacion = new Date(usuario.eliminado_temporal_fecha);

  if (Date.now() - fechaEliminacion <= unaSemanaEnMiliseg) {
    await prisma.usuario.update({
      where: { id: parseInt(id) },
      data: { estado: true, eliminado_temporal_fecha: null }
    });
    const usuarioInfo = await prisma.usuario.findUnique({
      where: {
        id: parseInt(id)
      },
      select: {
        email: true,
        nombre:true 
      }
    });
    const cuerpo = cuerpoRestaurado(usuarioInfo.nombre);
    await envioCorreo(usuarioInfo.email,  "Cuenta restaurada",cuerpo);
    return true;
  } else {
    return false;
  }
};

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