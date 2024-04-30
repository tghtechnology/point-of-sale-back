import { PrismaClient } from "@prisma/client";
import * as DetalleVentaServicio from "./DetalleVentaServicio";
import * as ReciboServicio from "./ReciboServicio";
import { envioCorreo } from "../Utils/SendEmail";
import { cuerpoVenta } from "../helpers/helperVenta";

const prisma = new PrismaClient();

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
    let VImpuesto=0;
    let vDescuento=0;
    if (descuentoId) {
        const descuento = await prisma.descuento.findUnique({
            where: {
                id: parseInt(descuentoId)
            }
        });
        if(descuento.tipo_descuento=="PORCENTAJE"){
            vDescuento= subtotal * (descuento.valor_calculado);
            total -= vDescuento
        }
        if(descuento.tipo_descuento=="MONTO"){
            vDescuento=descuento.valor_calculado
            total -= vDescuento
        }
    }
    if (impuestoId) {
        const impuesto = await prisma.impuesto.findUnique({
            where: {
                id: parseInt(impuestoId)
            }
        });
        if(impuesto.tipo_impuesto=="Anadido_al_precio"){
            const totalimpuesto=total*(impuesto.tasa/100);
            VImpuesto=totalimpuesto
            total=total+totalimpuesto;
        }
        if (impuesto.tipo_impuesto=="Incluido_en_el_precio"){
            total=total
        }
    }
    // Calcular cambio
    const cambio = dineroRecibido - total;
    // Crear la venta en la base de datos
    const nuevaVenta = await prisma.venta.create({
        data: {
            subtotal: subtotal,
            total: total,
            tipoPago: tipoPago,
            impuestoId: parseInt(impuestoId),
            descuentoId: parseInt(descuentoId),
            clienteId: parseInt(clienteId),
            usuarioId: parseInt(usuarioId),
            dineroRecibido: dineroRecibido,
            VImpuesto: VImpuesto,
            vDescuento, vDescuento,
            cambio: cambio
        }
    });

    // Crear los detalles de venta en la base de datos
    await Promise.all(detalles.map(async detalle => {
        await DetalleVentaServicio.CrearDetalle(detalle.cantidad, detalle.articuloId, nuevaVenta.id);
    }));

        //Buscar nombre de empleado
        const empleado = await prisma.usuario.findUnique({
            where: {
                id: parseInt(usuarioId)
            },
            select: {
                nombre: true
            }
        })
        
        //Buscar artículo
        const articulo = await prisma.articulo.findMany({
            where: {
                id: detallesArticulos.articuloId
            }
        })
    
        const id_venta = nuevaVenta.id

    // Obtener información del cliente para el correo electrónico
    const usuarioInfo = await prisma.cliente.findUnique({
        where: {
            id: parseInt(clienteId)
        },
        select: {
            email: true,
            nombre: true
        }
    });
    //Crear un recibo
    const recibo= await ReciboServicio.CrearRecibo()
    // Generar cuerpo del correo con los detalles de la venta
    const cuerpo = cuerpoVenta(usuarioInfo.nombre, detallesArticulos, subtotal, total, VImpuesto, vDescuento );
    // Enviar el correo electrónico
    await envioCorreo(usuarioInfo.email, "Venta realizada", cuerpo);

    return nuevaVenta;
};

const ListarVentas = async () => {
    return await prisma.venta.findMany();
};

const ObtenerVentaPorId = async (id) => {
    return await prisma.venta.findUnique({ where: { id: Number(id) } });
};

export { CrearVenta, ListarVentas, ObtenerVentaPorId };
