import { PrismaClient } from "@prisma/client";
import { getUTCTime } from "../Utils/Time";
import { envioCorreo } from "../Utils/SendEmail";
import {cuerpoReembolso} from "../helpers/helperReembolso";
import { CrearDetalleReembolso } from "./DetalleReembolsoServicio";
const prisma = new PrismaClient();



/**
 * Genera una referencia única para un recibo.
 * 
 * @returns {string} - Una referencia única basada en el ID del último recibo encontrado más un valor adicional para hacerla única.
 * @throws {Error} - Si ocurre un error al obtener el último recibo o al generar la referencia.
 */

const generarRef = async (usuario_id) => {
  try {
    const id_puntoDeVenta = await obtenerIdPunto(usuario_id)

    const ultimoRecibo = await prisma.recibo.findFirst({
      where: {
        id_puntoDeVenta: id_puntoDeVenta
      },
      orderBy: { id: "desc" },
    });

    const ultimoIdRecibo = ultimoRecibo ? ultimoRecibo.id : 0;
    const nuevoRef = `#1-${ultimoIdRecibo + 1000}`;

    return nuevoRef;
  } catch (error) {
    console.error("Error al generar el valor de ref:", error);
    throw error;
  }
};




/**
 * Obtiene todos los recibos de la base de datos.
 * 
 * @returns {Array<Object>} - Una lista de objetos representando todos los recibos.
 * @throws {Error} - Si ocurre un error al buscar los recibos.
 */

export const listarRecibo = async (usuario_id) => {

  const id_puntoDeVenta = await obtenerIdPunto(usuario_id)

  const recibos = await prisma.recibo.findMany({
    where: {
      id_puntoDeVenta: id_puntoDeVenta,
    }
  });
  return recibos
}



/**
 * Obtiene el nombre de un artículo por su ID.
 * 
 * @param {number|string} articuloId - El ID del artículo para buscar su nombre.
 * 
 * @returns {string|null} - El nombre del artículo, o null si no se encuentra el artículo.
 * @throws {Error} - Si ocurre un error al buscar el artículo por su ID.
 */

async function obtenerNombreArticulo(articuloId, usuario_id) {

  const id_puntoDeVenta = await obtenerIdPunto(usuario_id)

  const articulo = await prisma.articulo.findUnique({
      where: {
        id: articuloId,
        id_puntoDeVenta: id_puntoDeVenta 
      },
      select: {
          nombre: true
      }
  });

  return articulo ? articulo.nombre : null;
}



/**
 * Crea un nuevo recibo para la última venta en la base de datos.
 * 
 * @returns {Object} - El objeto representando el recibo recién creado, incluyendo la referencia generada y detalles relacionados con la venta.
 * @throws {Error} - Si ocurre un error durante la creación del recibo o al obtener datos relacionados con la venta.
 */
export const CrearRecibo = async (usuario_id) => {

  //Obtener el nombre de usuario
  const usuario = await prisma.usuario.findFirst({
    where: {id: usuario_id},
    select: {nombre: true}
  })

  const id_punto = await prisma.puntoDeVenta.findFirst({
    where: {
      estado: true,
      propietario: usuario.nombre
    },
    select: {id: true}
  })

  //Asignar id del punto de venta
  const id_puntoDeVenta = id_punto.id

  const lastVenta = await prisma.venta.findFirst({
    orderBy: { id: "desc" },
  })

  const id_venta = lastVenta.id

  const ref = await generarRef(usuario_id)

  //Buscar venta
  const Rec = await prisma.venta.findFirst({
    where: {
      id: id_venta,
      id_puntoDeVenta: id_puntoDeVenta
    },
    include: {
      usuario: true,
      detalles: true,
      descuento: true,
      impuesto: true,
      cliente: true,
    } 
  })

  //Obtener detalle para extraer los articulos asociados a la venta
  const detalles = await prisma.detalleVenta.findMany({
    where: {
      ventaId: id_venta,
      id_puntoDeVenta: id_puntoDeVenta,
    },
    select: {
      articuloId: true,
      cantidad: true,
      subtotal: true,
      ventaId: true
    }
  })

  //Según el id de artículo se obtiene el nombre
  const nombresArticulos = await Promise.all(detalles.map(async (detalle) => {
  const articuloId = detalle.articuloId;
  const nombreArticulo = await obtenerNombreArticulo(articuloId, usuario_id);
    return nombreArticulo;
  }));

  //Indexar al array de detalles
  const detallesFormato = detalles.map((detalle, index) => {
    const detalleArticulo = {
      nombreArticulo: nombresArticulos[index], 
      cantidad: detalle.cantidad,
      subtotal: detalle.subtotal,
      ventaId: detalle.ventaId
    };
      return detalleArticulo;
  });
  //Creacion de recibo en la BD
  const todayISO = new Date().toISOString()
  const fecha_creacion = getUTCTime(todayISO)
  const newRecibo= await prisma.recibo.create({
    data:{
      ref: ref,
      fecha_creacion:fecha_creacion,
      id_venta: id_venta,
      id_puntoDeVenta: id_puntoDeVenta
    }
  })
  return newRecibo
}





