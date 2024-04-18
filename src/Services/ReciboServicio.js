import { PrismaClient } from "@prisma/client";

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

export const crearRecibo = async (req, res) => {
  const id_venta = parseInt(req.recibo)
  
  try {
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

  res.status(201).json({
    ref: ref,
    usuario: Rec.usuario.nombre,
    cliente: Rec.cliente.nombre,
    detalles: detallesFormato,
    descuento: Rec.descuento.nombre,
    impuesto: Rec.impuesto.nombre,
    tipoPago: Rec.tipoPago,
    subtotal: Rec.subtotal,
    total: Rec.total

  })
  } catch (error) {
    console.log(error)
  }
}

export const listarRecibo = async () => {
  const recibo = await prisma.recibo.findMany();
  return recibo
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


export const Reembolso = async () => {
  
}
