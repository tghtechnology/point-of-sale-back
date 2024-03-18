import { PrismaClient } from "@prisma/client";
import * as CategoriaServicio from "../Services/CategoriaServicio"

const prisma = new PrismaClient();

//Crear un nuevo artículo
const crearArticulo = async (nombre, tipo_venta, precio, coste, ref, representacion, id_categoria, categoriaNueva) => {
  
    let idCategoria;
  
    if (categoriaNueva) {
      // Crear una nueva categoría desde artículo
      const nuevaCategoria = await CategoriaServicio.crearCategoria(nombreCategoria, colorCategoria);
      idCategoria = nuevaCategoria.insertId;
    } else {
      // Si la categoría ya existe
      idCategoria = id_categoria;
    }

    //Se crea el nuevo artículo
    const articulo = await prisma.articulo.create({
      data: {
        nombre: nombre,
        tipo_venta: tipo_venta,          
        precio: precio,
        coste: coste,
        ref: ref,
        representacion: representacion,
        categoria: { connect: { id: id_categoria } },
        estado: true
      }
    })

  // Consultar la categoría 
  const categoria = await prisma.categoria.findUnique({
    where: {
      id: idCategoria
    },
    select: {
      id: true,
      nombre: true,
      color: true
    }
  });

  //Agregar información de categoría a artículo
  articulo.idCategoria = categoria;

  return articulo;
  };

//Listar todos los artículos
const listarArticulos = async ()=>{

    //Busca todos los artículos con estado true
    const articulos = await prisma.articulo.findMany({
      where: {
        estado: true
      },
      include: { //Incluye la información de categoría
        categoria: {
          select: {
            id: true,
            nombre: true,
            color: true
          }
        }
      }
    })

    //Formato del JSON de respuesta
    const articulosFormato = articulos.map((articulo) => {
      return {
        id: articulo.id,
        nombre: articulo.nombre,
        tipo_venta: articulo.tipo_venta,
        precio: articulo.precio,
        coste: articulo.coste,
        ref: articulo.ref,
        representacion: articulo.representacion,
        categoria: {
          id: articulo.categoria.id,
          nombre: articulo.categoria.nombre,
          color: articulo.categoria.color
        },
      };
    });

    return articulosFormato;
}

//Listar un artículo con id
const listarArticuloPorId = async (id) => {

    //Buscar artículo con el ID único
    const articulo = await prisma.articulo.findUnique({
      where: {
        id: parseInt(id),
        estado: true
      },
      include: { //Incluye la información de categoría
        categoria: {
          select: {
            id: true,
            nombre: true,
            color: true
          }
        }
      }
    })

  // Consultar la categoría 
  const categoria = await prisma.categoria.findUnique({
    where: {
      id: articulo.id_categoria,
    },
    select: {
      id: true,
      nombre: true,
      color: true
    }
  });

  //Agregar información de categoría a artículo
  articulo.categoria = categoria;

  //Formato del JSON de la respuesta
  const articuloFormato = {
      id: articulo.id,
      nombre: articulo.nombre,
      tipo_venta: articulo.tipo_venta,
      precio: articulo.precio,
      coste: articulo.coste,
      ref: articulo.ref,
      representacion: articulo.representacion,
      categoria: {
        id: articulo.categoria.id,
        nombre: articulo.categoria.nombre,
        color: articulo.categoria.color
    }
  };

  return articuloFormato;
  }

//Modificar un artículo 
const modificarArticulo = async (id, nombre, tipo_venta, precio, coste, ref, representacion, id_categoria, categoriaNueva, nombreCategoria, colorCategoria) => {

    let idCategoria;
  
    //Llama a la función de crearCategoria desde el formulario de Articulo
    if (categoriaNueva) {
      // Crear una nueva categoría desde artículo
      const nuevaCategoria = await CategoriaServicio.crearCategoria(nombreCategoria, colorCategoria);
      idCategoria = nuevaCategoria.insertId;
    } else {
      // Si la categoría ya existe
      idCategoria = id_categoria;
    }

    //Actualiza el nuevo artículo mientras estado true
    const nuevoArticulo = await prisma.articulo.update({
      where: {
        id: parseInt(id),
        estado: true
      },
      data: {
        nombre: nombre,
        tipo_venta: tipo_venta,          
        precio: precio,
        coste: coste,
        ref: ref,
        representacion: representacion,
        id_categoria: Array.isArray(idCategoria) ? idCategoria[0] : idCategoria,
        estado: true
      }
    })

  //Buscar información de categoría con id ingresado
  const categoria = await prisma.categoria.findUnique({
    where: {
      id: nuevoArticulo.id_categoria
    },
    select: {
      id: true,
      nombre: true,
      color: true
    }
  });

  //Agregar información de categoría a artículo
  nuevoArticulo.categoria = categoria;

  return nuevoArticulo;
  }

//Eliminar un artículo
const eliminarArticulo = async (id) => {

  //Establece el estado a false
  const articulo = await prisma.articulo.update({
      where: {
        id: parseInt(id),
        estado: true
      },
      data: {
        estado: false
      }
    })
    return articulo
  }



  module.exports = { 
    crearArticulo, 
    listarArticulos,
    listarArticuloPorId,
    modificarArticulo,
    eliminarArticulo
  }