/**
 * Realiza un reembolso para la última venta registrada y lo guarda en la base de datos.
 * 
 * @returns {Object} - El objeto representando el nuevo recibo, incluyendo la referencia generada y los detalles asociados.
 * @throws {Error} - Si ocurre un error durante la creación del recibo o al obtener la información de la venta o sus detalles.
 */

export const Reembolsar = async (id, detalles, usuario_id) => {

  const id_puntoDeVenta = await obtenerIdPunto(usuario_id)

  const ref = await generarRef(usuario_id);
  // Obtener la venta asociada al recibo
  const ventaAsociada = await prisma.venta.findUnique({
    where: {
      id: id,
      id_puntoDeVenta: id_puntoDeVenta,
    },
    include: {
      detalles: true,
      descuento: true,
      impuesto: true,
      cliente: true,
    },
  });

  if (!ventaAsociada) {
    throw new Error('No se encontró la venta asociada al recibo original');
  }

  let montoReembolsado = 0;
  let valorImpuestoTotal = 0;
  let valorDescuentoTotal = 0;

  for (const detalle of detalles) {
    const detalleOriginal = ventaAsociada.detalles.find(
      (det) => det.articuloId === detalle.articuloId
    );

    if (!detalleOriginal) {
      throw new Error(
        `No se encontró el detalle de la venta original para el artículo ${detalle.articuloId}`
      );
    }

    const cantidadRestanteReembolso = detalleOriginal.cantidad - detalleOriginal.cantidadReembolsada;
    if (cantidadRestanteReembolso < detalle.cantidad) {
      throw new Error(
        `La cantidad a reembolsar para el artículo ${detalle.articuloId} excede la cantidad restante`
      );
    }

    await prisma.detalleVenta.update({
      where: { 
        id: detalleOriginal.id,
        id_puntoDeVenta: id_puntoDeVenta,
      },
      data: { cantidadReembolsadaTotal: detalleOriginal.cantidadReembolsadaTotal + detalle.cantidad },
    });

    let montoArticulo = (detalle.cantidad / detalleOriginal.cantidad) * detalleOriginal.subtotal;
    let valor = 0;
    if (ventaAsociada.descuento) {
      if (ventaAsociada.descuento.tipo_descuento === 'PORCENTAJE') {
        valor = montoArticulo * ventaAsociada.descuento.valor_calculado;
        montoArticulo -= valor;
        valorDescuentoTotal += valor; 
      } else if (ventaAsociada.descuento.tipo_descuento === 'MONTO') {
        valor = (ventaAsociada.descuento.valor / ventaAsociada.subtotal) * montoArticulo;
        montoArticulo -= valor;
        valorDescuentoTotal += valor; 
      }
    }
    let iValor = 0;
    if (ventaAsociada.impuesto && ventaAsociada.impuesto.tipo_impuesto === 'Anadido_al_precio') {
      iValor = montoArticulo * (ventaAsociada.impuesto.tasa / 100);
      montoArticulo += iValor;
      valorImpuestoTotal += iValor; 
    }
    detalleOriginal.cantidadReembolsadaTotal += detalle.cantidad;
    montoReembolsado += montoArticulo;
  }

  // Crear un recibo de reembolso para todos los detalles
  const todayISO = new Date().toISOString();
  const fecha_creacion = getUTCTime(todayISO);
  const reciboReembolsado = await prisma.recibo.create({
    data: {
      ref: ref,
      fecha_creacion: fecha_creacion,
      id_venta: id,
      monto_reembolsado: montoReembolsado,
      id_puntoDeVenta: id_puntoDeVenta
    },
  });

  for (const detalle of detalles) {
    const detalleOriginal = ventaAsociada.detalles.find(
      (det) => det.articuloId === detalle.articuloId
    );

    if (!detalleOriginal) {
      throw new Error(
        `No se encontró el detalle de la venta original para el artículo ${detalle.articuloId}`
      );
    }

    const cantidadRestanteReembolso = detalleOriginal.cantidad - detalleOriginal.cantidadReembolsadaTotal;
    if (cantidadRestanteReembolso < detalle.cantidad) {
      throw new Error(
        `La cantidad a reembolsar para el artículo ${detalle.articuloId} excede la cantidad restante`
      );
    }

    await prisma.detalleVenta.update({
      where: { id: detalleOriginal.id },
      data: { cantidadReembolsadaTotal: detalleOriginal.cantidadReembolsadaTotal + detalle.cantidad },
    });

    let montoArticulo = (detalle.cantidad / detalleOriginal.cantidad) * detalleOriginal.subtotal;
    let valor = 0;
    if (ventaAsociada.descuento) {
      if (ventaAsociada.descuento.tipo_descuento === 'PORCENTAJE') {
        valor = montoArticulo * ventaAsociada.descuento.valor_calculado;
        montoArticulo -= valor;
        valorDescuentoTotal += valor;
      } else if (ventaAsociada.descuento.tipo_descuento === 'MONTO') {
        valor = (ventaAsociada.descuento.valor / ventaAsociada.subtotal) * montoArticulo;
        montoArticulo -= valor;
        valorDescuentoTotal += valor;
      }
    }
    let iValor = 0;
    if (ventaAsociada.impuesto && ventaAsociada.impuesto.tipo_impuesto === 'Anadido_al_precio') {
      iValor = montoArticulo * (ventaAsociada.impuesto.tasa / 100);
      montoArticulo += iValor;
      valorImpuestoTotal += iValor;
    }
    detalleOriginal.cantidadReembolsadaTotal += detalle.cantidad;
    montoReembolsado += montoArticulo;

    // Crear el detalle de reembolso usando el servicio DetalleReembolsoServicio
    await CrearDetalleReembolso(
      detalle.articuloId,
      reciboReembolsado.id,
      detalle.cantidad,
      montoArticulo  
    );
  }

  // Actualizar recibo con los totales
  const reembolso=await prisma.recibo.update({
    where: { id: reciboReembolsado.id },
    data: {
      monto_reembolsado: montoReembolsado,
      valorDescuentoTotal: valorDescuentoTotal,
      valorImpuestoTotal: valorImpuestoTotal,
    },
  });

  if (ventaAsociada.cliente) {
    const detallesReembolso = await Promise.all(detalles.map(async (detalle) => {
      const nombreArticulo = await obtenerNombreArticulo(detalle.articuloId);
      const precioUnitario = await prisma.articulo.findUnique({
        where: { id: detalle.articuloId },
        select: { precio: true }
      });
      const precio = precioUnitario ? precioUnitario.precio : null;
      return {
        nombreArticulo: nombreArticulo,
        cantidad: detalle.cantidad,
        precioUnitario: precioUnitario.precio
      };
    }));

    const clienteInfo = ventaAsociada.cliente;
    const cuerpo = cuerpoReembolso(clienteInfo.nombre, detallesReembolso, montoReembolsado, valorDescuentoTotal, valorImpuestoTotal);
    await envioCorreo(clienteInfo.email, "Reembolso realizado", cuerpo);
  }

  return reembolso;
};



