import * as CategoriaServicio from "../Services/CategoriaServicio";

export const crearCategoria = async (req, res) => {
  console.log(res)
  try {
    const { nombre, color } = req.body;
    const newCategoria = await CategoriaServicio.crearCategoria(nombre, color);
    res.status(201).json(newCategoria)

  } catch (error) {
    //Manejo bad request
    if (error.message === "Campo nombre vacío") {
      return res.status(400).json({ error: "El campo nombre no puede estar vacío" });
  } else if (error.message === "Campo color vacío") {
      return res.status(400).json({ error: "El campo color no puede estar vacío" });
  } else if (error.message === "Categoría existente") {
    return res.status(400).json({ error: "La categoría ya existe" });
  } else {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al crear la categoría' });
  }
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
    const id = req.params.id;
    const categoria = await CategoriaServicio.listarCategoriaPorId(id);

    if (categoria == null) {
      return res.status(400).json({ error: "No se encontró la categoria" });
    }
    res.status (200).json(categoria)

  } catch (error) {
    //Manejo bad request
    if (error.message === "Campo ID vacío") {
      return res.status(400).json({ error: "El campo ID no puede estar vacío" });
    } else {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al crear la categoría' });
    }
  }
}

export const actualizarCategoria = async (req, res) => {
  try {
    const id = req.params.id;
    const { nombre, color } = req.body
    const categoria = await CategoriaServicio.modificarCategoria(id, nombre, color);

    if (categoria == null) {
      return res.status(400).json({ error: "No se encontró la categoria" });
    }
    res.status (200).json(categoria)

  } catch (error) {
    //Manejo bad request
    if (error.message === "Campo ID vacío") {
      return res.status(400).json({ error: "El campo ID no puede estar vacío" });
    } else if (error.message === "Campo color vacío") {
      return res.status(400).json({ error: "El campo color no puede estar vacío" });
    } else if (error.message === "Campo color vacío") {
      return res.status(400).json({ error: "El campo color no puede estar vacío" });
    } else if (error.message === "Categoría existente") {
      return res.status(400).json({ error: "La categoría ya existe" });
    } else {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al crear la categoría' });
    }
  }
}

export const eliminarCategoria = async (req, res) => {
  try {
    const id = req.params.id;
    const categoria = await CategoriaServicio.eliminarCategoria(id);

    if (categoria == null) {
      return res.status(400).json({ error: "No se encontró la categoria" });
    }
    res.status (200).json({message: 'Categoría eliminada correctamente'})

  } catch (error) {
    if (error.message === "Campo ID vacío") {
      return res.status(400).json({ error: "El campo ID no puede estar vacío" });
    } else {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al crear la categoría' });
    }
  }
}

/*export const buscarCategoria = async (req, res) => {
  try {
    const search = req.query.search
    const result = await CategoriaServicio.buscarCategoria(search)
    res.status(200).json(result)
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al buscar las categorías' });
  }
}*/