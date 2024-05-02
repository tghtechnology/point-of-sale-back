import * as CategoriaServicio from "../Services/CategoriaServicio";

/**
 * Crea una nueva categoría.
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 * @param {string} req.body.nombre - El nombre de la categoría.
 * @param {string} req.body.color - El color de la categoría.
 * @returns {Object} - La nueva categoría creada.
 * @throws {Error} - Devuelve un error si hay un problema al crear la categoría en la base de datos.
 */
export const crearCategoria = async (req, res) => {
  console.log(res)
  try {
    const { nombre, color } = req.body;
    const newCategoria = await CategoriaServicio.crearCategoria(nombre, color);
    res.status(201).json(newCategoria)

  } catch (error) {
    //Manejo bad request
    if (error.message === "Campo nombre vacío") {
      return res.status(400).json({ error: "El campo nombre no puede estar vacío" });
  } else if (error.message === "Campo color vacío") {
      return res.status(400).json({ error: "El campo color no puede estar vacío" });
  } else if (error.message === "Categoría existente") {
    return res.status(400).json({ error: "La categoría ya existe" });
  } else {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al crear la categoría' });
  }
  }
}

/**
 * Obtiene una lista de todas las categorías almacenadas en la base de datos.
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 * @returns {Object} - Una lista de todas las categorías.
 * @throws {Error} - Devuelve un error si hay un problema al obtener la lista de categorías de la base de datos.
 */
export const listarCategorias = async (req, res) => {
  try {
    const categorias = await CategoriaServicio.listarCategorias();
    res.status(200).json(categorias)

  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al crear la categoría' });
  }
}

/**
 * Obtiene una categoría por su ID.
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 * @param {number} req.params.id - El ID de la categoría.
 * @returns {Object} - La categoría encontrada.
 * @throws {Error} - Devuelve un error si el ID de la categoría está vacío o si hay un problema al buscar la categoría en la base de datos.
 */
export const obtenerCategoriaPorId = async (req, res) => {
  try {
    const id = req.params.id;
    const categoria = await CategoriaServicio.listarCategoriaPorId(id);

    if (categoria == null) {
      return res.status(400).json({ error: "No se encontró la categoria" });
    }
    res.status (200).json(categoria)

  } catch (error) {
    //Manejo bad request
    if (error.message === "Campo ID vacío") {
      return res.status(400).json({ error: "El campo ID no puede estar vacío" });
    } else {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al crear la categoría' });
    }
  }
}

/**
 * Actualiza una categoría existente en la base de datos.
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 * @param {number} req.params.id - El ID de la categoría a actualizar.
 * @param {string} req.body.nombre - El nuevo nombre de la categoría.
 * @param {string} req.body.color - El nuevo color de la categoría.
 * @returns {Object} - La categoría actualizada.
 * @throws {Error} - Devuelve un error si el ID de la categoría está vacío, si el nombre o el color de la categoría están vacíos, si la categoría ya existe o si hay un problema al actualizar la categoría.
 */
export const actualizarCategoria = async (req, res) => {
  try {
    const id = req.params.id;
    const { nombre, color } = req.body
    const categoria = await CategoriaServicio.modificarCategoria(id, nombre, color);

    if (categoria == null) {
      return res.status(400).json({ error: "No se encontró la categoria" });
    }
    res.status (200).json(categoria)

  } catch (error) {
    //Manejo bad request
    if (error.message === "Campo ID vacío") {
      return res.status(400).json({ error: "El campo ID no puede estar vacío" });
    } else if (error.message === "Campo color vacío") {
      return res.status(400).json({ error: "El campo color no puede estar vacío" });
    } else if (error.message === "Campo color vacío") {
      return res.status(400).json({ error: "El campo color no puede estar vacío" });
    } else if (error.message === "Categoría existente") {
      return res.status(400).json({ error: "La categoría ya existe" });
    } else {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al crear la categoría' });
    }
  }
}

/**
 * Elimina una categoría por su ID.
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 * @param {number} req.params.id - El ID de la categoría a eliminar.
 * @returns {Object} - Un mensaje de confirmación de que la categoría se ha eliminado correctamente.
 * @throws {Error} - Devuelve un error si el ID de la categoría está vacío o si hay un problema al eliminar la categoría.
 */
export const eliminarCategoria = async (req, res) => {
  try {
    const id = req.params.id;
    const categoria = await CategoriaServicio.eliminarCategoria(id);

    if (categoria == null) {
      return res.status(400).json({ error: "No se encontró la categoria" });
    }
    res.status (200).json({message: 'Categoría eliminada correctamente'})

  } catch (error) {
    if (error.message === "Campo ID vacío") {
      return res.status(400).json({ error: "El campo ID no puede estar vacío" });
    } else {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al crear la categoría' });
    }
  }
}