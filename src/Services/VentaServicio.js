import { PrismaClient } from "@prisma/client";
import * as DetalleVentaServicio from "./DetalleVentaServicio";

const prisma = new PrismaClient();
//Crear venta
const CrearVenta = async (detalles, tipoPago, impuestoId, descuentoId, clienteId, empleadoId) => {
        let subtotal = 0;
        for (const detalle of detalles) {
            const articulo = await prisma.articulo.findUnique({
                where: {
                    id: detalle.articuloId
                }
            });
            subtotal += articulo.precio * detalle.cantidad;
        }

        // Aplicar impuestos segun su tipo de descuento
        let total = subtotal;
        if (impuestoId) {
            const impuesto = await prisma.impuesto.findUnique({
                where: {
                    id: impuestoId
                }
            });
            if (impuesto.tipo_impuesto === "Añadido_al_precio") {
                total += subtotal * (impuesto.tasa / 100);
            } else {
                total += subtotal * (impuesto.tasa / 100);
            }
        }

        // Aplicar descuento
        if (descuentoId) {
            const descuento = await prisma.descuento.findUnique({
                where: {
                    id: descuentoId
                }
            });
            total -= total * (descuento.valor_calculado);
        }

        const nuevaVenta = await prisma.venta.create({
            data: {
                subtotal: subtotal,
                total: total,
                tipoPago: tipoPago,
                impuestoId: impuestoId,
                descuentoId: descuentoId,
                clienteId: clienteId ,
                empleadoId: empleadoId
            }
        });

        await Promise.all(detalles.map(async detalle => {
            await DetalleVentaServicio.CrearDetalle(detalle.cantidad, detalle.articuloId, nuevaVenta.id);
        }));

        return nuevaVenta;
    
};
const ListarVentas=async()=>{
    const ventas = await prisma.venta.findMany();
    return ventas;
}
module.exports = {
    CrearVenta,
    ListarVentas
};
