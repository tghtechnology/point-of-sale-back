import * as DescuentoServicio from "../Services/DescuentoServicio";
/**
 * Crea un nuevo descuento.
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 * @param {string} req.body.nombre - El nombre del descuento.
 * @param {string} req.body.tipo_descuento - El tipo de descuento.
 * @param {float} req.body.valor - El valor del descuento.
 * @param {number} req.usuario.id - ID del usuario autenticado.
 * @returns {Object} - El nuevo descuento creado.
 * @throws {Error} - Devuelve un error si hay un problema al crear el descuento.
 */
export const crearDescuento = async (req, res) => {
  try {
    const usuario_id = req.usuario.id;
    const { nombre, tipo_descuento, valor } = req.body;
    const newDescuento = await DescuentoServicio.crearDescuento(nombre,tipo_descuento,valor, usuario_id); 
    res.status(201).json(newDescuento);
  }
  catch (error) {
    if (error.message === "Tipo de descuento no válido") {
      res.status(401).json({ error: "Ingrese el tipo de descuento válido" });
    }
    res.status(500).json({ error: error.message });
  }
};

/**
 * Elimina un descuento por su ID.
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 * @param {number} req.params.id - El ID del descuento a eliminar.
 * @param {number} req.usuario.id - ID del usuario autenticado.
 * @returns {Object} - Un mensaje de confirmación de que el descuento se ha eliminado correctamente.
 * @throws {Error} - Devuelve un error si hay un problema al eliminar el descuento.
 */
export const eliminarDescuento = async (req, res) => {
  try {
    const id = req.params.id;
    const usuario_id = req.usuario.id;
    await DescuentoServicio.eliminarDescuento(id, usuario_id);
    res.status(200).json({ mensaje: "Descuento eliminado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Obtiene un descuento por su ID.
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 * @param {number} req.params.id - El ID del descuento.
 * @param {number} req.usuario.id - ID del usuario autenticado.
 * @returns {Object} - El descuento encontrado.
 * @throws {Error} - Devuelve un error si hay un problema al obtener el descuento.
 */
export const obtenerDescuentoById = async (req, res) => {
  try {
    const id = req.params.id;
    const usuario_id = req.usuario.id;
    const descuento = await DescuentoServicio.obtenerDescuentoById(id, usuario_id);
    if (descuento) {
      res.status(200).json(descuento);
    } else {
      res.status(404).json({ mensaje: "Descuento no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Modifica un descuento existente.
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 * @param {number} req.params.id - El ID del descuento a modificar.
 * @param {string} req.body.nombre - El nuevo nombre del descuento.
 * @param {string} req.body.tipo_descuento - El nuevo tipo de descuento.
 * @param {number} req.body.valor - El nuevo valor del descuento.
 * @param {boolean} req.body.estado - El nuevo estado del descuento, si se proporciona.
 * @param {number} req.usuario.id - ID del usuario autenticado.
 * @returns {Object} - El descuento modificado.
 * @throws {Error} - Devuelve un error si hay un problema al modificar el descuento.
 */
export const modificarDescuento = async (req, res) => {
  try {
    const id = req.params.id;
    const usuario_id = req.usuario.id;
    const { nombre, tipo_descuento, valor, estado } = req.body;
    const resultado = await DescuentoServicio.modificarDescuento(id, nombre, tipo_descuento, valor, estado, usuario_id);
    if (resultado) {
      res.status(200).json(resultado);
    } else {
      res.status(404).json({ message: "Descuento no encontrado" });
    }
  } catch (error) {
    if (error.message === "Tipo de descuento no válido") {
      res.status(401).json({ error: "Ingrese el tipo de descuento válido" });
    }
    res.status(500).json({ error: error.message });
  }
};

/**
 * Obtiene todos los descuentos.
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 * @param {number} req.usuario.id - ID del usuario autenticado.
 * @returns {Array<Object>}  - La lista de todos los descuentos.
 * @throws {Error} - Devuelve un error si hay un problema al obtener los descuentos.
 */
export const obtenerDescuentos = async (req, res) => {
  try {
    const usuario_id = req.usuario.id;
    const descuentos = await DescuentoServicio.obtenerDescuentos(usuario_id);
    res.status(200).json(descuentos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Cambia el estado de un descuento.
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 * @param {number} req.params.id - El ID del descuento.
 * @param {boolean} req.body.estado - El nuevo estado del descuento.
 * @param {number} req.usuario.id - ID del usuario autenticado.
 * @returns {Object} - Un mensaje de confirmación de que el estado del descuento se ha cambiado correctamente.
 * @throws {Error} - Devuelve un error si hay un problema al cambiar el estado del descuento.
 */
export const cambiarEstadoDescuento = async (req, res) => {
  try {
    const usuario_id = req.usuario.id;
    const { id } = req.params;
    const { estado } = req.body;
    console.log("Estado recibido:", estado);
    await DescuentoServicio.cambiarEstadoDescuento(id, estado, usuario_id);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Obtiene todos los descuentos eliminados.
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 * @param {number} req.usuario.id - ID del usuario autenticado.
 * @returns {Array<Object>}  - Una lista de todos los descuentos eliminados.
 * @throws {Error} - Devuelve un error si hay un problema al obtener los descuentos eliminados.
 */
export const obtenerDescuentosEliminados = async (req, res) => {
  try {
    const usuario_id = req.usuario.id;
    const descuentoseliminados =
      await DescuentoServicio.obtenerDescuentosEliminados(usuario_id);
    res.status(200).json(descuentoseliminados);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
