import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


/**
 * Crea un nuevo descuento y lo guarda en la base de datos.
 * 
 * @param {string} nombre - El nombre del descuento. No debe estar vacío.
 * @param {string} tipo_descuento - El tipo de descuento (PORCENTAJE o MONTO). Debe ser uno de estos valores.
 * @param {number|string} valor - El valor del descuento. Debe ser un número. Si el tipo es PORCENTAJE, se espera un valor entre 0 y 100.
 * 
 * @returns {Object} - Objeto representando el descuento creado y sus propiedades.
 * @throws {Error} - Si el tipo de descuento no es válido o si los campos requeridos están vacíos.
 */

const crearDescuento = async (nombre, tipo_descuento, valor) => {
  //Opciones de tipos de descuento que se deben ingresar
  const tiposValidos = ["PORCENTAJE", "MONTO"];
  //En el caso se ingrese otro tipo
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
    //Se mantiene el valor tal y como se ingreso
    valor_calculado = parseFloat(valor);
  }
  const newDescuento = await prisma.descuento.create({
    data: {
      nombre: nombre,
      tipo_descuento: tipo_descuento,
      valor: valor,
      valor_calculado: valor_calculado,
      estado: true,
    },
  });
  return newDescuento;
};



/**
 * Desactiva un descuento en la base de datos cambiando su estado a falso.
 * 
 * @param {number|string} id - El ID del descuento a desactivar.
 * 
 * @returns {Object} - El objeto representando el descuento actualizado, incluyendo el estado modificado.
 * @throws {Error} - Si el ID no es válido o no se puede encontrar el descuento.
 */

const eliminarDescuento = async (id) => {
  // Actualizar solo el estado del descuento en la base de datos
  const descuento = await prisma.descuento.update({
    where: {
      id: Number(id),
    },
    data: {
      estado: false,
    },
  });
};




/**
 * Obtiene un descuento por su ID.
 * 
 * @param {number|string} id - El ID del descuento que se quiere obtener.
 * 
 * @returns {Object|null} - El objeto representando el descuento encontrado o null si no se encuentra.
 * @throws {Error} - Si el ID no es válido o si ocurre un error al buscar el descuento.
 */

const obtenerDescuentoById = async (id) => {
  const descuento = await prisma.descuento.findFirst({
    where: {
      id: Number(id),
    },
  });
  return descuento;
};

const modificarDescuento = async (id,nombre,tipo_descuento,valor,estado) => {
  const tiposValidos = ["PORCENTAJE", "MONTO"];
  // Validar tipo de descuento
  if (!tiposValidos.includes(tipo_descuento)) {
    throw new Error("Tipo de descuento no válido");
  }
  // Calcular valor calculado
  let nuevoValorCalculado = valor;
  if (tipo_descuento === "PORCENTAJE") {
    nuevoValorCalculado = parseFloat(valor) / 100;
  }
  if (tipo_descuento === "MONTO") {
    nuevoValorCalculado = parseFloat(valor);
  }

  // Verificar si se proporciona el estado
  let nuevoEstado;
  if (estado !== undefined) {
    nuevoEstado = estado;
  }

  // Actualizar descuento en la base de datos
  const descuento = await prisma.descuento.update({
    where: {
      id: Number(id),
    },
    data: {
      nombre: nombre,
      tipo_descuento: tipo_descuento,
      valor: valor,
      valor_calculado: nuevoValorCalculado,
      estado: nuevoEstado,
    },
  });
  const updatedDescuento = {
    nombre: descuento.nombre,
    tipo_descuento: descuento.tipo_descuento,
    valor: descuento.valor,
    valor_calculado: descuento.valor_calculado,
    estado: descuento.estado,
  };

  return updatedDescuento;
};




/**
 * Obtiene todos los descuentos activos de la base de datos.
 * 
 * @returns {Array<Object>} - Una lista de objetos representando los descuentos activos.
 * @throws {Error} - Si ocurre un error al buscar los descuentos.
 */

const obtenerDescuentos = async () => {
  const descuentos = await prisma.descuento.findMany({
    where: {
      estado: true,
    },
  });
  return descuentos;
};




/**
 * Obtiene todos los descuentos desactivados (eliminados) de la base de datos.
 * 
 * @returns {Array<Object>} - Una lista de objetos representando los descuentos desactivados.
 * @throws {Error} - Si ocurre un error al buscar los descuentos.
 */

const obtenerDescuentosEliminados = async () => {
  const descuentoseliminados = await prisma.descuento.findMany({
    where: {
      estado: false,
    },
  });
  return descuentoseliminados;
};



/**
 * Cambia el estado de un descuento.
 * 
 * @param {number|string} id - El ID del descuento a modificar.
 * @param {boolean} nuevoEstado - El nuevo estado para el descuento (verdadero para activo, falso para desactivado).
 * 
 * @returns {Object} - El objeto representando el descuento actualizado con el nuevo estado.
 * @throws {Error} - Si el ID no es válido o si ocurre un error al actualizar el descuento.
 */

const cambiarEstadoDescuento = async (id, nuevoEstado) => {
  // Actualizar solo el estado del descuento en la base de datos
  const descuento = await prisma.descuento.update({
    where: {
      id: Number(id),
    },
    data: {
      estado: nuevoEstado,
    },
  });
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
