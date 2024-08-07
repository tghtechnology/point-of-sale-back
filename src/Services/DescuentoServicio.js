import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Crea un nuevo descuento y lo guarda en la base de datos.
 * 
 * @param {string} nombre - El nombre del descuento. No debe estar vacío.
 * @param {string} tipo_descuento - El tipo de descuento (PORCENTAJE o MONTO). Debe ser uno de estos valores.
 * @param {number|string} valor - El valor del descuento. Debe ser un número. Si el tipo es PORCENTAJE, se espera un valor entre 0 y 100.
 * @param {number} usuario_id - El ID del usuario para el que se está creando el descuento.
 * 
 * @returns {Object} - Objeto representando el descuento creado y sus propiedades.
 * @throws {Error} - Si el tipo de descuento no es válido o si los campos requeridos están vacíos.
 */
const crearDescuento = async (nombre, tipo_descuento, valor, usuario_id) => {
  // Opciones de tipos de descuento que se deben ingresar
  const tiposValidos = ["PORCENTAJE", "MONTO"];
  // En el caso se ingrese otro tipo
  if (!tiposValidos.includes(tipo_descuento)) {
    throw new Error("Tipo de descuento no válido");
  }
  let valor_calculado = valor;
  // En el caso que se ingrese porcentaje(%)
  if (tipo_descuento === "PORCENTAJE") {
    // Convierte el valor a un porcentaje decimal
    valor_calculado = parseFloat(valor) / 100;
  }
  // En el caso que se ingrese un monto($)
  else if (tipo_descuento === "MONTO") {
    // Se mantiene el valor tal y como se ingreso
    valor_calculado = parseFloat(valor);
  }

  // Obtener el nombre de usuario
  const usuario = await prisma.usuario.findFirst({
    where: { id: usuario_id },
    select: { nombre: true }
  });

  const id_punto = await prisma.puntoDeVenta.findFirst({
    where: {
      estado: true,
      propietario: usuario.nombre
    },
    select: { id: true }
  });

  // Asignar id del punto de venta
  const id_puntoDeVenta = id_punto.id;

  const newDescuento = await prisma.descuento.create({
    data: {
      nombre: nombre,
      tipo_descuento: tipo_descuento,
      valor: valor,
      valor_calculado: valor_calculado,
      estado: true,
      id_puntoDeVenta: id_puntoDeVenta
    },
  });
  return newDescuento;
};

/**
 * Desactiva un descuento en la base de datos cambiando su estado a falso.
 * 
 * @param {number|string} id - El ID del descuento a desactivar.
 * @param {number} usuario_id - El ID del usuario para el que se está eliminando el descuento.
 * 
 * @returns {Object} - El objeto representando el descuento actualizado, incluyendo el estado modificado.
 * @throws {Error} - Si el ID no es válido o no se puede encontrar el descuento.
 */
const eliminarDescuento = async (id, usuario_id) => {
  // Obtener el id del punto de venta
  const id_puntoDeVenta = await obtenerIdPunto(usuario_id);

  // Actualizar solo el estado del descuento en la base de datos
  const descuento = await prisma.descuento.update({
    where: {
      id: Number(id),
      id_puntoDeVenta: id_puntoDeVenta,
      estado: true,
    },
    data: {
      estado: false,
    },
  });
  return descuento;
};

/**
 * Obtiene un descuento por su ID.
 * 
 * @param {number|string} id - El ID del descuento que se quiere obtener.
 * @param {number} usuario_id - El ID del usuario para el que se está listando el descuento por ID.
 * 
 * @returns {Object|null} - El objeto representando el descuento encontrado o null si no se encuentra.
 * @throws {Error} - Si el ID no es válido o si ocurre un error al buscar el descuento.
 */
const obtenerDescuentoById = async (id, usuario_id) => {
  const id_puntoDeVenta = await obtenerIdPunto(usuario_id);

  const descuento = await prisma.descuento.findFirst({
    where: {
      id: Number(id),
      id_puntoDeVenta: id_puntoDeVenta,
    },
  });
  return descuento;
};

