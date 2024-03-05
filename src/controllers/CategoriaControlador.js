import { connect } from "../database";

//Crear nueva categoría
export const crearCategoria = async (req, res) => {
  try {
    const connection = await connect();
    const { nombre, color } = req.body;

    const [results] = await connection.execute(
      "INSERT INTO categoria (nombre, color, estado) VALUES (?, ?, true)",
      [nombre, color]
    );

    const nuevaCategoria = {
      id: results.insertId,
      nombre,
      color
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
    const connection = await connect();
    const [results] = await connection.execute("SELECT id, nombre, color FROM categoria WHERE estado = true");
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
