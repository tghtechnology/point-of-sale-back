import * as ArticuloServicio from "../Services/ArticuloServicio"
import * as CategoriaServicio from "../Services/CategoriaServicio" 


//Crear nuevo artículo
export const crearArticulo = async (req, res) => {
  try {
    const { nombre, tipo_venta, precio, coste, ref, representacion, nombre_categoria } = req.body;
      //Obtener(si existe)
    const categoria = await CategoriaServicio.listarCategoriaPorId(nombre_categoria)

    if(categoria === null) {
      return res.status(400).json({ mensaje: 'La categoría no existe' });
    }
      //Crear nueva categoría si se desea
      //if (!categoriaExistente) {
    const nuevoArticulo = await ArticuloServicio.crearArticulo(nombre, tipo_venta, precio, coste, ref, representacion, nombre_categoria)
  
    /*const nuevoArticulo = {
        id: id.insertId,
        nombre: nombre,
        tipo_venta: tipo_venta,          
        precio: precio,
        coste: coste,
        ref: ref,
        representacion: representacion,
        categoria: Array.isArray(categoria) ? categoria[0] : categoria
    };*/
  
      res.status(201).json(nuevoArticulo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al crear el artículo.' });
  }
};

//Listar artículos existentes
export const listarArticulos = async (req, res) => {
  try {
    const articulos = await ArticuloServicio.listarArticulos();

    res.status(200).json(articulos);
  } catch (error) {
    console.error(error);
    if (error instanceof CustomBadRequestError) {
      return res.status(400).json({ mensaje: 'Error en la solicitud del cliente.' });
    }
    res.status(500).json({ mensaje: 'Error al obtener la lista de artículos.' });
  }
};


//Obtener artículo por su ID
export const obtenerArticuloPorId = async (req, res) => {
  try {
    const id = req.params.id;
    const articulo = await ArticuloServicio.listarArticuloPorId(id);

    if (!articulo) {
    return res.status(404).json({ mensaje: 'No se encontró el artículo' });
    }
    res.status(200).json(articulo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener el artículo' });
  }
};


//Actualizar artículo
export const actualizarArticulo = async (req, res) => {
  try {
    const id=req.params.id;
    const{nombre, tipo_venta, precio, coste, ref, representacion, id_categoria}=req.body
    const articulo = await ArticuloServicio.modificarArticulo(id, nombre, tipo_venta, precio, coste, ref, representacion, id_categoria);
    const categoria = await CategoriaServicio.listarCategoriaPorId(id_categoria)

    /*const articuloActualizado = {
      id: id.insertId,
      nombre: nombre,
      tipo_venta: tipo_venta,          
      precio: precio,
      coste: coste,
      ref: ref,
      representacion: representacion,
      categoria: Array.isArray(categoria) ? categoria[0] : categoria
  };*/

    if (!articulo) {
      res.status(404).json({ mensaje: 'No se encontró el artículo' });
    }
      res.status(200).json(articulo);
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Error al obtener el artículo' });
  }
};


//Eliminar artículo
export const eliminarArticulo = async (req, res) => {
  try {
    const id = req.params.id;
    await ArticuloServicio.eliminarArticulo(id);
    res.status(200).json({ mensaje: 'Artículo eliminado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al eliminar el artículo' });
  }
};




