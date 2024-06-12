import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { validarNombrePais } from "../helpers/helperPais";
import * as EmailInvitacion from "../Utils/emailInvitacion";
import nodemailer from "nodemailer";
import { getUTCTime } from "../Utils/Time";

const prisma = new PrismaClient();

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

/**
 * Encripta una contraseña utilizando el algoritmo bcrypt.
 *
 * @param {string} password - La contraseña a encriptar.
 * @returns {Promise<string>} - La contraseña encriptada.
 *
 * @throws {Error} - Si no se proporciona una contraseña.
 *
 * @description Esta función encripta la contraseña proporcionada utilizando el algoritmo bcrypt.
 **/
const encryptPassword = async (password) => {
  if (!password) throw new Error("Se requiere una contraseña para encriptar.");
  return bcrypt.hash(password, 10);
};

/**
 * Busca un empleado por su ID en la base de datos.
 *
 * @param {string} id - El ID del empleado a buscar.
 * @returns {Promise<Object>} - Los datos del empleado encontrado.
 *
 * @throws {Error} - Si no se encuentra ningún empleado con el ID proporcionado.
 *
 * @description Esta función busca un empleado en la base de datos utilizando su ID y devuelve sus datos.
 **/
const buscarEmpleadoPorId = async (id, usuario_id) => {

  const id_puntoDeVenta = await obtenerIdPunto(usuario_id)

  const empleado = await prisma.usuario.findUnique({
    where: { 
      id: parseInt(id, 10),
      id_puntoDeVenta: id_puntoDeVenta
    },
  });
  if (!empleado) throw new Error(`No se encontró ningún empleado con el ID ${id}`);
  return empleado;
};

/**
 * Crea un nuevo empleado en la base de datos.
 *
 * @param {string} nombre - El nombre del nuevo empleado.
 * @param {string} email - El correo electrónico del nuevo empleado.
 * @param {string} telefono - El número de teléfono del nuevo empleado.
 * @param {string} cargo - El cargo del nuevo empleado.
 * @param {string} pais - El país del nuevo empleado.
 * @param {string} password - La contraseña del nuevo empleado.
 * @returns {Promise<Object>} - Los datos del nuevo empleado creado.
 *
 * @throws {Error} - Si el país proporcionado es inválido.
 *
 * @description Esta función crea un nuevo empleado en la base de datos con los datos proporcionados.
 **/
export const crearEmpleado = async (  nombre,
  email,
  telefono,
  cargo,
  pais,
  password,
  propietarioId, usuario_id) => {
  if (!validarNombrePais(pais)) throw new Error("País inválido");

  const hashedPassword = await encryptPassword(password);
  const fechaCreacion = getUTCTime(new Date().toISOString());

  //Obtener el nombre de usuario
  const usuario = await prisma.usuario.findFirst({
    where: {id: usuario_id},
    select: {nombre: true}
  })

  const id_punto = await prisma.puntoDeVenta.findFirst({
    where: {
      estado: true,
      propietario: usuario.nombre
    },
    select: {id: true}
  })

  //Asignar id del punto de venta
  const id_puntoDeVenta = id_punto.id

  if (!validarNombrePais(pais)) {
    throw new Error("País inválido");
  }
  const propietarioInfo=await prisma.usuario.findUnique({
    where:{
      id:propietarioId,
      estado:true,
      rol:"Propietario"
    }
  })

  const empleado = await prisma.usuario.create({
    data: {
      nombre,
      email,
      telefono,
      cargo,
      pais,
      nombreNegocio:propietarioInfo.nombreNegocio,
      rol: "Empleado",
      estado: true,
      password: hashedPassword,
      fecha_creacion: fechaCreacion,
      id_puntoDeVenta: id_puntoDeVenta,
    },
  });

  await transporter.sendMail(await EmailInvitacion.enviarCorreoBienvenida(email, nombre, email, password, process.env.URLEMPLOYE));
  return empleado;
};


/**
 * Edita los datos de un empleado en la base de datos.
 *
 * @param {string} id - El ID del empleado a editar.
 * @param {string} nombre - El nuevo nombre del empleado.
 * @param {string} email - El nuevo correo electrónico del empleado.
 * @param {string} telefono - El nuevo número de teléfono del empleado.
 * @param {string} cargo - El nuevo cargo del empleado.
 * @param {string} pais - El nuevo país del empleado.
 * @returns {Promise<Object>} - Los datos del empleado actualizado.
 *
 * @description Esta función edita los datos de un empleado en la base de datos utilizando su ID y los nuevos datos proporcionados.
 **/
