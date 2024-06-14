import * as ImpuestoServicio from "../Services/ImpuestoServicio"

/**
 * Crea un nuevo impuesto.
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 * @param {string} req.body.nombre - El nombre del impuesto.
 * @param {number} req.body.tasa - La tasa del impuesto.
 * @param {string} req.body.tipo_impuesto - El tipo de impuesto.
 * @param {number} req.usuario.id - ID del usuario autenticado.
 * @returns {Object} - El nuevo impuesto creado.
 * @throws {Error} - Devuelve un error si hay un problema al crear el impuesto en la base de datos.
 */
export const crearImpuesto = async (req, res) => {
  try{
    const usuario_id = req.usuario.id;
    const { nombre, tasa, tipo_impuesto } = req.body;
    const impuesto = await ImpuestoServicio.crearImpuesto(usuario_id, nombre, tasa, tipo_impuesto)
    res.status(201).json(impuesto);
  } catch (error) {
        //Manejo bad request
        if (error.message === "Campo nombre vacío") {
            return res.status(400).json({ error: "El campo nombre no puede estar vacío" });
        } else if (error.message === "Campo tasa vacío") {
            return res.status(400).json({ error: "El campo tasa no puede estar vacío" });
        } else if (error.message === "Tasa no es número válido") {
            return res.status(400).json({ error: "El campo tasa solo puede ser un número" });
        } else if (error.message === "tipo_impuesto no válido") {
            return res.status(400).json({ error: "El tipo de impuesto no es válido" });
        } else {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al crear el impuesto.' });
    }
  }
};

/**
 * Obtiene una lista de todos los impuestos almacenados en la base de datos.
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 * @param {number} req.usuario.id - ID del usuario autenticado.
 * @returns {Array<Object>}  - Una lista de todos los impuestos.
 * @throws {Error} - Devuelve un error si hay un problema al obtener la lista de impuestos de la base de datos.
 */
export const listarImpuestos = async (req, res) => {
    try {
      const usuario_id = req.usuario.id;
      const impuestos = await ImpuestoServicio.listarImpuestos(usuario_id);
      res.status(200).json(impuestos)
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Error al obtener los impuestos.' });
    }
  };

/**
 * Obtiene un impuesto por su ID.
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 * @param {number} req.params.id - El ID del impuesto.
 * @param {number} req.usuario.id - ID del usuario autenticado.
 * @returns {Object} - El impuesto encontrado.
 * @throws {Error} - Devuelve un error si el impuesto no se encuentra o si hay un problema al obtenerlo de la base de datos.
 */
export const listarImpuestoPorId = async (req, res) => {
    try {
      const usuario_id = req.usuario.id;
        const id = req.params.id;
        const impuesto = await ImpuestoServicio.listarImpuestoPorId(id, usuario_id);
        if (impuesto == null) {
            return res.status(400).json({ error: "No se encontró el impuesto" });
        }
        res.status(200).json(impuesto)
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al obtener el impuesto.' });
    }
}

/**
 * Actualiza un impuesto existente en la base de datos.
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 * @param {number} req.params.id - El ID del impuesto a actualizar.
 * @param {string} req.body.nombre - El nuevo nombre del impuesto.
 * @param {number} req.body.tasa - La nueva tasa del impuesto.
 * @param {string} req.body.tipo_impuesto - El nuevo tipo de impuesto.
 * @param {number} req.usuario.id - ID del usuario autenticado.
 * @returns {Object} - El impuesto actualizado.
 * @throws {Error} - Devuelve un error si hay un problema al actualizar el impuesto en la base de datos.
 */
export const actualizarImpuesto = async (req, res) => {
    try {
      const id=req.params.id;
      const usuario_id = req.usuario.id;
      const{nombre, tasa, tipo_impuesto}=req.body
      const impuesto = await ImpuestoServicio.modificarImpuesto(id, nombre, tasa, tipo_impuesto, usuario_id);
  
      if (impuesto == null) {
        return res.status(404).json({ error: 'Impuesto no encontrado' });
      }

      res.status(200).json(impuesto); 
    } catch (error) {
        //Manejo bad request
        if (error.message === "Campo nombre vacío") {
            return res.status(400).json({ error: "El campo nombre no puede estar vacío" });
        } else if (error.message === "Campo tasa vacío") {
            return res.status(400).json({ error: "El campo tasa no puede estar vacío" });
        } else if (error.message === "Tasa no es número válido") {
            return res.status(400).json({ error: "El campo tasa solo puede ser un número" });
        } else if (error.message === "tipo_impuesto no válido") {
            return res.status(400).json({ error: "El tipo de impuesto no es válido" });
        } else {
      console.error(error);
      res.status(500).json({ mensaje: 'Error al actualizar el impuesto' });
    }
  };
}


/**
 * Elimina un impuesto por su ID.
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 * @param {number} req.params.id - El ID del impuesto a eliminar.
 * @param {number} req.usuario.id - ID del usuario autenticado.
 * @returns {Object} - Un mensaje de confirmación de que el impuesto se ha eliminado correctamente.
 * @throws {Error} - Devuelve un error si hay un problema al eliminar el impuesto de la base de datos.
 */
export const eliminarImpuesto = async (req, res) => {
    try {
      const id = req.params.id;
      const usuario_id = req.usuario.id;
      const impuesto = await ImpuestoServicio.eliminarImpuesto(id, usuario_id);
      res.status(200).json({ mensaje: 'Impuesto eliminado correctamente' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Error al eliminar el impuesto.' });
    }
  }