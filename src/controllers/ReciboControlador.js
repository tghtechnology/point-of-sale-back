import * as ReciboServicio from "../Services/ReciboServicio"

export const ListarRecibo = async(_, res) => { 
    try {
        const recibos = await ReciboServicio.listarRecibo();
        res.status(200).json(recibos);
      } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al listar los recibos' });
      }
}

export const CrearRecibo = async (req, res) => {

    const Rec = await ReciboServicio.CrearRecibo()
    
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
}