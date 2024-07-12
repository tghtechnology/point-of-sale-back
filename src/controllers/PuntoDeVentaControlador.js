import * as PuntoDeVentaServicio from "../Services/PuntoDeVentaServicio";

/**
 * Obtiene la lista de todos los puntos de venta activos.
 * 
 * @param {Object} _ - Objeto de solicitud (no utilizado).
 * @param {Object} res - Objeto de respuesta.
 * @returns {Array<Object>}  - La lista de todos los POS.
 * @throws {Error} - Devuelve un error si hay un problema al obtener la lista de POS.
 */
export const listarPOS = async (_, res) => {
    try{
      const pos = await PuntoDeVentaServicio.listarPOS()
      res.status(201).json(pos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Error al listar los pos.' });
    }
}

/**
 * Obtiene un POS por su ID.
 * 
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 * @param {number} req.params.id - ID del POS a buscar.
 * @returns {Object} - El POS encontrado.
 * @throws {Error} - Devuelve un error si hay un problema al obtener el POS.
 */
export const listarPOSPorId = async (req, res) => {
    try{
        const id = req.params.id;
        const pos = await PuntoDeVentaServicio.listarPOS(id)
        if (!pos) {
            return res.status(404).json({ error: "No se encontró el punto de venta" });
        }
        res.status(201).json(pos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Error al listar el pos.' });
    }
}


/**
 * Elimina un punto de venta por su ID.
 * 
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 * @param {Number} req.params.id - ID del punto de venta a eliminar.
 * @returns {Object} - Un mensaje de confirmación de que el POS se ha eliminado correctamente.
 * @throws {Error} - Devuelve un error si hay un problema al eliminar el POS.
 */
export const eliminarPOS = async (req, res) => {
    try {
      const id = req.params.id;
      const pos = await PuntoDeVentaServicio.eliminarPOS(id);
      if (!pos) {
        return res.status(404).json({ error: 'Punto de venta no encontrado' });
      }
      res.status(200).json({ mensaje: 'Punto de venta eliminado correctamente' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Error al eliminar el punto de venta.' });
    }
  }


  /**
 * Restablece un punto de venta eliminado por su ID.
 * 
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 * @param {Number} req.params.id - ID del punto de venta a restablecer.
 * @returns {Object} - Un mensaje de confirmación de que el POS se ha reestablecido correctamente.
 * @throws {Error} - Devuelve un error si hay un problema al reestablecer el POS.
 */
  export const reestablecerPOS = async (req, res) => {
    try {
      const id = req.params.id;
      const pos = await PuntoDeVentaServicio.reestablecerPos(id);
      if (!pos) {
        return res.status(404).json({ error: 'Punto de venta no encontrado' });
      }
      res.status(200).json({ mensaje: 'Punto de venta reestablecido correctamente' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Error al reestablecer el punto de venta.' });
    }
  }


  /**
 * Obtiene la lista de todos los puntos de venta eliminados.
 * 
 * @param {Object} _ - Objeto de solicitud (no utilizado).
 * @param {Object} res - Objeto de respuesta.
 * @returns {Array<Object>}  - La lista de todos los POS eliminados.
 * @throws {Error} - Devuelve un error si hay un problema al obtener la lista de POS eliminados.
 */
  export const listarPosEliminados = async (_, res) => {
    try{
      const pos = await PuntoDeVentaServicio.listarPosEliminados()
      res.status(201).json(pos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Error al listar los pos.' });
    }
}

/**
 * Obtiene un punto de venta eliminado por su ID.
 * 
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 * @param {Number} req.params.id - ID del punto de venta eliminado a buscar.
 * @returns {Object} - El POS encontrado.
 * @throws {Error} - Devuelve un error si hay un problema al obtener el POS.
 */
export const listarPosEliminadosPorId = async (req, res) => {
  try{
      const id = req.params.id;
      const pos = await PuntoDeVentaServicio.listarPosEliminadosPorId(id)
      if (!pos) {
          return res.status(404).json({ error: "No se encontró el punto de venta" });
      }
      res.status(201).json(pos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al listar el pos.' });
  }
}
