import { PrismaClient } from "@prisma/client";
import * as DetalleVentaServicio from "./DetalleVentaServicio";
import * as ReciboServicio from "./ReciboServicio"
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
        if(impuesto.tipo_impuesto=="Anadido_al_precio"){
            totalimpuesto=subtotal*(impuesto.tasa/100);
            total=subtotal+totalimpuesto;
        }
        if (impuesto.tipo_impuesto=="Incluido_en_el_precio"){
            total=subtotal
        }
    }

    // Aplicar descuento
    if (descuentoId) {
        const descuento = await prisma.descuento.findUnique({
            where: {
                id: descuentoId
            }
        });
        if(descuento.tipo_descuento=="PORCENTAJE"){
        total -= total * (descuento.valor_calculado);
        }
        if(descuento.tipo_descuento=="MONTO"){
            total=total-descuento.valor_calculado
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

        //Buscar nombre de empleado
        const empleado = await prisma.usuario.findUnique({
            where: {
                id: usuarioId
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
        //Crear un recibo
        /*const recibo = await ReciboServicio.crearRecibo({ params: { id: id_venta } }req, res)*/
        //const recibo = await ReciboServicio.CrearRecibo()

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
    const recibo= await ReciboServicio.CrearRecibo()
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
