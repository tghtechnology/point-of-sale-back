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

  const ref = await generarRef(ref)

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
  // Buscar recibo original
  const rec = await prisma.recibo.findUnique({
    where: {
      id: id,
    },
  });
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

    let monto_reembolsado = subtotal;

    const todayISO = new Date().toISOString()
    const fecha_creacion = getUTCTime(todayISO)
    const recibo_reembolsado = await prisma.recibo.create({
      data: {
        ref: ref,
        fecha_creacion:fecha_creacion,
        id_venta: rec.id_venta,
        monto_reembolsado:monto_reembolsado
      },
    });
  return recibo_reembolsado;
};