import * as CategoriaServicio from "../Services/CategoriaServicio";
import { createCategorySchema, idSchema, editCategorySchema  } from "../Utils/Validations/CategoryValidation";
import { z } from 'zod';

export const crearCategoria = async (req, res) => {
  try {
    const dv = createCategorySchema.parse(req.body);

    const newCategoria = await CategoriaServicio.crearCategoria(
      dv.nombre, 
      dv.color
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

export const listarCategorias = async (req, res) => {
  try {
    const categorias = await CategoriaServicio.listarCategorias();
    res.status(200).json(categorias)

  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al crear la categoría' });
  }
}

export const obtenerCategoriaPorId = async (req, res) => {
  try {
    const dv = idSchema.parse(req.params);

    const categoria = await CategoriaServicio.listarCategoriaPorId(dv.id);

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

export const actualizarCategoria = async (req, res) => {
  try {
    const dv = editCategorySchema.parse({
      id: req.params.id,
      nombre: req.body.nombre,
      color: req.body.color,
    });
    const categoria = await CategoriaServicio.modificarCategoria(
      dv.id, 
      dv.nombre, 
      dv.color);

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

export const eliminarCategoria = async (req, res) => {
  try {
    const dv = idSchema.parse(req.params);

    const categoria = await CategoriaServicio.eliminarCategoria(dv.id);

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