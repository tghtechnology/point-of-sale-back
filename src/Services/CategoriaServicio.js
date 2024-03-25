import { connect } from "../database";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const crearCategoria = async (nombre, color) => {

  let text_id = stringTransform(nombre)
 
  const categoria = await prisma.categoria.create({
    data: {
      text_id: text_id,
      nombre: nombre, 
      color: color,
      estado: true
    }
  })
  
  const categoriaFormato = {
    text_id: text_id,
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
      text_id: categoria.text_id,
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
    text_id: categoria.text_id,
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
      text_id: text_id = stringTransform(nombre)
    }
  })

  const categoriaFormato = {
    text_id: text_id,
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

function stringTransform (nombre) {
  nombre = nombre.toLowerCase().replace(/\s+/g, "_").replace(/[^\w\s]/g, "")
  return nombre
} 


module.exports = { 
  crearCategoria, 
  listarCategorias,
  listarCategoriaPorId,
  modificarCategoria,
  eliminarCategoria
}

