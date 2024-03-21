import { PrismaClient } from "@prisma/client";
import * as CategoriaServicio from "../Services/CategoriaServicio"

const prisma = new PrismaClient();

//Crear un nuevo artículo
const crearArticulo = async (nombre, tipo_venta, precio, coste, ref, representacion, nombre_categoria, categoriaNueva) => {
  
  let NombreCategoria;

  if (categoriaNueva) {
    // Crear una nueva categoría desde artículo
    const nuevaCategoria = await CategoriaServicio.crearCategoria(nombre_categoria, color_categoria);
    NombreCategoria = nuevaCategoria.nombre;
  } else {
    // Si la categoría ya existe
    //NombreCategoria = nombre_categoria;
  }

  /*if(nombre_categoria == "Sin categoría") {
    NombreCategoria = "Sin categoría"
  }*/

  //Se crea el nuevo artículo
  const articulo = await prisma.articulo.create({
    data: {
      nombre: nombre,
      tipo_venta: tipo_venta,          
      precio: precio,
      coste: coste,
      ref: ref,
      representacion: representacion,
      nombre_categoria: nombre_categoria, //NombreCategoria
      estado: true
    }
  })

// Consultar la categoría 
const categoria = await prisma.categoria.findUnique({
  where: {
    nombre: nombre_categoria //? NombreCategoria : "Sin categoría"
  },
  select: {
    id: true,
    nombre: true,
    color: true
  }
});

let categoriaFormateada = categoria

  if (categoria) {
    categoriaFormateada = {
      id: categoria.id,
      nombre: categoria.nombre,
      color: categoria.color
    };
  }

const articuloFormato = {
    id: articulo.id,
    nombre: articulo.nombre,
    tipo_venta: articulo.tipo_venta,
    precio: articulo.precio,
    coste: articulo.coste,
    ref: articulo.ref,
    representacion: articulo.representacion,
    categoria: categoriaFormateada ? categoriaFormateada : "Sin categoría"
  };


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
        const categoriaFormateada = categoria !== null ? {
          id: categoria.id,
          nombre: categoria.nombre,
          color: categoria.color
        } : "Sin categoría"

        return {
        id: articulo.id,
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
    
    if(articulo == null) {
      return false
    }

    const categoria = articulo.categoria
    const categoriaFormateada = categoria ? {
      id: categoria.id,
      nombre: categoria.nombre,
      color: categoria.color
    } : "Sin categoría"

  //Formato del JSON de la respuesta
  const articuloFormato = {
    
      id: articulo.id,
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
const modificarArticulo = async (id, nombre, tipo_venta, precio, coste, ref, representacion, nombre_categoria, color_categoria, categoriaNueva) => {

    let NombreCategoria;

  
    //Llama a la función de crearCategoria desde el formulario de Articulo
    if (categoriaNueva) {
      // Crear una nueva categoría desde artículo
      const nuevaCategoria = await CategoriaServicio.crearCategoria(nombre_categoria, color_categoria);
      NombreCategoria = nuevaCategoria.nombre;
    } else {
      // Si la categoría ya existe
      NombreCategoria = nombre_categoria;
    }

    const existeArticulo = await prisma.articulo.findUnique({
      where: {
          id: parseInt(id)
      }
  });

  // Si no existe el artículo, devuelve false
  if (!existeArticulo) {
      return null;
  }

    //Actualiza el nuevo artículo 
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
        nombre_categoria: nombre_categoria,
        estado: true
      }
    })

    console.log(nuevoArticulo)

  //Buscar información de categoría con nombre ingresado
  const categoria = await prisma.categoria.findUnique({
    where: {
      nombre: NombreCategoria
    },
    select: {
      id: true,
      nombre: true,
      color: true
    }
  });

  let categoriaFormateada = categoria
  
    if (categoria) {
      categoriaFormateada = {
        id: categoria.id,
        nombre: categoria.nombre,
        color: categoria.color
      };
    }
  
  const articuloModificadoFormato = {
      id: nuevoArticulo.id,
      nombre: nuevoArticulo.nombre,
      tipo_venta: nuevoArticulo.tipo_venta,
      precio: nuevoArticulo.precio,
      coste: nuevoArticulo.coste,
      ref: nuevoArticulo.ref,
      representacion: nuevoArticulo.representacion,
      //categoria: { connect: { nombre: NombreCategoria } }
      categoria: categoriaFormateada ? categoriaFormateada : "Sin categoría"
    };

  //Agregar información de categoría a artículo
  //nuevoArticulo.categoria = categoria;

  return articuloModificadoFormato;
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


  module.exports = { 
    crearArticulo, 
    listarArticulos,
    listarArticuloPorId,
    modificarArticulo,
    eliminarArticulo
  }