import { PrismaClient } from "@prisma/client";
import { getUTCTime } from "../Utils/Time";

const prisma = new PrismaClient();

const generarRef = async () => {
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

export const crearRecibo = async (id_venta) => {
    // Generar referencia
    const ref = await generarRef();

  // Buscar la venta con detalles
  const Rec = await prisma.venta.findFirst({
    where: { id: id_venta },
    include: {
      usuario: true,
      detalles: true,
      descuento: true,
      impuesto: true,
      cliente: true,
    },
  });

  // Obtener detalles de la venta
  const detalles = await prisma.detalleVenta.findMany({
    where: { ventaId: id_venta },
    select: {
      articuloId: true,
      cantidad: true,
      subtotal: true,
      ventaId: true,
    },
  });

  // Obtener nombres de los artículos
  const nombresArticulos = await Promise.all(
    detalles.map(async (detalle) => {
      const articuloId = detalle.articuloId;
      const nombreArticulo = await obtenerNombreArticulo(articuloId);
      return nombreArticulo;
    })
  );

  // Formatear detalles
  const detallesFormato = detalles.map((detalle, index) => {
    return {
      nombreArticulo: nombresArticulos[index],
      cantidad: detalle.cantidad,
      subtotal: detalle.subtotal,
      ventaId: detalle.ventaId,
    };
  });

    // Obtener fecha de creación en formato UTC
    const todayISO = new Date().toISOString();
    const fecha_creacion = getUTCTime(todayISO);

    // Crear el recibo
    const nuevoRecibo = await prisma.recibo.create({
      data: {
        ref: ref,
        fecha_creacion: fecha_creacion,
        id_venta: id_venta,
      },
    });
    return nuevoRecibo
  } 


export const listarRecibo = async () => {
  const recibo = await prisma.recibo.findMany();
  return recibo;
};

async function obtenerNombreArticulo(articuloId) {
  const articulo = await prisma.articulo.findUnique({
    where: { id: articuloId },
    select: { nombre: true },
  });
  return articulo ? articulo.nombre : null;
}

export const Reembolso = async () => {};
