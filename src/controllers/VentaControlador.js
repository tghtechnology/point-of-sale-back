import * as VentaServicio from "../Services/VentaServicio"

// Controlador para la creación de una venta
export const CrearVenta = async (req, res) => {
  const { detalles, tipoPago, impuestoId, descuentoId, empleadoId, clienteId } = req.body;
  
  try {
    const nuevaVenta = await VentaServicio.CrearVenta(detalles, tipoPago, impuestoId, descuentoId,empleadoId, clienteId);
    res.status(201).json(nuevaVenta);
  } catch (error) {
    console.error('Error al crear la venta:', error);
    res.status(500).json({ error: 'Ocurrió un error al crear la venta' });
  }
};


