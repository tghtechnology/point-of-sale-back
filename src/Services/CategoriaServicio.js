import { connect } from "../database";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const crearCategoria = async (nombre, color) => {
 
  const categoria = await prisma.categoria.create({
    data: {
      text_id: nombre,
      nombre: nombre, 
      color: color,
      estado: true
    }
  })

  const categoriaFormato = {
    nombre: categoria.nombre,
    color: categoria.color
  }
  return categoriaFormato; 
}


const listarCategorias = async ()=>{
  
  //Busca todos los artículos con estado true
  const categorias = await prisma.categoria.findMany({
    where: {
      estado: true
    }
  })

  const categoriasFormato = categorias.map((categoria) => {
    return {
      nombre: categoria.nombre,
      color: categoria.color
    };
  });
   return categoriasFormato;
}

const listarCategoriaPorId = async (text_id) => {

  let sinCat = "Sin categoría"
  if(text_id == sinCat) {
    return null
  }

  const categoria = await prisma.categoria.findUnique({
    where: {
      text_id: text_id,
      estado: true
    },
  })

  if (categoria == null) {
    return false
  }
  
  const categoriaFormato = {
    nombre: categoria.nombre,
    color: categoria.color
};

return categoriaFormato;
}

const modificarCategoria = async (text_id, nombre, color) => {
  
  const categoria = await prisma.categoria.update({
    where: {
      text_id: text_id,
      estado: true
    },
    data: {
      nombre: nombre,
      color: color
    }
  })

  nombre = text_id

  const categoriaFormato = {
    nombre: categoria.nombre,
    color: categoria.color
};
  return categoriaFormato;
}

const eliminarCategoria = async (text_id) => {

  const categoria = await prisma.categoria.delete({
    where: {
      text_id: text_id,
      estado: true
    }
  })
  return categoria
}


module.exports = { 
  crearCategoria, 
  listarCategorias,
  listarCategoriaPorId,
  modificarCategoria,
  eliminarCategoria
}

