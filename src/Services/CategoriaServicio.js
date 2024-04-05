import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

//Crear una categoría nueva
export const crearCategoria = async (nombre, color) => {

  //Validación campos vacíos
  if (!nombre || nombre.length < 1) {throw new Error("Campo nombre vacío")}
  if (!color || color.length < 1) {throw new Error("Campo color vacío")}

  const categoriaExistente = await prisma.categoria.findFirst({
    where:{
      nombre: nombre,
      estado: true
    }
  })

  if (categoriaExistente) {throw new Error("Categoría existente")}

  const newCategoria = await prisma.categoria.create({
    data: {
      nombre: nombre,
      color: color,
      estado: true
    },
  })

  const categoriaFormato = {
    id: newCategoria.id,
    nombre: newCategoria.nombre,
    color: newCategoria.color
  }
  return categoriaFormato; 
}; 

export const listarCategorias = async ()=>{

  const allCategorias = await prisma.categoria.findMany({
    where: {
      estado: true
    }
  })

  const categoriasFormato = allCategorias.map((categoria) => {
    return {
      id: categoria.id,
      nombre: categoria.nombre,
      color: categoria.color
    };
  });
  return categoriasFormato;
}

export const listarCategoriaPorId = async (id) => {

  //Validación campo vacío
  if (id == undefined) { throw new Error("Campo ID vacío")}

  const categoria = await prisma.categoria.findUnique({
    where: {
      id: parseInt(id),
      estado: true
    }
  })

  //Si el id no existe
  if (!categoria) {return null}

  const categoriaFormato = {
    id: categoria.id,
    nombre: categoria.nombre,
    color: categoria.color
}
  return categoriaFormato;
} 

export const modificarCategoria = async (id, nombre, color) => {

    //Validación campos vacíos
    if (id == undefined) {throw new Error("Campo ID vacío")}
    if (!nombre || nombre.length < 1) {throw new Error("Campo nombre vacío")}
    if (!color || color.length < 1) {throw new Error("Campo color vacío")}

    //Buscar si existe una categoría con el nombre
    const categoriaExistenteNombre = await prisma.categoria.findFirst({
      where:{
        nombre: nombre,
        estado: true
      }
    })
  
    if (categoriaExistenteNombre) {throw new Error("Categoría existente")}

    //Buscar si existe una categoría con el id
    const categoriaExistente = await prisma.categoria.findUnique({
      where: {
        id: parseInt(id),
        estado: true
      }
    })

    //Si el id no existe
    if (!categoriaExistente) {return null}

  const categoria = await prisma.categoria.update({
    where: {
      id: parseInt(id),
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
  }
  return categoriaFormato;
}

export const eliminarCategoria = async (id) => {

  //Validación campo vacío
  if (id == undefined) {throw new Error("Campo ID vacío")}

  //Buscar si existe una categoría con el id
  const categoriaExistente = await prisma.categoria.findUnique({
    where: {
      id: parseInt(id),
      estado: true
    }
  })

  //Si el id no existe
  if (!categoriaExistente) {return null}

  const categoria = await prisma.categoria.update({
    where: {
      id: parseInt(id),
      estado: true
    },
    data: {
      estado: false
    }
  })
  return categoria
}

/*export const buscarCategoria = async (search) => {
    //const page = parseInt(req.query.page) - 1 || 0;

    const categorias = await prisma.categoria.findMany({
      where: {
        nombre: {
            contains: search
            //mode: "insensitive"
        }
    }
    })

    const total = categorias.length;
    /*const total = await prisma.categoria.countDocuments({
      where: {
        nombre: {
            contains: search
            //mode: "insensitive"
        }
    }
    })

    const result = {
      total,
      categorias
    }
    return result*/