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

const CrearDetalle=async(cantidad, articuloId, ventaId )=>{
    const info= await prisma.articulo.findUnique({
        where:{
            id:articuloId
        }
    })
    const subtotal= info.precio*cantidad
    const newDetalle= await prisma.detalleVenta.create({
        data:{
            cantidad:cantidad,
            subtotal:subtotal,
            articuloId:articuloId,
            ventaId:ventaId,
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

const ListarDetalles=async()=>{
    const detalles= await prisma.detalleVenta.findMany()
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

const ListarDetallesByVenta=async(ventaId)=>{
    const detallesByVenta= await prisma.detalleVenta.findMany({
        where: {
            ventaId: Number(ventaId)
        }
    })
return detallesByVenta
}
module.exports={
    CrearDetalle,
    ListarDetalles,
    ListarDetallesByVenta
}