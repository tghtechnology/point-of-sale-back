import { PrismaClient } from "@prisma/client";
import { cambiarEstadoDescuento } from "../controllers/DescuentoControlador";
const prisma = new PrismaClient();

//Creacion de detalle de la venta
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
const ListarDetalles=async()=>{
    const detalles= await prisma.detalleVenta.findMany()
    return detalles
}
const ListarDetallesByVenta=async(ventaId)=>{
    const detallesByVenta= await prisma.detalleVenta.findUnique({
        where: {
            ventaId: ventaId
}
})
return detallesByVenta
}
module.exports={
    CrearDetalle,
    ListarDetalles,
    ListarDetallesByVenta
}