//import { connect } from "../database";
const CategoriaServicio = require('../Services/CategoriaServicio')



//Crear nueva categoría
export const crearCategoria = async (req, res) => {
  try{
    const { nombre, color } = req.body;
    const id_categoria = await crearCategoria(nombre, color);

    const nuevaCategoria = {
      id: id_categoria,
      nombre,
      color
    };

    res.status(201).json(nuevaCategoria);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al crear la categoría.' });
  }
};
module.exports = { crearCategoria };

//Listar categorías existentes
export const listarCategorias = async (req, res) => {
  try {
    const connection = await connect();
    const [results] = await connection.execute("SELECT * FROM categoria WHERE estado = true");
    res.status(200).json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener la lista de categorías.' });
  }
};


//Obtener una categoría por su ID
export const obtenerCategoriaPorId = async (req, res) => {
  try {
    const connection = await connect();
    const { id } = req.params;
    const [results] = await connection.execute("SELECT * FROM categoria WHERE id = ? AND estado = true", [id]);

    if (results.length === 0) {
      return res.status(404).json({ mensaje: 'Categoría no encontrada.' });
    }

    res.status(200).json(results[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener la categoría.' });
  }
};

//Actualizar categoría
export const actualizarCategoria = async (req, res) => {
  try {
    const connection = await connect();
    const { id } = req.params;
    const { nombre, color } = req.body;

    if (!id) {
        return res.status(400).json({ mensaje: 'ID de categoría no proporcionado.' });
    }

    await connection.execute(
      "UPDATE categoria SET nombre = ?, color = ? WHERE id = ? AND estado = true",
      [nombre, color, id]
    );

    res.status(200).json({ mensaje: 'Categoría actualizada con éxito.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al actualizar la categoría.' });
  }
};

//Eliminar categoría
export const eliminarCategoria = async (req, res) => {
  try {
    const connection = await connect();
    const { id } = req.params;

    await connection.execute("UPDATE categoria SET estado = false WHERE id = ?", [id]);

    res.status(200).json({ mensaje: 'Categoría eliminada con éxito.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al eliminar la categoría.' });
  }
};
