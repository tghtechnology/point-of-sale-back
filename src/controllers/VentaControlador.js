import * as VentaServicio from "../Services/VentaServicio"

// Controlador para la creación de una venta
export const CrearVenta = async (req, res) => {
  try {
    const usuario_id = req.usuario.id;
      const { detalles, tipoPago, impuestoId, descuentoId, clienteId, usuarioId, dineroRecibido } = req.body;
      const nuevaVenta = await VentaServicio.CrearVenta(detalles, tipoPago, impuestoId, descuentoId, clienteId, usuarioId, dineroRecibido, usuario_id);
      req.recibo = nuevaVenta.id

      res.status(201).json({nuevaVenta})
  } catch (error) {
      // En caso de error, envía una respuesta de error
      console.error('Error al crear la venta:', error);
      res.status(500).json({ error: 'Error al crear la venta' });
  }
};

export const ListarVentas = async(req, res) => { 
    try {
      const usuario_id = req.usuario.id;
        const ventas = await VentaServicio.ListarVentas(usuario_id);
        res.status(200).json(ventas);
      } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al listar las ventas' });
      }
}
export const ObtenerVentaPorId = async(req, res)=>{
  try{
    const usuario_id = req.usuario.id;
    const id = req.params.id;
    const venta = await VentaServicio.ObtenerVentaPorId(id, usuario_id);
    res.status(200).json(venta);
  }
  catch(error){
    res.status(500).json({error: "Error al obtener la venta"});
  }
}


