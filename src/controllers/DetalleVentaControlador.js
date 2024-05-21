import * as DetalleVentaServicio from "../Services/DetalleVentaServicio"

/**
 * Crea un nuevo detalle de venta cada vez que se crea una venta.
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 * @param {number} req.body.cantidad - La cantidad del artículo vendido.
 * @param {number} req.body.articuloId - El ID del artículo vendido.
 * @param {number} req.body.ventaId - El ID de la venta a la que pertenece el detalle.
 * @returns {Object} - El nuevo detalle de venta creado.
 * @throws {Error} - Devuelve un error si hay un problema al crear el detalle de venta en la base de datos.
 */
export const CrearDetalle=async(res, req)=>{
  const usuario_id = req.usuario.id;
    const { cantidad, articuloId, ventaId } = req.body; 
  try {
    const nuevoDetalle = await DetalleVentaServicio.CrearDetalle(cantidad, articuloId, ventaId, usuario_id);
    res.status(201).json(nuevoDetalle);
  } catch (error) {
    console.error('Error al crear el detalle de venta:', error);
    res.status(500).json({ mensaje: 'Ocurrió un error al crear el detalle de venta' });
  }
}

/**
 * Obtiene una lista de todos los detalles de venta almacenados en la base de datos.
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 * @returns {Object} - Una lista de todos los detalles de venta.
 * @throws {Error} - Devuelve un error si hay un problema al obtener la lista de detalles de venta de la base de datos.
 */
export const ListarDetalles = async (req, res) => {
    try {
      const usuario_id = req.usuario.id;
        const detalles = await DetalleVentaServicio.ListarDetalles(usuario_id);
        res.status(200).json(detalles);
      } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al obtener los detalles de venta' });
      }   
}

/**
 * Obtiene una lista de detalles de venta por el ID de la venta.
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 * @param {number} req.params.ventaId - El ID de la venta.
 * @returns {Object} - Una lista de detalles de venta pertenecientes a la venta especificada.
 * @throws {Error} - Devuelve un error si hay un problema al obtener la lista de detalles de venta de la base de datos.
 */
export const ListarDetallesByVenta=async(req,res)=>{
  try{
    const { ventaId } = req.params;
    const usuario_id = req.usuario.id;
    const detalles = await DetalleVentaServicio.ListarDetallesByVenta(ventaId, usuario_id);
    res.status(200).json(detalles);
  }
  catch(error){
    res.status(500).json({ mensaje: 'Error al obtener los detalles de la venta de dicha venta' });
  }
}

/**
 * Obtiene un detalle de venta específico por su ID.
 * 
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 * @param {number} req.params.id - El ID del detalle de venta.
 * @returns {Object} - El detalle de venta correspondiente al ID especificado.
 * @throws {Error} - Devuelve un error si hay un problema al obtener el detalle de venta de la base de datos.
 */
export const DetalleById=async(req,res) => {
  try{
    const { id } = req.params;
    const detalle = await DetalleVentaServicio.DetalleById(id);
    res.status(200).json(detalle);
  }
  catch(error){
    res.status(500).json({ mensaje: 'Error al obtener el detalle de venta de dicho detalle' });
  }
}