export const editarEmpleado = async (id, nombre, email, telefono, cargo, pais, usuario_id) => {

  const id_puntoDeVenta = await obtenerIdPunto(parseInt(usuario_id))

  const empleadoExistente = await buscarEmpleadoPorId(id, usuario_id);
  const updatedEmpleado = await prisma.usuario.update({
    where: { id: empleadoExistente.id },
    data: {
      nombre,
      email,
      telefono,
      cargo,
      pais,
      estado: true,
      fecha_modificacion: getUTCTime(new Date().toISOString()),
      id_puntoDeVenta: id_puntoDeVenta,
    },
  });
  return updatedEmpleado;
};

/**
 * Lista los datos de un empleado por su ID.
 *
 * @param {string} id - El ID del empleado del que se desean obtener los datos.
 * @returns {Promise<Object>} - Los datos del empleado encontrado.
 *
 * @description Esta función busca un empleado en la base de datos utilizando su ID y devuelve sus datos.
 **/
export const listarEmpleadoPorId = async (id, usuario_id) => {
  return await buscarEmpleadoPorId(id, usuario_id);
};

/**
 * Elimina un empleado de la base de datos por su ID.
 *
 * @param {string} id - El ID del empleado a eliminar.
 * @returns {Promise<Object>} - Los datos del empleado eliminado.
 *
 * @description Esta función elimina un empleado de la base de datos utilizando su ID.
 **/
export const eliminarEmpleadoPorId = async (id, usuario_id) => {

  const id_puntoDeVenta = await obtenerIdPunto(usuario_id)

  return await prisma.usuario.update({
    where: { 
      id: parseInt(id, 10),
      id_puntoDeVenta: id_puntoDeVenta
    },
    data: { estado: false },
  });
};

/**
 * Lista todos los empleados activos en la base de datos.
 *
 * @returns {Promise<Array>} - Un arreglo que contiene los datos de todos los empleados activos.
 *
 * @description Esta función busca y devuelve todos los empleados activos en la base de datos.
 **/
export const listarEmpleados = async (usuario_id) => {

  const id_puntoDeVenta = await obtenerIdPunto(usuario_id)

  return await prisma.usuario.findMany({
    where: { 
      estado: true, 
      rol: "Empleado",
      id_puntoDeVenta: id_puntoDeVenta
    },
  });
};

/**
 * Cambia la contraseña de un empleado.
 *
 * @param {string} id - El ID del empleado cuya contraseña se va a cambiar.
 * @param {string} contraseñaActual - La contraseña actual del empleado.
 * @param {string} nuevaContraseña - La nueva contraseña del empleado.
 * @param {string} confirmarNuevaContraseña - La confirmación de la nueva contraseña.
 * @returns {Promise<Object>} - Los datos del empleado con la contraseña actualizada.
 *
 * @throws {Error} - Si la contraseña actual no es válida.
 * @throws {Error} - Si las nuevas contraseñas no coinciden.
 * @throws {Error} - Si la nueva contraseña está vacía.
 *
 * @description Esta función cambia la contraseña de un empleado en la base de datos, verificando primero la validez de la contraseña actual.
 **/
export const cambiarContraseña = async (id, contraseñaActual, nuevaContraseña, confirmarNuevaContraseña, usuario_id ) => {
  const empleado = await buscarEmpleadoPorId(id, usuario_id);

  if (!await bcrypt.compare(contraseñaActual, empleado.password))
    throw new Error(`La contraseña actual no es válida para el empleado con el ID ${id}`);

  if (nuevaContraseña !== confirmarNuevaContraseña)
    throw new Error(`Las contraseñas nuevas no coinciden`);

  if (!nuevaContraseña)
    throw new Error(`La nueva contraseña no puede estar vacía`);

  const hashedPassword = await encryptPassword(nuevaContraseña);
  return await prisma.usuario.update({
    where: { id: empleado.id },
    data: { password: hashedPassword },
  });
};

/**
 * Obtiene el ID del punto de venta asociado a un usuario.
 *
 * @param {number|string} usuario_id - El ID del usuario para el que se quiere obtener el ID del punto de venta.
 * @returns {number} - El ID del punto de venta asociado al usuario.
 * @throws {Error} - Si no se encuentra el usuario o no está asociado a un punto de venta.
 */
const obtenerIdPunto = async (usuario_id) => {
  const usuario = await prisma.usuario.findFirst({
    where: { id: usuario_id
     },
    select: { id_puntoDeVenta: true }
  });
  const punto=usuario.id_puntoDeVenta
  const usuarioExistente = await prisma.usuario.findFirst({
    where: { id: usuario_id,
      id_puntoDeVenta:punto
     },
    select: { id_puntoDeVenta: true }
  });

  if (!usuarioExistente) {
    throw new Error("Usuario no encontrado");
  }

  return usuarioExistente.id_puntoDeVenta;
};

