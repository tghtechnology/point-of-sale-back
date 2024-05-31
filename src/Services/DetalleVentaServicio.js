import { PrismaClient } from "@prisma/client";
import { cambiarEstadoDescuento } from "../controllers/DescuentoControlador";
const prisma = new PrismaClient();




/**
 * Crea un nuevo detalle de venta y lo guarda en la base de datos.
 * 
 * @param {number} cantidad - La cantidad de artículos vendidos.
 * @param {number|string} articuloId - El ID del artículo vendido.
 * @param {number|string} ventaId - El ID de la venta a la que pertenece el detalle.
 * 
 * @returns {Object} - El objeto representando el nuevo detalle de venta creado, incluyendo el subtotal calculado.
 * @throws {Error} - Si el ID del artículo no es válido o si ocurre un error al crear el detalle.
 */

const CrearDetalle=async(cantidad, articuloId, ventaId, usuario_id)=>{
  //console.log(usuario_id)
    //Obtener el nombre de usuario
    const usuario = await prisma.usuario.findFirst({
      where: { id: usuario_id },
      select: { nombre: true, id_puntoDeVenta:true }
      });
      const punto= usuario.id_puntoDeVenta

      const id_punto = await prisma.puntoDeVenta.findFirst({
          where: {
              id:punto
          },
        // select: { id: true }
      });
  
      //Asignar id del punto de venta
      const id_puntoDeVenta = id_punto.id

    const info= await prisma.articulo.findUnique({
        where:{
            id:articuloId,
            estado:true,
            id_puntoDeVenta:id_puntoDeVenta,
        }
    })
    const subtotal= info.precio*cantidad
    const newDetalle= await prisma.detalleVenta.create({
        data:{
            cantidad:cantidad,
            subtotal:subtotal,
            articuloId:articuloId,
            ventaId:ventaId,
            id_puntoDeVenta:id_puntoDeVenta,
        }
    })

    return newDetalle
}



/**
 * Obtiene todos los detalles de venta de la base de datos.
 * 
 * @returns {Array<Object>} - Una lista de objetos representando todos los detalles de venta.
 * @throws {Error} - Si ocurre un error al recuperar los detalles.
 */

const ListarDetalles=async(usuario_id)=>{

    const id_puntoDeVenta = await obtenerIdPunto(usuario_id)

    const detalles= await prisma.detalleVenta.findMany({
        where: {
            id_puntoDeVenta: id_puntoDeVenta
        }
    })
    return detalles
}




/**
 * Obtiene los detalles de venta asociados a un ID de venta específico.
 * 
 * @param {number|string} ventaId - El ID de la venta para la cual se quieren obtener los detalles.
 * 
 * @returns {Object|null} - El objeto representando los detalles de venta encontrados o null si no se encuentra ninguno.
 * @throws {Error} - Si el ID de la venta no es válido o si ocurre un error al buscar los detalles.
 */

const ListarDetallesByVenta=async(ventaId, usuario_id)=>{

    const id_puntoDeVenta = await obtenerIdPunto(usuario_id)

    const detallesByVenta= await prisma.detalleVenta.findMany({
        where: {
            ventaId: Number(ventaId),
            id_puntoDeVenta: id_puntoDeVenta
        }
    })
return detallesByVenta
}

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


/**
 * Obtiene un detalle de venta específico por su ID.
 * 
 * @param {number|string} id - El ID del detalle de venta a buscar.
 * 
 * @returns {Object|null} - El objeto representando el detalle de venta encontrado o null si no se encuentra.
 * @throws {Error} - Si el ID del detalle no es válido o si ocurre un error al buscar el detalle.
 */
const DetalleById=async(id) => {
    const detalle= await prisma.detalleVenta.findUnique({
        where: {
          id: Number(id)
        }
      })
      return detalle;
}
module.exports={
    CrearDetalle,
    ListarDetalles,
    ListarDetallesByVenta,
    DetalleById
}