/**
 * Obtiene un recibo específico por su ID.
 * 
 * @param {number|string} id - El ID del recibo a buscar.
 * 
 * @returns {Object|null} - El objeto representando el recibo, o null si no se encuentra.
 * @throws {Error} - Si ocurre un error al buscar el recibo por su ID.
 */
export const ListarReciboById=async(id, usuario_id)=>{
  const id_puntoDeVenta = await obtenerIdPunto(usuario_id)
  const recibo= await prisma.recibo.findMany({
    where: {
        id: Number(id),
        id_puntoDeVenta: id_puntoDeVenta
    }
})
return recibo
}


/**
 * Obtiene los recibos relacionados a una venta específica por el ID de la venta.
 * 
 * @param {number|string} id_venta - El ID de la venta cuyos recibos se desean buscar.
 * 
 * @returns {Array<Object>} - Una lista de objetos representando los recibos relacionados a la venta.
 * @throws {Error} - Si ocurre un error al buscar los recibos por el ID de la venta.
 */
export const ListarReciboByVenta=async(id_venta, usuario_id)=>{
  const id_puntoDeVenta = await obtenerIdPunto(usuario_id)
  const recibos= await prisma.recibo.findMany({
    where: {
        id_venta: Number(id_venta),
        id_puntoDeVenta: id_puntoDeVenta
    }
  })
  return recibos
}

const obtenerIdPunto = async (usuario_id) => {
  const usuario = await prisma.usuario.findFirst({
    where: {id: usuario_id},
    select: {nombre: true}
  })

  const id_punto = await prisma.puntoDeVenta.findFirst({
    where: {
      estado: true,
      propietario: usuario.nombre
    },
    select: {id: true}
  })

  //Asignar id del punto de venta
  const id_puntoDeVenta = parseInt(id_punto.id)

  return id_puntoDeVenta;
}