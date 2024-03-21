import { connect } from "../database";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const crearCategoria = async (nombre, color) => {
 
  const categoria = await prisma.categoria.create({
    data: {
      nombre: nombre,
      color: color,
      estado: true
    }
  })

  const categoriaFormato = {
    id: categoria.id,
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
      id: categoria.id,
      nombre: categoria.nombre,
      color: categoria.color
    };
  });
   return categoriasFormato;
}

const listarCategoriaPorId = async (nombre) => {

  const categoria = await prisma.categoria.findUnique({
    where: {
      nombre: nombre,
      estado: true
    },
  })

  if (categoria == null) {
    return false
  }
  
  const categoriaFormato = {
    id: categoria.id,
    nombre: categoria.nombre ? categoria.nombre : "Sin categoría",
    color: categoria.color
};

return categoriaFormato;
}

const modificarCategoria = async (nombre_as_id, nombre, color) => {
  
  const categoria = await prisma.categoria.update({
    where: {
      nombre: nombre_as_id,
      estado: true
    },
    data: {
      nombre: nombre,
      color: color
    }
  })

  const categoriaFormato = {
    id: categoria.id,
    nombre: categoria.nombre,
    color: categoria.color
};
  return categoriaFormato;
}

const eliminarCategoria = async (nombre_as_id) => {

  const categoria = await prisma.categoria.update({
    where: {
      nombre: nombre_as_id,
      estado: true
    },
    data: {
      estado: false
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

