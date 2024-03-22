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
  //nombre = categoria.text_id

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

  const categoria = await prisma.categoria.findUnique({
    where: {
      text_id: text_id,
      estado: true
    },
  })

  if (categoria == null) {
    return null
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
      color: color,
      text_id: nombre
    }
  })

  text_id = nombre

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

