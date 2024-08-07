import { PrismaClient } from "@prisma/client";
import * as DetalleVentaServicio from "./DetalleVentaServicio";
import * as ReciboServicio from "./ReciboServicio";
import { envioCorreo } from "../Utils/SendEmail";
import { cuerpoVenta } from "../helpers/helperVenta";

const prisma = new PrismaClient();

/**
 * Crea una nueva venta, incluyendo detalles, impuestos, descuentos, y genera un recibo.
 * 
 * @param {Array<Object>} detalles - Los detalles de la venta, con información sobre los artículos vendidos.
 * @param {string} tipoPago - El tipo de pago (efectivo, tarjeta, etc.).
 * @param {number|string|null} [impuestoId] - El ID del impuesto aplicado a la venta (opcional).
 * @param {number|string|null} [descuentoId] - El ID del descuento aplicado a la venta (opcional).
 * @param {number|string|null} [clienteId] - El ID del cliente asociado a la venta (opcional).
 * @param {number|string} usuarioId - El ID del usuario que realizó la venta.
 * @param {number} dineroRecibido - El monto de dinero recibido por la venta.
 * @param {number} usuario_id - El ID del usuario para el que se está creando la venta.
 * 
 * @returns {Object} - El objeto representando la venta creada.
 * @throws {Error} - Si ocurre un error durante la creación de la venta, la generación de recibos, o el envío de correos electrónicos.
 */
const CrearVenta = async (detalles, tipoPago, impuestoId, descuentoId, clienteId, usuarioId, dineroRecibido, usuario_id) => {
    
    // Obtener el nombre de usuario
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

    // Asignar id del punto de venta
    const id_puntoDeVenta = id_punto.id;

    let subtotal = 0;
    const detallesArticulos = [];
    for (const detalle of detalles) {
        const articulo = await prisma.articulo.findUnique({
            where: {
                id: detalle.articuloId,
                id_puntoDeVenta: id_puntoDeVenta,
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
    let VImpuesto = 0;
    let vDescuento = 0;
    if (descuentoId) {
        const descuento = await prisma.descuento.findUnique({
            where: {
                id: parseInt(descuentoId),
                id_puntoDeVenta: id_puntoDeVenta,
            }
        });
        if (descuento.tipo_descuento == "PORCENTAJE") {
            vDescuento = subtotal * (descuento.valor_calculado);
            total -= vDescuento;
        }
        if (descuento.tipo_descuento == "MONTO") {
            vDescuento = descuento.valor_calculado;
            total -= vDescuento;
        }
    }

    if (impuestoId) {
        const impuesto = await prisma.impuesto.findUnique({
            where: {
                id: parseInt(impuestoId),
                id_puntoDeVenta: id_puntoDeVenta,
            }
        });

        if (impuesto.tipo_impuesto == "Anadido_al_precio") {
            const totalImpuesto = total * (impuesto.tasa / 100);
            VImpuesto = totalImpuesto;
            total += totalImpuesto;
        }
        if (impuesto.tipo_impuesto == "Incluido_en_el_precio") {
            total = total;
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
            cambio: cambio,
            id_puntoDeVenta: id_puntoDeVenta
        }
    });
    //console.log(usuario_id)
    // Crear los detalles de venta en la base de datos
    await Promise.all(detalles.map(async detalle => {
        await DetalleVentaServicio.CrearDetalle(detalle.cantidad, detalle.articuloId, nuevaVenta.id, usuario_id);
    }));

    // Buscar nombre de empleado
    const empleado = await prisma.usuario.findUnique({
        where: {
            id: parseInt(usuarioId),
            id_puntoDeVenta: id_puntoDeVenta
        },
        select: {
            nombre: true
        }
    });

    // Buscar artículo
    const articulo = await prisma.articulo.findMany({
        where: {
            id: detallesArticulos.articuloId,
            id_puntoDeVenta: id_puntoDeVenta
        }
    });

    const id_venta = nuevaVenta.id;

    const recibo = await ReciboServicio.CrearRecibo(usuario_id);

    // Obtener información del cliente para el correo electrónico
    if (clienteId) {
        const usuarioInfo = await prisma.cliente.findUnique({
            where: {
                id: parseInt(clienteId),
                id_puntoDeVenta: id_puntoDeVenta
            },
            select: {
                email: true,
                nombre: true
            }
        });
        const cuerpo = cuerpoVenta(usuarioInfo.nombre, detallesArticulos, subtotal, total, VImpuesto, vDescuento);
        // Enviar el correo electrónico
        await envioCorreo(usuarioInfo.email, "Venta realizada", cuerpo);
    }
    // Crear un recibo
    

    return nuevaVenta;
};

/**
 * Obtiene todas las ventas registradas en la base de datos.
 * 
 * @param {number} usuario_id - El ID del usuario para el que se está listando las ventas.
 * 
 * @returns {Array<Object>} - Una lista de objetos representando todas las ventas.
 * @throws {Error} - Si ocurre un error al buscar las ventas.
 */

const ListarVentas = async (usuario_id) => {
    const id_puntoDeVenta = await obtenerIdPunto(usuario_id);

    const ventas = await prisma.venta.findMany({
        where: {
            puntoDeVenta: {
                id: id_puntoDeVenta
            }
        }
    });
    return ventas;
};

/**
 * Obtiene una venta por su ID.
 * 
 * @param {number|string} id - El ID de la venta a buscar.
 * @param {number} usuario_id - El ID del usuario para el que se está listando la venta por ID.
 * 
 * @returns {Object|null} - El objeto representando la venta encontrada, o null si no se encuentra.
 * @throws {Error} - Si el ID no es válido o si ocurre un error durante la búsqueda de la venta.
 */

const ObtenerVentaPorId = async (id, usuario_id) => {
    const id_puntoDeVenta = await obtenerIdPunto(usuario_id);
    const venta = await prisma.venta.findUnique({
        where: {
            id: Number(id),
            puntoDeVenta: {
                id: id_puntoDeVenta
            }
        }
    });
    return venta;
};

/**
 * Obtiene el ID del punto de venta asociado a un usuario.
 *
 * @param {number|string} usuario_id - El ID del usuario para el que se quiere obtener el ID del punto de venta.
 * @returns {number} - El ID del punto de venta asociado al usuario.
 * @throws {Error} - Si no se encuentra el usuario o no está asociado a un punto de venta.
 */
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

module.exports = {
    CrearVenta,
    ListarVentas,
    ObtenerVentaPorId
};
