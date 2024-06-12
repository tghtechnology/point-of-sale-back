import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


/**
 * Desactiva todos los registros asociados a un punto de venta específico.
 *
 * @param {string} id_puntoDeVenta - El ID del punto de venta cuyos registros se desean desactivar.
 * @returns {void} - No devuelve ningún valor. Actualiza el estado de los registros a falso.
 */
export async function desactivarRegistros(id_puntoDeVenta) {
    // Array de modelos que tienen el campo id_puntoDeVenta
    const modelosConPuntoDeVenta = [
      'Categoria',
      'Descuento',
      'Impuesto',
      'Articulo',
      'Cliente',
      'Usuario'
    ];
  
    // Actualizar registros asociados en otros modelos
    for (const modelo of modelosConPuntoDeVenta) {
      const registros = await prisma[modelo].findMany({
        where: { id_puntoDeVenta: id_puntoDeVenta },
      });

      for (const registro of registros) {
        await prisma[modelo].update({
          where: { id: registro.id },
          data: { estado: false },
        });
      }
    }
  }


  /**
 * Reactiva todos los registros asociados a un punto de venta específico.
 *
 * @param {string} id_puntoDeVenta - El ID del punto de venta cuyos registros se desean reactivar.
 * @returns {void} - No devuelve ningún valor. Actualiza el estado de los registros a verdadero.
 */
  export async function reactivarRegistros(id_puntoDeVenta) {
    // Array de modelos que tienen el campo id_puntoDeVenta
    const modelosConPuntoDeVenta = [
      'Categoria',
      'Descuento',
      'Impuesto',
      'Articulo',
      'Cliente',
      'Usuario'
    ];
  
    // Actualizar registros asociados en otros modelos
    for (const modelo of modelosConPuntoDeVenta) {
      const registros = await prisma[modelo].findMany({
        where: { id_puntoDeVenta: id_puntoDeVenta },
      });

      for (const registro of registros) {
        await prisma[modelo].update({
          where: { id: registro.id },
          data: { estado: true },
        });
      }
    }
  }
  