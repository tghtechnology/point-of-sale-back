import { PrismaClient } from "@prisma/client";
import * as CategoriaServicio from "../Services/CategoriaServicio"

const prisma = new PrismaClient();

//Crear un nuevo artículo
export const crearArticulo = async (nombre, tipo_venta, precio, coste, ref, representacion, nombre_categoria, categoriaNueva) => {
  
  let text_id = stringTransform(nombre)

  /*if (categoriaNueva) {
    // Crear una nueva categoría desde artículo
    const nuevaCategoria = await CategoriaServicio.crearCategoria(nombre_categoria, color_categoria);
    NombreCategoria = nuevaCategoria.nombre;
  } */

  //Se crea el nuevo artículo
  const articulo = await prisma.articulo.create({
    data: {
      text_id: text_id,
      nombre: nombre,
      tipo_venta: tipo_venta,          
      precio: precio,
      coste: coste,
      ref: ref,
      representacion: representacion,
      nombre_categoria: nombre_categoria,
      estado: true
    }
  })

  const categoria = await prisma.categoria.findUnique({
    where: {
      text_id: nombre_categoria 
    },
    select: {
      text_id: text_id,
      nombre: true,
      color: true
    }
  });
  
const categoriaFormato = {
  text_id: text_id,
  nombre: categoria.nombre,
  color: categoria.color
}

const articuloFormato = {
    text_id: text_id,
    nombre: articulo.nombre,
    tipo_venta: articulo.tipo_venta,
    precio: articulo.precio,
    coste: articulo.coste,
    ref: articulo.ref,
    representacion: articulo.representacion,
    categoria: categoriaFormato
  };

console.log(articuloFormato)

return articuloFormato;
};

//Listar todos los artículosS
const listarArticulos = async ()=>{

    //Busca todos los artículos con estado true
    const articulos = await prisma.articulo.findMany({
      where: {
        estado: true
      },
      include: { //Incluye la información de categoría
        categoria: true
      },
    }) 

    const articulosFormato = articulos.map(articulo => {

        const categoria = articulo.categoria
        const categoriaFormateada = {
          text_id: categoria.text_id,
          nombre: categoria.nombre,
          color: categoria.color
        } 

        return {
        text_id: articulo.text_id,
        nombre: articulo.nombre,
        tipo_venta: articulo.tipo_venta,
        precio: articulo.precio,
        coste: articulo.coste,
        ref: articulo.ref,
        representacion: articulo.representacion,
        categoria: categoriaFormateada
        }
    });

    return articulosFormato;
}

//Listar un artículo con id
const listarArticuloPorId = async (text_id) => {

    //Buscar artículo con el ID único
    const articulo = await prisma.articulo.findUnique({
      where: {
        text_id: text_id,
        estado: true
      },
      include: { //Incluye la información de categoría
        categoria: {
          select: {
            text_id: true,
            nombre: true,
            color: true
          }
        }
      }
    })
    
    //Validación de existencia de artículo
    if(articulo == null) {
      return false
    }

    const categoria = articulo.categoria
    const categoriaFormateada = {
      text_id: text_id,
      nombre: categoria.nombre,
      color: categoria.color
    } 

  //Formato del JSON de la respuesta
  const articuloFormato = {
      text_id: text_id,
      nombre: articulo.nombre,
      tipo_venta: articulo.tipo_venta,
      precio: articulo.precio,
      coste: articulo.coste,
      ref: articulo.ref,
      representacion: articulo.representacion,
      categoria: categoriaFormateada
  };

  return articuloFormato;
  }

//Modificar un artículo 
const modificarArticulo = async (text_id, nombre, tipo_venta, precio, coste, ref, representacion, nombre_categoria, color_categoria, categoriaNueva) => {

    const articuloExistente = await prisma.articulo.findUnique({
      where: {
          text_id: text_id
      }
  });

  // Si no existe el artículo, devuelve false
  if (!articuloExistente) {
      return null;
  }

    //Actualiza el nuevo artículo 
    const nuevoArticulo = await prisma.articulo.update({
      where: {
        text_id: text_id,
        estado: true
      },
      data: {
        text_id: text_id = stringTransform(nombre),
        nombre: nombre,
        tipo_venta: tipo_venta,          
        precio: precio,
        coste: coste,
        ref: ref,
        representacion: representacion,
        nombre_categoria: nombre_categoria,
        estado: true
      }
    })

  //Buscar información de categoría con nombre ingresado
  const categoria = await prisma.categoria.findUnique({
    where: {
      text_id: nombre_categoria 
    },
    select: {
      text_id: text_id,
      nombre: true,
      color: true
    }
  });
  
const categoriaFormato = {
  text_id: text_id,
  nombre: categoria.nombre,
  color: categoria.color
}
  
  const articuloModificadoFormato = {
      text_id: nuevoArticulo.text_id,
      nombre: nuevoArticulo.nombre,
      tipo_venta: nuevoArticulo.tipo_venta,
      precio: nuevoArticulo.precio,
      coste: nuevoArticulo.coste,
      ref: nuevoArticulo.ref,
      representacion: nuevoArticulo.representacion,
      categoria: categoriaFormato
    };
  return articuloModificadoFormato;
  }

//Eliminar un artículo
const eliminarArticulo = async (text_id) => {

  //Establece el estado a false
  const articulo = await prisma.articulo.delete({
      where: {
        text_id: text_id,
        estado: true
      },
    })
    return articulo
  }


//Función para obtener los datos de categoría por nombre
const obtenerCategoria = async (nombre_categoria) => {
const categoria = prisma.categoria.findUnique({
  where: {
    nombre: nombre_categoria
  },
  select: {
    id: true,
    nombre: true,
    color: true
  }
})
return categoria
}

function stringTransform (nombre) {
  nombre = nombre.toLowerCase().replace(/\s+/g, "_").replace(/[^\w\s]/g, "")
  return nombre
} 


  module.exports = { 
    crearArticulo, 
    listarArticulos,
    listarArticuloPorId,
    modificarArticulo,
    eliminarArticulo
  }