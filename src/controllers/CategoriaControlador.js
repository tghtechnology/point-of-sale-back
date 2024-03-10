//import { connect } from "../database";
import * as CategoriaServicio from "../Services/CategoriaServicio"

//Crear nueva categoría
export const crearCategoria = async (req, res) => {
  try{
    const { nombre, color } = req.body;
    const id = await CategoriaServicio.crearCategoria(nombre,color)

    const nuevaCategoria = {
      id: id.insertId,
      nombre: nombre,
      color: color,
    };

    res.status(201).json(nuevaCategoria);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al crear la categoría.' });
  }
};


//Listar categorías existentes
export const listarCategorias = async (req, res) => {
  try {
    const categorias = await CategoriaServicio.listarCategorias();
    res.status(200).json(categorias)
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener la lista de categorías.' });
  }
};


//Obtener una categoría por su ID
export const obtenerCategoriaPorId = async (req, res) => {
  try {
    const id = req.params.id;
    const categoria = await CategoriaServicio.listarCategoriaPorId(id);
    res.status(200).json(categoria);

    if (categoria.length === 0) {
      return res.status(404).json({ mensaje: 'Categoría no encontrada.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener la categoría.' });
  }
};

//Actualizar categoría
export const actualizarCategoria = async (req, res) => {
  try {
    const id=req.params.id;
    const{nombre,color}=req.body
    const categoria = await CategoriaServicio.modificarCategoria(id,nombre,color);

    const categoriaActualizada = {
      id: id.insertId,
      nombre: nombre,
      color: color,
    };

    if (!categoria) {
      res.status(404).json({ message: 'Categoría no encontrada' });
    }
    res.status(200).json(categoriaActualizada); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al actualizar la categoría' });
  }
};

//Eliminar categoría
export const eliminarCategoria = async (req, res) => {
  try {
    const id = req.params.id;
    await CategoriaServicio.eliminarCategoria(id);
    res.status(200).json({ mensaje: 'Categoría eliminada correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al eliminar la categoría.' });
  }
};
module.exports = { crearCategoria,listarCategorias, obtenerCategoriaPorId, actualizarCategoria, eliminarCategoria };
