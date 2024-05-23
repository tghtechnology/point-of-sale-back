import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function desasociarPos(id_puntoDeVenta) {
    // Array de modelos que tienen el campo id_puntoDeVenta
    const modelosConPuntoDeVenta = [
      'Categoria',
      'Descuento',
      'Impuesto',
      'Articulo',
      'Cliente',
      'Venta',
      'DetalleVenta',
      'Recibo',
      'Usuario',
      'Sesion'
    ];
  
    // Actualizar registros asociados en otros modelos
    for (const modelo of modelosConPuntoDeVenta) {
      const registros = await prisma[modelo].findMany({
        where: { id_puntoDeVenta: id_puntoDeVenta },
      });

      for (const registro of registros) {
        await prisma[modelo].update({
          where: { id: registro.id },
          data: { id_puntoDeVenta: null },
        });
      }
    }
  }
  