import * as ArticuloServicio from "../Services/ArticuloServicio";
import { uploadImage, deleteImage } from "../Utils/cloudinary.js";

/**
 * Crea un nuevo artículo en la tabla articulo.
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 * @param {string} req.body.nombre - El nombre del artículo.
 * @param {string} req.body.tipo_venta - El tipo de venta del artículo.
 * @param {float} req.body.precio - El precio del artículo.
 * @param {string} req.body.color - El color del artículo.
 * @param {number} req.body.id_categoria - El ID de la categoría del artículo.
 * @param {string} req.body.imagen - La URL de la imagen del artículo.
 * @returns {Object} - El nuevo artículo creado.
 * @throws {Error} - Devuelve un error si falta algún campo obligatorio o si hay un problema al crear el artículo.
 */

export const crearArticulo = async (req, res) => {
  try {
    const usuario_id = req.usuario.id;
    const { nombre, tipo_venta, precio, representacion, color, id_categoria} = req.body;
    let imagen = req.body.imagen

    //Subir imagen
    if(req.files?.imagen) {
      const result = await uploadImage(req.files.imagen.tempFilePath)
      imagen = result.secure_url
    }

    const newArticulo = await ArticuloServicio.crearArticulo(nombre, tipo_venta, precio, representacion, color, imagen, id_categoria, usuario_id);

    res.status(201).json(newArticulo)

  } catch (error) {
    //Manejo bad request
    if (error.message === "Campo nombre vacío") {
      return res.status(400).json({ error: "El campo nombre no puede estar vacío" });
  } else if (error.message === "Campo tipo_venta vacío") {
      return res.status(400).json({ error: "El campo tipo de venta no puede estar vacío" });
  } else if (error.message === "Campo precio vacío") {
    return res.status(400).json({ error: "El campo precio no puede estar vacío" });
  } else if (error.message === "Representacion no valida") {
    return res.status(400).json({ error: "El campo representacion no es válido" });
  } else if (error.message === "Precio no es número válido") {
    return res.status(400).json({ error: "El campo precio solo puede ser un número" });
  } else if (error.message === "Tipo de venta no válido") {
  return res.status(400).json({ error: "El tipo de venta no es válido" });
  } else if (error.message === "Categoría inexistente") {
    return res.status(400).json({ error: "La categoría no existe" });
  } else if (error.message === "Color no valido") {
    return res.status(400).json({ error: "El color no es válido" });
  } else {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al crear el artículo' });
  }
}
}

/**
 * Obtiene una lista de todos los artículos almacenados en la base de datos.
 * @param {Object} req - La solicitud HTTP (no utilizado).
 * @param {Object} res - La respuesta HTTP.
 * @returns {Array} - Una lista de todos los artículos.
 * @throws {Error} - Devuelve un error si hay un problema al obtener la lista de artículos de la base de datos.
 */
export const listarArticulos = async (req, res) => {
  try {
    const usuario_id = req.usuario.id;
    const articulos = await ArticuloServicio.listarArticulos(usuario_id);
    res.status(200).json(articulos)

  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al listar el artículo' });
  }
}

/**
 * Obtiene un artículo de la base de datos por su ID.
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 * @param {number} req.params.id - El ID del artículo a buscar.
 * @returns {Object} - El artículo encontrado.
 * @throws {Error} - Devuelve un error si no se encuentra el artículo con el ID especificado.
 */
export const obtenerArticuloPorId = async (req, res) => {
  try {
    const id = req.params.id;
    const usuario_id = req.usuario.id;
    const articulo = await ArticuloServicio.listarArticuloPorId(id, usuario_id);

    if (articulo == null) {
      return res.status(400).json({ error: "No se encontró el artículo" });
    }
    res.status (200).json(articulo)

  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al listar el artículo' });
  }
}

/**
 * Actualiza un artículo existente en la base de datos.
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 * @param {number} req.params.id - El ID del artículo a actualizar.
 * @param {string} req.body.nombre - El nuevo nombre del artículo.
 * @param {string} req.body.tipo_venta - El nuevo tipo de venta del artículo.
 * @param {float} req.body.precio - El nuevo precio del artículo.
 * @param {string} req.body.color - El nuevo color del artículo.
 * @param {number} req.body.id_categoria - El nuevo ID de la categoría del artículo.
 * @param {string} req.body.imagen - La nueva URL de la imagen del artículo (opcional).
 * @returns {Object} - El artículo actualizado.
 * @throws {Error} - Devuelve un error si hay un problema al actualizar el artículo en la base de datos.
 */
export const actualizarArticulo = async (req, res) => {
  try {
    const id = req.params.id;
    const usuario_id = req.usuario.id;
    const { nombre, tipo_venta, precio, representacion, color, id_categoria} = req.body
    let imagen = req.body.imagen

    //Quitar imagen
    if (imagen !== '') {
      const ImgId = imagen;
      if (ImgId) {
        const result = await deleteImage(imagen)
        console.log(result)
      }
    }
    //Subir otra imagen
    if (req.files?.imagen) {
      const newImagen = await uploadImage(req.files.imagen.tempFilePath)
      imagen = newImagen.secure_url
      console.log(imagen)
    }

    const articulo = await ArticuloServicio.modificarArticulo(id, nombre, tipo_venta, precio, representacion, color, imagen, id_categoria, usuario_id);
    

    if (articulo == null) {
      return res.status(400).json({ error: "No se encontró el artículo" });
    }
    res.status (200).json(articulo)

  } catch (error) {
    //Manejo bad request
    if (error.message === "Campo nombre vacío") {
      return res.status(400).json({ error: "El campo nombre no puede estar vacío" });
    } else if (error.message === "Campo tipo_venta  vacío") {
      return res.status(400).json({ error: "El campo tipo de venta no puede estar vacío" });
    } else if (error.message === "Campo precio vacío") {
      return res.status(400).json({ error: "El campo precio no puede estar vacío" });
    } else if (error.message === "Campo representacion vacío") {
      return res.status(400).json({ error: "El campo representacion no puede estar vacío" });
    } else if (error.message === "Precio no es un número válido") {
      return res.status(400).json({ error: "El campo precio solo puede ser un número" });
    } else if (error.message === "Tipo de venta no válido") {
      return res.status(400).json({ error: "El tipo de venta no es válido" });
    } else {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al editar el artículo' });
    }
  }
}

/**
 * Elimina un artículo de la base de datos por su ID.
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 * @param {number} req.params.id - El ID del artículo a eliminar.
 * @returns {Object} - Un mensaje de confirmación de que el artículo fue eliminado correctamente.
 * @throws {Error} - Devuelve un error si no se encuentra el artículo con el ID especificado o si hay un problema al eliminarlo.
 */
export const eliminarArticulo = async (req, res) => {
  try {
    const id = req.params.id;
    const usuario_id = req.usuario.id;

    //Eliminar imagen de la nube
    const Articulo = await ArticuloServicio.listarArticuloPorId(id)
    const secure_url = Articulo.imagen; // Asegúrate de que este campo tenga el `secure_url` de la imagen

    if (secure_url) {
      await deleteImage(secure_url);
    }

    const articulo = await ArticuloServicio.eliminarArticulo(id, usuario_id);

    if (articulo == null) {
      return res.status(400).json({ error: "No se encontró el artículo" });
    }
    res.status (200).json({message: 'Artículo eliminado correctamente'})

  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al crear el artículo' });
  }
}