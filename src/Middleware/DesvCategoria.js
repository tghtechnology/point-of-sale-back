//Función para desvincular el id de una categoría eliminada de todos los artículos que la posean
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function desasociarArticulo(id_categoria) {
  // Actualizar los artículos asociados a la categoría
  await prisma.articulo.updateMany({
    where: { id_categoria: id_categoria },
    data: { id_categoria: null },
  });
}