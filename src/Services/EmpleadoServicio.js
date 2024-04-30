import { validarNombrePais } from "../helpers/helperPais";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import * as EmailInvitacion from "../Utils/emailInvitacion";
import nodemailer from "nodemailer";

const prisma = new PrismaClient();



/**
 * Encripta una contraseña utilizando bcrypt.
 * 
 * @param {string} password - La contraseña que se va a encriptar.
 * 
 * @returns {Promise<string>} - Una promesa que resuelve con la contraseña encriptada.
 * @throws {Error} - Si no se proporciona una contraseña o si ocurre un error durante la encriptación.
 */
const encryptPassword = async (password) => {
  if (!password) {
    throw new Error("Se requiere una contraseña para encriptar.");
  }

  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
};


/**
 * Configura un transportador de correos electrónicos con nodemailer.
 * 
 * @returns {Object} - El objeto de configuración del transportador de correos electrónicos.
 * @throws {Error} - Si no se puede configurar el transportador.
 */
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});


/**
 * Crea un nuevo empleado y lo guarda en la base de datos.
 * 
 * @param {string} nombre - El nombre del empleado.
 * @param {string} email - El correo electrónico del empleado.
 * @param {string} telefono - El número de teléfono del empleado.
 * @param {string} cargo - El cargo del empleado.
 * @param {string} pais - El país del empleado. Debe ser válido según el sistema.
 * @param {string} password - La contraseña del empleado. Se encripta antes de guardarla.
 * 
 * @returns {Object} - Objeto representando el empleado creado.
 * @throws {Error} - Si el país no es válido o si ocurre un error durante la creación.
 */
export const crearEmpleado = async (
  nombre,
  email,
  telefono,
  cargo,
  pais,
  password
) => {
  const hashedPassword = await encryptPassword(password);

  if (!validarNombrePais(pais)) {
    throw new Error("País inválido");
  }

  const empleado = await prisma.usuario.create({
    data: {
      nombre,
      email,
      telefono,
      cargo,
      pais,
      rol: "Empleado",
      estado: true,
      password: hashedPassword,
    },
  });

  const mensajeCorreo = await EmailInvitacion.enviarCorreoBienvenida(
    email,
    nombre,
    password
  );
  await transporter.sendMail(mensajeCorreo);

  return empleado;
};




/**
 * Edita los datos de un empleado existente en la base de datos.
 * 
 * @param {number|string} id - El ID del empleado a editar.
 * @param {string} nombre - El nuevo nombre del empleado.
 * @param {string} email - El nuevo correo electrónico del empleado.
 * @param {string} telefono - El nuevo número de teléfono del empleado.
 * @param {string} cargo - El nuevo cargo del empleado.
 * @param {string} pais - El nuevo país del empleado.
 * @param {string} [password] - La nueva contraseña del empleado (opcional).
 * 
 * @returns {Object} - El objeto representando el empleado actualizado.
 * @throws {Error} - Si no se encuentra el empleado o si ocurre un error durante la actualización.
 */

export const editarEmpleado = async (
  id,
  nombre,
  email,
  telefono,
  cargo,
  pais,
  password
) => {
  const empleadoExistente = await prisma.usuario.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!empleadoExistente) {
    throw new Error(`No se encontró ningún empleado con el ID ${id}`);
  }

  let dataToUpdate = {
    nombre,
    email,
    telefono,
    cargo,
    pais,
    estado: true,
  };

  if (password && empleadoExistente.password !== password) {
    const hashedPassword = await encryptPassword(password);
    dataToUpdate.password = hashedPassword;
  }

  const empleado = await prisma.usuario.update({
    where: {
      id: Number(id),
    },
    data: dataToUpdate,
  });

  return empleado;
};



/**
 * Obtiene la información de un empleado por su ID.
 * 
 * @param {number|string} id - El ID del empleado a buscar.
 * 
 * @returns {Object|null} - El objeto representando al empleado encontrado, o null si no se encuentra.
 * @throws {Error} - Si no se encuentra un empleado con el ID especificado.
 */

export const listarEmpleadoPorId = async (id) => {
  const empleado = await prisma.usuario.findUnique({
    where: { id: parseInt(id, 10) },
  });

  if (!empleado) {
    throw new Error(`No se encontró ningún empleado con el ID ${id}`);
  }

  return empleado;
};




/**
 * Desactiva un empleado en la base de datos cambiando su estado a falso.
 * 
 * @param {number|string} id - El ID del empleado a desactivar.
 * 
 * @returns {Object} - El objeto representando al empleado desactivado.
 * @throws {Error} - Si el ID no es válido o si ocurre un error al actualizar el estado del empleado.
 */

export const eliminarEmpleadoPorId = async (id) => {
  return await prisma.usuario.update({
    where: { id: parseInt(id, 10) },
    data: { estado: false },
  });
};




/**
 * Obtiene todos los empleados activos.
 * 
 * @returns {Array<Object>} - Una lista de objetos representando a los empleados activos.
 * @throws {Error} - Si ocurre un error al buscar los empleados.
 */

export const listarEmpleados = async () => {
  return await prisma.usuario.findMany({
    where: { estado: true },
  });
};