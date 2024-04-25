import * as ReciboServicio from "../Services/ReciboServicio"

export const ListarRecibo = async(req, res) => { 
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
export const Reembolsar=async(req,res)=>{
  try {
    const { id, detalles } = req.body; // Suponiendo que los detalles del reembolso vienen en el cuerpo de la solicitud

    // Llamar a la función para realizar el reembolso
    const reciboReembolso = await ReciboServicio.Reembolsar(id, detalles);

    // Enviar una respuesta con el recibo de reembolso creado
    res.status(201).json( reciboReembolso );
  } catch (error) {
    // Manejo de errores
    console.error("Error al realizar el reembolso:", error);
    res.status(500).json({ error: "Hubo un error al procesar la solicitud" });
  }
}