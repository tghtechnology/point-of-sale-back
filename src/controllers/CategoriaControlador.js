import * as CategoriaServicio from "../Services/CategoriaServicio";
import { createCategorySchema, idSchema, editCategorySchema  } from "../Utils/Validations/CategoryValidation";
import { z } from 'zod';

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
  try {
    const usuario_id = req.usuario.id;
    const dv = createCategorySchema.parse(req.body);

    const newCategoria = await CategoriaServicio.crearCategoria(
      dv.nombre, 
      dv.color,
      usuario_id
    );
    res.status(201).json(newCategoria)

  } catch (error) {
    if (error instanceof z.ZodError) {
      const errores = error.errors.map((err) => ({
        path: err.path[0], 
        message: err.message, 
      }));
      return res.status(400).json(errores);
    }
    console.error(error);
    res.status(500).json({ error: 'Ocurrió un error al crear la categoría' });
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
    const usuario_id = req.usuario.id;
    const categorias = await CategoriaServicio.listarCategorias(usuario_id);
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
    const dv = idSchema.parse(req.params);
    const usuario_id = req.usuario.id;

    const categoria = await CategoriaServicio.listarCategoriaPorId(dv.id, usuario_id);

    if (categoria == null) {
      return res.status(400).json({ error: "No se encontró la categoria" });
    }
    res.status (200).json(categoria)

  } catch (error) {
    if (error instanceof z.ZodError) {
      const errores = error.errors.map((err) => ({
        path: err.path[0],
        message: err.message,
      }));
      return res.status(400).json({ errores });
    }
    console.error(error);
    res.status(500).json({ error: 'Error al obtener la categoría' });
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
    const usuario_id = req.usuario.id;
    const dv = editCategorySchema.parse({
      id: req.params.id,
      nombre: req.body.nombre,
      color: req.body.color,
    });
    const categoria = await CategoriaServicio.modificarCategoria(
      dv.id, 
      dv.nombre, 
      dv.color,
      usuario_id
    );

    if (categoria == null) {
      return res.status(400).json({ error: "No se encontró la categoria" });
    }
    res.status (200).json(categoria)

  } catch (error) {
    if (error instanceof z.ZodError) {
      const errores = error.errors.map((err) => ({
        path: err.path[0],
        message: err.message,
      }));
      return res.status(400).json({ errores });
    }
    console.error(error);
    res.status(500).json({ mensaje: 'Error al editar la categoría' });
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
    const dv = idSchema.parse(req.params);
    const usuario_id = req.usuario.id;

    const categoria = await CategoriaServicio.eliminarCategoria(dv.id, usuario_id);

    if (categoria == null) {
      return res.status(400).json({ error: "No se encontró la categoria" });
    }
    res.status (200).json({message: 'Categoría eliminada correctamente'})

  } catch (error) {
    if (error instanceof z.ZodError) {
      const errores = error.errors.map((err) => ({
        path: err.path[0],
        message: err.message,
      }));
      return res.status(400).json({ errores });
    }
    console.error(error);
    res.status(500).json({ mensaje: 'Error al editar la categoría' });
  }
}