import { PrismaClient } from "@prisma/client";
import { getUTCTime } from "../Utils/Time";

const prisma = new PrismaClient();

const generarRef = async () => {
  try {
    const ultimoRecibo = await prisma.recibo.findFirst({
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

export const listarRecibo = async () => {
  const recibos = await prisma.recibo.findMany();
  return recibos
}

async function obtenerNombreArticulo(articuloId) {
  const articulo = await prisma.articulo.findUnique({
      where: {
          id: articuloId
      },
      select: {
          nombre: true
      }
  });

  return articulo ? articulo.nombre : null;
}

export const CrearRecibo = async () => {
  const lastVenta = await prisma.venta.findFirst({
    orderBy: { id: "desc" },
  })

  const id_venta = lastVenta.id

  const ref = await generarRef()

  //Buscar venta
  const Rec = await prisma.venta.findFirst({
    where: {
      id: id_venta
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
      ventaId: id_venta
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
  const nombreArticulo = await obtenerNombreArticulo(articuloId);
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
      id_venta: id_venta
    }
  })
  return newRecibo
}

export const Reembolsar = async (id, detalles) => {
  const ref = await generarRef();
  // Obtener la venta asociada al recibo
  const ventaAsociada = await prisma.venta.findUnique({
    where: {
      id: id,
    },
    include: {
      detalles: true,
      descuento: true,
      impuesto:true,
    },
  });
  if (!ventaAsociada) {
    throw new Error('No se encontró la venta asociada al recibo original');
  }
  let montoReembolsado = 0;
  for (const detalle of detalles) {
    const detalleOriginal = ventaAsociada.detalles.find(det => det.articuloId === detalle.articuloId);

    if (!detalleOriginal) {
      throw new Error(`No se encontró el detalle de la venta original para el artículo ${detalle.articuloId}`);
    }

    let montoArticulo = detalleOriginal.subtotal;
    if (ventaAsociada.descuento) {
      const impuesto=ventaAsociada.impuesto;
      if(impuesto.tipo_impuesto=="Anadido_al_precio"){
        const iValor=detalleOriginal.subtotal*(impuesto.tasa/100);
        const valor=detalleOriginal.subtotal-iValor
        
      }
      const descuento = ventaAsociada.descuento;
      if (descuento.tipo_descuento === "PORCENTAJE") {
        const proporcionalidad=detalle.cantidad/detalleOriginal.cantidad
        const valor = (detalleOriginal.subtotal * descuento.valor_calculado);
        const monto=(detalleOriginal.subtotal-valor)*proporcionalidad
        montoArticulo = monto;
      } 
      else if (descuento.tipo_descuento === "MONTO") {
        const proporcionalidad=detalle.cantidad/detalleOriginal.cantidad
        const valor = (descuento.valor / ventaAsociada.subtotal) * detalleOriginal.subtotal;
        const monto=(detalleOriginal.subtotal-valor)*proporcionalidad
        montoArticulo = monto;
      }
      
    }
    // Actualizar el monto total de reembolso
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
    },
  });

  return reciboReembolsado;
};



