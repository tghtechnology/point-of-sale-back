import * as VentaServicio from "../Services/VentaServicio"

/**
 * La creación de una venta.
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 * @param {Object[]} req.body.detalles - Los detalles de la venta.
 * @param {string} req.body.tipoPago - El tipo de pago de la venta.
 * @param {number} req.body.impuestoId - El ID del impuesto aplicado a la venta.
 * @param {number} req.body.descuentoId - El ID del descuento aplicado a la venta.
 * @param {number} req.body.clienteId - El ID del cliente asociado a la venta.
 * @param {number} req.body.usuarioId - El ID del usuario que realizó la venta.
 * @param {float} req.body.dineroRecibido - La cantidad de dinero recibido en la venta.
 * @param {number} req.usuario.id - ID del usuario autenticado.
 * @returns {Object} - La nueva venta creada.
 * @throws {Error} - Devuelve un error si hay un problema al crear la venta.
 */
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


/**
 * Lista todas las ventas.
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 * @param {number} req.usuario.id - ID del usuario autenticado.
 * @returns {Array<Object>} - La lista de ventas.
 * @throws {Error} - Devuelve un error si hay un problema al listar las ventas.
 */
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

/**
 * Obtiene una venta por su ID.
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 * @param {number} req.params.id - El ID de la venta.
 * @param {number} req.usuario.id - ID del usuario autenticado.
 * @returns {Object} - La venta encontrada.
 * @throws {Error} - Devuelve un error si hay un problema al obtener la venta.
 */
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


