import * as VentaServicio from "../Services/VentaServicio"

// Controlador para la creación de una venta
export const CrearVenta = async (req, res) => {
  try {
      // Aquí obtienes los datos necesarios para crear la venta desde el cuerpo de la solicitud (req.body)
      const { detalles, tipoPago, impuestoId, descuentoId, clienteId, usuarioId, dineroRecibido } = req.body;

      // Llama a la función CrearVenta con los parámetros necesarios
      const nuevaVenta = await VentaServicio.CrearVenta(detalles, tipoPago, impuestoId, descuentoId, clienteId, usuarioId, dineroRecibido);

      // Aquí puedes enviar la respuesta con la nueva venta creada
      res.status(201).json(nuevaVenta);
  } catch (error) {
      // En caso de error, envía una respuesta de error
      console.error('Error al crear la venta:', error);
      res.status(500).json({ error: 'Error al crear la venta' });
  }
};
export const ListarVentas = async(req, res) => { 
    try {
        const ventas = await VentaServicio.ListarVentas();
        res.status(200).json(ventas);
      } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al listar las ventas' });
      }
    
}
export const ObtenerVentaPorId = async(req, res)=>{
  try{
    const id = req.params.id;
    const venta = await VentaServicio.ObtenerVentaPorId(id);
    res.status(200).json(venta);
  }
  catch(error){
    res.status(500).json({error: "Error al obtener la venta"});
  }
}


