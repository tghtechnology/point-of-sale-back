import * as ReciboServicio from "../Services/ReciboServicio"

/**
 * Obtiene una lista de todos los recibos almacenados en la base de datos.
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 * @returns {Array<Object>}  - Una lista de todos los recibos.
 * @throws {Error} - Devuelve un error si hay un problema al obtener la lista de recibos de la base de datos.
 */
export const ListarRecibo = async(req, res) => { 
    try {
      const usuario_id = req.usuario.id;
        const recibos = await ReciboServicio.listarRecibo(usuario_id);
        res.status(200).json(recibos);
      } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al listar los recibos' });
      }
}

/**
 * Crea un nuevo recibo.
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 * @returns {Object} - El nuevo recibo creado.
 * @throws {Error} - Devuelve un error si hay un problema al crear el recibo en la base de datos.
 */
export const CrearRecibo = async (req, res) => {
  const usuario_id = req.usuario.id;
    const Rec = await ReciboServicio.CrearRecibo(usuario_id)
    res.status(201).json(Rec)
}

/**
 * Realiza un reembolso de un recibo existente.
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 * @param {number} req.body.id - El ID de la venta que se va a reembolsar.
 * @param {Array} req.body.detalles - Los detalles del reembolso.
 * @returns {Object} - El recibo reembolsado.
 * @throws {Error} - Devuelve un error si hay un problema al reembolsar el recibo en la base de datos.
 */
export const Reembolsar=async(req,res)=>{
  const usuario_id = req.usuario.id;
  const { id, detalles } = req.body;
  try {
    const reciboReembolso = await ReciboServicio.Reembolsar(id, detalles, usuario_id);
    res.status(201).json( reciboReembolso );
  } catch (error) {
    console.error("Error al realizar el reembolso:", error);
    res.status(500).json({ error: "Hubo un error al procesar la solicitud" });
  }
}

/**
 * Obtiene un recibo por su ID.
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 * @param {number} req.params.id - El ID del recibo.
 * @returns {Object} - El recibo encontrado.
 * @throws {Error} - Devuelve un error si el recibo no se encuentra o si hay un problema al obtenerlo de la base de datos.
 */
export const ListarReciboById=async(req, res)=>{
  const id = req.params.id;
  const usuario_id = req.usuario.id;
  try {
    const recibo = await ReciboServicio.ListarReciboById(id, usuario_id);
    res.status(200).json(recibo);
  } catch (error) {
    console.error("Error al obtener el recibo:", error.message);
    res.status(500).json({ mensaje: "Error al obtener el recibo." });
  }
}

/**
 * Obtiene una lista de recibos por el ID de la venta asociada.
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 * @param {number} req.params.id_venta - El ID de la venta asociada a los recibos.
 * @returns {Object} - Una lista de recibos asociados a la venta.
 * @throws {Error} - Devuelve un error si hay un problema al obtener los recibos de la base de datos.
 */
export const ListarRecibosByVenta=async(req,res)=>{
  const { id_venta } = req.params;
  const usuario_id = req.usuario.id;
  try{
    const recibos = await ReciboServicio.ListarReciboByVenta(id_venta, usuario_id);
    res.status(200).json(recibos);
  }
  catch(error){
    res.status(500).json({ mensaje: 'Error al obtener los detalles de la venta de dicha venta' });
  }
}