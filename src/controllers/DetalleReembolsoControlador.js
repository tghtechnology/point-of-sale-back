import * as DetalleReembolsoServicio from "../Services/DetalleReembolsoServicio";

/**
 * Crea un nuevo detalle de reembolso.
 * 
 * @param {Object} req - El objeto de solicitud HTTP.
 * @param {Object} res - El objeto de respuesta HTTP.
 * @param {number} req.body.articuloId - El ID del artículo para el cual se está creando el detalle de reembolso.
 * @param {number} req.body.reciboId - El ID del recibo asociado con el reembolso.
 * @param {number} req.body.cantidadDevuelta - La cantidad de artículos devueltos.
 * @param {number} req.body.subtotal - El subtotal del reembolso para el artículo.
 * @returns {Object} - El detalle de reembolso creado.
 * @throws {Error} - Si ocurre un error durante la creación del detalle de reembolso.
 */
export const CrearDetalleReembolso = async (req, res) => {
    const { articuloId, reciboId, cantidadDevuelta, subtotal } = req.body;
    try {
        const newDetalle = await DetalleReembolsoServicio.CrearDetalleReembolso(articuloId, reciboId, cantidadDevuelta, subtotal);
        res.status(200).json(newDetalle);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al crear el detalle de reembolso' });
    }
};

/**
 * Obtiene todos los detalles de reembolso.
 * 
 * @param {Object} req - El objeto de solicitud HTTP.
 * @param {Object} res - El objeto de respuesta HTTP.
 * @returns {Array<Object>} - Una lista de detalles de reembolso.
 * @throws {Error} - Si ocurre un error durante la obtención de los detalles de reembolso.
 */
export const ListarDetallesReembolso = async (req, res) => {
    try {
        const detalles = await DetalleReembolsoServicio.ListarDetallesReembolso();
        res.status(200).json(detalles);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al listar los detalles de reembolso' });
    }
};

/**
 * Obtiene los detalles de reembolso asociados con un recibo específico.
 * 
 * @param {Object} req - El objeto de solicitud HTTP.
 * @param {Object} res - El objeto de respuesta HTTP.
 * @param {number} req.params.reciboId - El ID del recibo para el cual se desean obtener los detalles de reembolso.
 * @returns {Array<Object>} - Una lista de detalles de reembolso asociados con el recibo.
 * @throws {Error} - Si ocurre un error durante la obtención de los detalles de reembolso.
 */
export const ListarDetallesReembolsoByRecibo = async (req, res) => {
    const { reciboId } = req.params;
    try {
        const detalles = await DetalleReembolsoServicio.ListarDetallesReembolsoByReciboId(reciboId);
        res.status(200).json(detalles);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al listar los detalles de reembolso de dicho recibo' });
    }
};

/**
 * Obtiene un detalle de reembolso específico por su ID.
 * 
 * @param {Object} req - El objeto de solicitud HTTP.
 * @param {Object} res - El objeto de respuesta HTTP.
 * @param {number} req.params.id - El ID del detalle de reembolso que se desea obtener.
 * @returns {Object|null} - El detalle de reembolso encontrado o null si no se encuentra.
 * @throws {Error} - Si ocurre un error durante la obtención del detalle de reembolso.
 */
export const ListarDetallesReembolsoById = async (req, res) => {
    const { id } = req.params;
    try {
        const detalle = await DetalleReembolsoServicio.ListarDetallesReembolsoById(id);
        res.status(200).json(detalle);
    } catch (error) {
        res.status (500).json({ mensaje: 'Error al listar el detalle de reembolso de dicho detalle' });
    }
};
