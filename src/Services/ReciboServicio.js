import { PrismaClient } from "@prisma/client";
import * as VentaServicio from "./VentaServicio";
import * as DetalleVentaServicio from "./DetalleVentaServicio";

const prisma = new PrismaClient();

export const crearRecibo = async (id_venta, ref) => {

    ref = await generarRef(ref);

    //Buscar venta
    const Rec = await prisma.venta.findUnique({
        where: {
            id: id_venta
        },
        select: {
            detalles: true,
            usuario: true,
            clienteId: true,
            descuentoId: true,
            impuestoId: true,
            subtotal: true,
            total: true,
            tipoPago: true
        }
    })

    const newRecibo = await prisma.recibo.create({
        data: {
            ref: ref,
            venta: {
            connect: { id: id_venta }
            }
        }
    })

    //console.log(Rec.detalles)

    const reciboFormato = {
        Empleado: Rec.usuario.nombre,
        Detalle: Rec.detalles.map(detalle => ({
            Articulo: detalle
        }))

    }

    return newRecibo
}

const generarRef = async (ref) => {
    try {
        const ultimaVenta = await prisma.venta.findFirst({
            orderBy: { id: "desc" },
        });

        const ultimoIdVenta = ultimaVenta ? ultimaVenta.id : 0;

        const nuevoRef = `#1-${ultimoIdVenta + 1000}`;

        return nuevoRef;
    } catch (error) {
        console.error("Error al generar el valor de ref:", error);
        throw error;
    }
};