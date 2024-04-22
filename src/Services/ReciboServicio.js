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
  const ventaAsociada = await prisma.venta.findUnique({
    where: {
      id: id,
    },
    include: {
      detalles: true,
      descuento: true,
    },
  });

  if (!ventaAsociada) {
    throw new Error('No se encontró la venta asociada al recibo original');
  }

  let montoReembolsado = 0;

  const reembolsosRealizados = new Map();

  for (const detalle of detalles) {
    const detalleOriginal = ventaAsociada.detalles.find(det => det.articuloId === detalle.articuloId);

    if (!detalleOriginal) {
      throw new Error(`No se encontró el detalle de la venta original para el artículo ${detalle.articuloId}`);
    }

    const reembolsosAnteriores = await prisma.recibo.count({
      where: {
        id_venta: id,
        monto_reembolsado: { not: null },
        venta: {
          detalles: {
            some: {
              articuloId: detalle.articuloId,
            },
          },
        },
      },
    });
    
    console.log('Reembolsos anteriores para el artículo', detalle.articuloId, ':', reembolsosAnteriores);

    const cantidadVendida = detalleOriginal.cantidad;

    if (reembolsosAnteriores >= cantidadVendida) {
      throw new Error(`Ya se han realizado todos los reembolsos para el artículo ${detalle.articuloId}`);
    }
    const montoArticulo = (ventaAsociada.total / cantidadVendida) * detalle.cantidad;
    montoReembolsado += montoArticulo;
    reembolsosRealizados.set(detalle.articuloId, (reembolsosRealizados.get(detalle.articuloId) || 0) + 1);
  }

  // Crear el recibo de reembolso en la base de datos
  const todayISO = new Date().toISOString();
  const fechaCreacion = getUTCTime(todayISO);
  const reciboReembolso = await prisma.recibo.create({
    data: {
      ref: ref,
      fecha_creacion: fechaCreacion,
      id_venta: id,
      monto_reembolsado: montoReembolsado,
    },
  });

  return reciboReembolso;
};