/**
 * Modifica un descuento en la base de datos.
 * 
 * @param {number|string} id - El ID del descuento a modificar.
 * @param {string} nombre - El nuevo nombre del descuento.
 * @param {string} tipo_descuento - El nuevo tipo de descuento.
 * @param {number|string} valor - El nuevo valor del descuento.
 * @param {boolean} estado - El nuevo estado del descuento (opcional).
 * @param {number} usuario_id - El ID del usuario para el que se está modificando el descuento.
 * 
 * @returns {Object} - El objeto representando el descuento actualizado.
 * @throws {Error} - Si el ID no es válido o si ocurre un error al actualizar el descuento.
 */
const modificarDescuento = async (id, nombre, tipo_descuento, valor, estado, usuario_id) => {
  const tiposValidos = ["PORCENTAJE", "MONTO"];
  // Validar tipo de descuento
  if (!tiposValidos.includes(tipo_descuento)) {
    throw new Error("Tipo de descuento no válido");
  }
  // Calcular valor calculado
  let nuevoValorCalculado = valor;
  if (tipo_descuento === "PORCENTAJE") {
    nuevoValorCalculado = parseFloat(valor) / 100;
  } else if (tipo_descuento === "MONTO") {
    nuevoValorCalculado = parseFloat(valor);
  }

  // Obtener el id del punto de venta
  const id_puntoDeVenta = await obtenerIdPunto(usuario_id);

  // Actualizar descuento en la base de datos
  const descuento = await prisma.descuento.update({
    where: {
      id: Number(id),
      id_puntoDeVenta: id_puntoDeVenta,
      estado: true,
    },
    data: {
      nombre: nombre,
      tipo_descuento: tipo_descuento,
      valor: valor,
      valor_calculado: nuevoValorCalculado,
      estado: estado,
    },
  });

  return descuento;
};

/**
 * Obtiene todos los descuentos activos de la base de datos.
 * 
 * @param {number} usuario_id - El ID del usuario para el que se está listando los descuentos activos.
 * 
 * @returns {Array<Object>} - Una lista de objetos representando los descuentos activos.
 * @throws {Error} - Si ocurre un error al buscar los descuentos.
 */
const obtenerDescuentos = async (usuario_id) => {
  const id_puntoDeVenta = await obtenerIdPunto(usuario_id);

  const descuentos = await prisma.descuento.findMany({
    where: {
      estado: true,
      id_puntoDeVenta: id_puntoDeVenta,
    },
  });
  return descuentos;
};

/**
 * Obtiene todos los descuentos desactivados (eliminados).
 * 
 * @param {number} usuario_id - El ID del usuario para el que se está listando los descuentos desactivos.
 * 
 * @returns {Array<Object>} - Una lista de objetos representando los descuentos desactivados.
 * @throws {Error} - Si ocurre un error al buscar los descuentos.
 */
const obtenerDescuentosEliminados = async (usuario_id) => {
  const id_puntoDeVenta = await obtenerIdPunto(usuario_id);

  const descuentoseliminados = await prisma.descuento.findMany({
    where: {
      estado: false,
      id_puntoDeVenta: id_puntoDeVenta,
    },
  });
  return descuentoseliminados;
};

/**
 * Cambia el estado de un descuento.
 * 
 * @param {number|string} id - El ID del descuento a modificar.
 * @param {boolean} nuevoEstado - El nuevo estado para el descuento (verdadero para activo, falso para desactivado).
 * @param {number} usuario_id - El ID del usuario para el que se está cambiando d estado a un descuento.
 * 
 * @returns {Object} - El objeto representando el descuento actualizado con el nuevo estado.
 * @throws {Error} - Si el ID no es válido o si ocurre un error al actualizar el descuento.
 */
const cambiarEstadoDescuento = async (id, nuevoEstado, usuario_id) => {
  const id_puntoDeVenta = await obtenerIdPunto(usuario_id);

  // Actualizar solo el estado del descuento en la base de datos
  const descuento = await prisma.descuento.updateMany({
    where: {
      id: Number(id),
      id_puntoDeVenta: id_puntoDeVenta,
    },
    data: {
      estado: nuevoEstado,
    },
  });

  return descuento;
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

module.exports = {
  crearDescuento,
  eliminarDescuento,
  obtenerDescuentoById,
  modificarDescuento,
  obtenerDescuentos,
  cambiarEstadoDescuento,
  obtenerDescuentosEliminados,
};
