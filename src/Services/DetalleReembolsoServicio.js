import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Crea un nuevo detalle de reembolso en la base de datos.
 * 
 * @param {number} articuloId - El ID del artículo para el que se está creando el detalle de reembolso.
 * @param {number} reciboId - El ID del recibo asociado con este detalle de reembolso.
 * @param {number} cantidadDevuelta - La cantidad de artículos que se están devolviendo.
 * @param {number} subtotal - El subtotal correspondiente a la cantidad devuelta de este artículo.
 * 
 * @returns {Object} - El objeto representando el detalle de reembolso recién creado.
 * @throws {Error} - Si ocurre un error durante la creación del detalle de reembolso.
 */
export const CrearDetalleReembolso = async (articuloId, reciboId, cantidadDevuelta, subtotal) => {
  const newDetalle = await prisma.detalleReembolso.create({
    data: {
      articuloId: articuloId,
      reciboId: reciboId,
      cantidadDevuelta: cantidadDevuelta,
      subtotal: subtotal,
    },
  });
  return newDetalle;
};

/**
 * Obtiene todos los detalles de reembolso de la base de datos.
 * 
 * @returns {Array<Object>} - Una lista de objetos representando todos los detalles de reembolso.
 * @throws {Error} - Si ocurre un error al buscar los detalles de reembolso.
 */
export const ListarDetallesReembolso = async () => {
  const detallesReembolso = await prisma.detalleReembolso.findMany();
  return detallesReembolso;
};

/**
 * Obtiene un detalle de reembolso específico por su ID.
 * 
 * @param {number|string} id - El ID del detalle de reembolso a buscar.
 * 
 * @returns {Object|null} - El objeto representando el detalle de reembolso, o null si no se encuentra el detalle.
 * @throws {Error} - Si ocurre un error al buscar el detalle de reembolso por su ID.
 */
export const ListarDetallesReembolsoById = async (id) => {
  const detallesReembolso = await prisma.detalleReembolso.findUnique({
    where: {
      id: Number(id),
    },
  });
  return detallesReembolso;
};

/**
 * Obtiene todos los detalles de reembolso asociados con un recibo específico por el ID del recibo.
 * 
 * @param {number|string} reciboId - El ID del recibo para buscar sus detalles de reembolso.
 * 
 * @returns {Array<Object>} - Una lista de objetos representando los detalles de reembolso asociados con el recibo.
 * @throws {Error} - Si ocurre un error al buscar los detalles de reembolso por el ID del recibo.
 */
export const ListarDetallesReembolsoByReciboId = async (reciboId) => {
  const detallesReembolso = await prisma.detalleReembolso.findMany({
    where: {
      reciboId: Number(reciboId),
    },
  });
  return detallesReembolso;
};
