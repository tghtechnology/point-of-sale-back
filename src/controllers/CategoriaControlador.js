//import { connect } from "../database";
import * as CategoriaServicio from "../Services/CategoriaServicio";

//Crear nueva categoría
export const crearCategoria = async (req, res) => {
  try {
    const { nombre, color } = req.body;
    const nuevaCategoria = await CategoriaServicio.crearCategoria(
      nombre,
      color
    );

    res.status(201).json(nuevaCategoria);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al crear la categoría." });
  }
};

//Listar categorías existentes
export const listarCategorias = async (req, res) => {
  try {
    const categorias = await CategoriaServicio.listarCategorias();
    res.status(200).json(categorias);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ mensaje: "Error al obtener la lista de categorías." });
  }
};

//Obtener una categoría por su ID
export const obtenerCategoriaPorId = async (req, res) => {
  try {
    const text_id = req.params.text_id;
    const categoria = await CategoriaServicio.listarCategoriaPorId(text_id);
    if (categoria == null) {
      return res.status(404).json({ mensaje: "Categoría no encontrada." });
    }
    res.status(200).json(categoria);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al obtener la categoría." });
  }
};

//Actualizar categoría
export const actualizarCategoria = async (req, res) => {
  try {
    const text_id = req.params.text_id;
    const { nombre, color } = req.body;
    const categoria = await CategoriaServicio.modificarCategoria(
      text_id,
      nombre,
      color
    );

    if (!categoria) {
      res.status(404).json({ message: "Categoría no encontrada" });
    }
    res.status(200).json(categoria);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al actualizar la categoría" });
  }
};

//Eliminar categoría
export const eliminarCategoria = async (req, res) => {
  try {
    const text_id = req.params.text_id;
    await CategoriaServicio.eliminarCategoria(text_id);
    res.status(200).json({ mensaje: "Categoría eliminada correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al eliminar la categoría." });
  }
};

module.exports = {
  crearCategoria,
  listarCategorias,
  obtenerCategoriaPorId,
  actualizarCategoria,
  eliminarCategoria,
};
