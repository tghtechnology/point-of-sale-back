import { PrismaClient } from "@prisma/client";
import * as DetalleVentaServicio from "./DetalleVentaServicio";
import { envioCorreo } from "../Utils/SendEmail";
import {cuerpoVenta} from "../helpers/helperVenta";

const prisma = new PrismaClient();
//Crear venta
const CrearVenta = async (detalles, tipoPago, impuestoId, descuentoId, clienteId, usuarioId, dineroRecibido) => {
    let subtotal = 0;
    const detallesArticulos = [];
    for (const detalle of detalles) {
        const articulo = await prisma.articulo.findUnique({
            where: {
                id: detalle.articuloId
            }
        });
        subtotal += articulo.precio * detalle.cantidad;
        detallesArticulos.push({
            producto: articulo.nombre,
            cantidad: detalle.cantidad,
            precioUnitario: articulo.precio
        });
    }

    let total = subtotal;
    if (impuestoId) {
        const impuesto = await prisma.impuesto.findUnique({
            where: {
                id: impuestoId
            }
        });
        if (impuesto.tipo_impuesto === "Anadido_al_precio") {
            total += subtotal * (impuesto.tasa / 100);
        } else {
            total = subtotal
        }    }

    // Aplicar descuento
    if (descuentoId) {
        const descuento = await prisma.descuento.findUnique({
            where: {
                id: descuentoId
            }
        });
        total -= total * (descuento.valor_calculado);
    }

    // Calcular cambio
    const cambio = dineroRecibido - total;

    // Crear la venta en la base de datos
    const nuevaVenta = await prisma.venta.create({
        data: { 
            subtotal: subtotal,
            total: total,
            tipoPago: tipoPago,
            impuestoId: impuestoId,
            descuentoId: descuentoId,
            clienteId: clienteId,
            usuarioId: usuarioId,
            dineroRecibido: dineroRecibido,
            cambio: cambio
        }
    });

    // Crear los detalles de venta en la base de datos
    await Promise.all(detalles.map(async detalle => {
        await DetalleVentaServicio.CrearDetalle(detalle.cantidad, detalle.articuloId, nuevaVenta.id);
    }));

    // Obtener información del cliente para el correo electrónico
    const usuarioInfo = await prisma.cliente.findUnique({
        where: {
            id: clienteId
        },
        select: {
            email: true,
            nombre: true
        }
    });

    // Generar cuerpo del correo con los detalles de la venta
    const cuerpo = cuerpoVenta(usuarioInfo.nombre, detallesArticulos, subtotal, total);

    // Enviar el correo electrónico
    await envioCorreo(usuarioInfo.email, "Venta realizada", cuerpo);
    return nuevaVenta;
};
const ListarVentas=async()=>{
    const ventas = await prisma.venta.findMany();
    return ventas;
}
const ObtenerVentaPorId=async()=>{
    const ventas = await prisma.venta.findUnique({
        where: {
            id: Number(id)
        }
    });
    return ventas;
}
module.exports = {
    CrearVenta,
    ListarVentas,
    ObtenerVentaPorId
};
