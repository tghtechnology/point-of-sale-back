import * as ArticuloServicio from "../Services/ArticuloServicio";
import { uploadImage, deleteImage } from "../Utils/cloudinary.js";

export const crearArticulo = async (req, res) => {
  try {
    const { nombre, tipo_venta, precio, representacion, color, id_categoria} = req.body;
    let imagen = req.body.imagen

    //Subir imagen
    if(req.files?.imagen) {
      const result = await uploadImage(req.files.imagen.tempFilePath)
      imagen = result.secure_url
    }

    const newArticulo = await ArticuloServicio.crearArticulo(nombre, tipo_venta, precio, representacion, color, imagen, id_categoria);

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

export const listarArticulos = async (_, res) => {
  try {
    const articulos = await ArticuloServicio.listarArticulos();
    res.status(200).json(articulos)

  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al listar el artículo' });
  }
}

export const obtenerArticuloPorId = async (req, res) => {
  try {
    const id = req.params.id;
    const articulo = await ArticuloServicio.listarArticuloPorId(id);

    if (articulo == null) {
      return res.status(400).json({ error: "No se encontró el artículo" });
    }
    res.status (200).json(articulo)

  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al listar el artículo' });
  }
}

export const actualizarArticulo = async (req, res) => {
  try {
    const id = req.params.id;
    const { nombre, tipo_venta, precio, color, id_categoria} = req.body
    let imagen = req.body.imagen

    //Quitar imagen
    if (imagen !== '') {
      const ImgId = imagen;
      if (ImgId) {
        const result = await deleteImage(imagen)
      }
    }
    
    //Subir otra imagen
    if (req.files?.imagen) {
      const newImagen = await uploadImage(req.files.imagen.tempFilePath)
      imagen = newImagen.secure_url
      console.log(imagen)
    }

    const articulo = await ArticuloServicio.modificarArticulo(id, nombre, tipo_venta, precio, color, imagen, id_categoria);
    

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

export const eliminarArticulo = async (req, res) => {
  try {
    const id = req.params.id;

    //Eliminar imagen de la nube
    const Articulo = await ArticuloServicio.listarArticuloPorId(id)
    const secure_url = Articulo.imagen; // Asegúrate de que este campo tenga el `secure_url` de la imagen

    if (secure_url) {
      await deleteImage(secure_url);
    }

    const articulo = await ArticuloServicio.eliminarArticulo(id);

    if (articulo == null) {
      return res.status(400).json({ error: "No se encontró el artículo" });
    }
    res.status (200).json({message: 'Artículo eliminado correctamente'})

  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al crear el artículo' });
  }
}
