import { PrismaClient } from "@prisma/client";
import * as DetalleVentaServicio from "./DetalleVentaServicio";
import * as ReciboServicio from "./ReciboServicio";
import { envioCorreo } from "../Utils/SendEmail";
import { cuerpoVenta } from "../helpers/helperVenta";

const prisma = new PrismaClient();

const calcularTotal = (subtotal, impuesto, descuento) => {
    let total = subtotal;

    if (impuesto) {
        if (impuesto.tipo_impuesto === "Anadido_al_precio") {
            total += subtotal * (impuesto.tasa / 100);
        }
    }

    if (descuento) {
        if (descuento.tipo_descuento === "PORCENTAJE") {
            total -= total * descuento.valor_calculado;
        } else if (descuento.tipo_descuento === "MONTO") {
            total -= descuento.valor_calculado;
        }
    }

    return total;
};

const CrearVenta = async (detalles, tipoPago, impuestoId, descuentoId, clienteId, usuarioId, dineroRecibido) => {
    let subtotal = 0;
    const detallesArticulos = [];

    for (const detalle of detalles) {
        const articulo = await prisma.articulo.findUnique({
            where: { id: detalle.articuloId }
        });

        subtotal += articulo.precio * detalle.cantidad;

        detallesArticulos.push({
            producto: articulo.nombre,
            cantidad: detalle.cantidad,
            precioUnitario: articulo.precio
        });
    }

    const impuesto = impuestoId ? await prisma.impuesto.findUnique({ where: { id: impuestoId } }) : null;
    const descuento = descuentoId ? await prisma.descuento.findUnique({ where: { id: descuentoId } }) : null;

    const total = calcularTotal(subtotal, impuesto, descuento);
    const cambio = dineroRecibido - total;

    const nuevaVenta = await prisma.venta.create({
        data: {
            subtotal,
            total,
            tipoPago,
            impuestoId,
            descuentoId,
            clienteId,
            usuarioId,
            dineroRecibido,
            cambio
        }
    });

    await Promise.all(detalles.map(async detalle => {
        await DetalleVentaServicio.CrearDetalle(detalle.cantidad, detalle.articuloId, nuevaVenta.id);
    }));

    const empleado = await prisma.usuario.findUnique({ where: { id: usuarioId }, select: { nombre: true } });
    const usuarioInfo = await prisma.cliente.findUnique({ where: { id: clienteId }, select: { email: true, nombre: true } });
    const cuerpo = cuerpoVenta(usuarioInfo.nombre, detallesArticulos, subtotal, total);
    await envioCorreo(usuarioInfo.email, "Venta realizada", cuerpo);
    
    await ReciboServicio.CrearRecibo();

    return nuevaVenta;
};

const ListarVentas = async () => {
    return await prisma.venta.findMany();
};

const ObtenerVentaPorId = async (id) => {
    return await prisma.venta.findUnique({ where: { id: Number(id) } });
};

export { CrearVenta, ListarVentas, ObtenerVentaPorId };
