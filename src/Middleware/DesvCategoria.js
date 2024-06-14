//Función para desvincular el id de una categoría eliminada de todos los artículos que la posean
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


/**
 * Desvincula una categoría eliminada de todos los artículos que la posean.
 *
 * @param {number|string} id_categoria - El ID de la categoría que se va a desvincular de los artículos.
 * @returns {Promise<void>} - No devuelve ningún valor, pero puede lanzar errores si falla la actualización.
 * 
 * @throws {Error} - Si ocurre un error durante la actualización de los artículos en la base de datos.
 *
 * @description Esta función actualiza todos los artículos que están asociados con una categoría específica
 * para desasociar dicha categoría. Esto se logra estableciendo el campo `id_categoria` a `null` para todos
 * los artículos que tienen el ID de la categoría proporcionada.
 */
export async function desasociarArticulo(id_categoria) {
  // Actualizar los artículos asociados a la categoría
  await prisma.articulo.updateMany({
    where: { id_categoria: id_categoria },
    data: { id_categoria: null },
  });
}