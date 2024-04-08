import * as DetalleVentaServicio from "../Services/DetalleVentaServicio"

//Crear detalle
export const CrearDetalle=async(res, req)=>{
    const { cantidad, articuloId, ventaId } = req.body; 
  try {
    const nuevoDetalle = await DetalleVentaServicio.CrearDetalle(cantidad, articuloId, ventaId);
    res.status(201).json(nuevoDetalle);
  } catch (error) {
    console.error('Error al crear el detalle de venta:', error);
    res.status(500).json({ mensaje: 'Ocurrió un error al crear el detalle de venta' });
  }
}
export const ListarDetalles = async (req, res) => {
    try {
        const detalles = await DetalleVentaServicio.ListarDetalles();
        res.status(200).json(detalles);
      } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al obtener los detalles de venta' });
      }
    
}