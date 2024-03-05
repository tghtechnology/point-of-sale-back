import { connect } from "../database";
import { crearCategoria } from "./CategoriaControlador"


//Crear nuevo artículo
export const crearArticulo = async (req, res) => {
    try {
      const connection = await connect();
      const { nombre, tipo_venta, precio, coste, ref, representacion, id_categoria } = req.body;
  
      if (!id_categoria) {
        res.status(400).json({ mensaje: 'El campo "categoria" es obligatorio.' });
        return;
      }
      
      //Obtener(si existe)
      const categoriaExistente = await obtenerCategoriaPorId(connection, id_categoria);
  
      //Crear nueva categoría si se desea
      if (!categoriaExistente) {
        // Si la categoría no existe, llamar a la función crearCategoria
        const nuevaCategoriaId = await crearCategoria('Nueva Categoría', '#CCCCCC'); // Puedes ajustar los valores predeterminados
        const [results] = await connection.execute(
          "INSERT INTO articulos (nombre, tipo_venta, precio, coste, ref, representacion, id_categoria) VALUES (?, ?, ?, ?, ?, ?, ?)",
          [nombre, tipo_venta, precio, coste, ref, representacion, nuevaCategoriaId]
        );
  
        const nuevoArticulo = {
          id: results.insertId,
          nombre,
          tipo_venta,
          precio,
          coste,
          ref,
          representacion,
          categoria: {
            id_categoria: nuevaCategoriaId,
            nombre,
            color
          }
        };
  
        res.status(201).json(nuevoArticulo);
      } else {
        // Si la categoría existe, proceder con la creación del artículo
        const [results] = await connection.execute(
          "INSERT INTO articulos (nombre, tipo_venta, precio, coste, ref, representacion, id_categoria) VALUES (?, ?, ?, ?, ?, ?, ?)",
          [nombre, tipo_venta, precio, coste, ref, representacion, id_categoria]
        );
  
        const nuevoArticulo = {
          id: results.insertId,
          nombre,
          tipo_venta,
          precio,
          coste,
          ref,
          representacion,
          categoria: {
            id_categoria: categoriaExistente.id,
            nombre: categoriaExistente.nombre,
            color: categoriaExistente.color
          }
        };
  
        res.status(201).json(nuevoArticulo);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Error al crear el artículo.' });
    }
  };

//Listar artículos existentes
export const listarArticulos = async (req, res) => {
  try {
    const connection = await connect();
    const [results] = await connection.execute(
      "SELECT a.id, a.nombre, a.tipo_venta, a.precio, a.coste, a.ref, a.representacion, a.id_categoria, c.nombre AS nombre_cat, c.color AS color_cat " +
      "FROM articulos a " +
      "LEFT JOIN categoria c ON a.id_categoria = c.id " +
      "WHERE a.estado = true;"
      );

      const articulosconCategoria = results.map((art) => {
        return {
          id: art.id,
          nombre: art.nombre,
          tipo_venta: art.tipo_venta,
          precio: art.precio,
          coste: art.coste,
          ref: art.ref,
          representacion: art.representacion,
          categoria: {
            id: art.id_categoria,
            nombre: art.nombre_cat,
            color: art.color_cat
          }
        };
      });

    res.status(200).json(articulosconCategoria);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener la lista de artículos.' });
  }
};


//Obtener artículo por su ID
export const obtenerArticuloPorId = async (req, res) => {
  try {
    const connection = await connect();
    const { id } = req.params;
    const [results] = await connection.execute(
      "SELECT a.id, a.nombre, a.tipo_venta, a.precio, a.coste, a.ref, a.representacion, a.id_categoria, c.nombre AS nombre_cat, c.color AS color_cat " +
      "FROM articulos a " +
      "LEFT JOIN categoria c ON a.id_categoria = c.id " +
      "WHERE a.id = ? AND a.estado = true", [id])

    if (results.length === 0) {
      return res.status(404).json({ mensaje: 'Artículo no encontrado.' });
    }

    const articuloconCategoria = results.map((art) => {
      return {
        id: art.id,
        nombre: art.nombre,
        tipo_venta: art.tipo_venta,
        precio: art.precio,
        coste: art.coste,
        ref: art.ref,
        representacion: art.representacion,
        categoria: {
          id: art.id_categoria,
          nombre: art.nombre_cat,
          color: art.color_cat
        }
      };
    });

    res.status(200).json(articuloconCategoria);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener el artículo.' });
  }
};


//Actualizar artículo
export const actualizarArticulo = async (req, res) => {
  try {
    const connection = await connect();
    const { id } = req.params;
    const { nombre, tipo_venta, precio, coste, ref, representacion, id_categoria } = req.body;

    const [results] = await connection.execute(
      "UPDATE articulos SET nombre = ?, tipo_venta = ?, precio = ?, coste = ?, ref = ?, representacion = ?, id_categoria = ? WHERE id = ? AND estado = true",
      [nombre, tipo_venta, precio, coste, ref, representacion, id_categoria, id]
    );

    res.status(200).json({ mensaje: 'Artículo actualizado con éxito.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al actualizar el artículo.' });
  }
};


//Eliminar artículo
export const eliminarArticulo = async (req, res) => {
  try {
    const connection = await connect();
    const { id } = req.params;

    await connection.execute("UPDATE articulos SET estado = false WHERE id = ?", [id]);

    res.status(200).json({ mensaje: 'Artículo eliminado con éxito.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al eliminar el artículo.' });
  }
};




//Otras funciones

const obtenerCategoriaPorId = async (connection, categoriaId) => {
    const [results] = await connection.execute("SELECT * FROM categoria WHERE id = ? AND estado = true", [categoriaId]);
    return results.length > 0 ? results[0] : null;
};