import { PrismaClient } from "@prisma/client";
import * as CategoriaServicio from "../Services/CategoriaServicio";

const prisma = new PrismaClient();

//Crear un nuevo artículo
export const crearArticulo = async (nombre, tipo_venta, precio, ref, color, imagen, id_categoria) => {

  //Validación campos vacíos
  if (!nombre || nombre.length < 1) {throw new Error("Campo nombre vacío")}
  if (!tipo_venta || tipo_venta.length < 1) {throw new Error("Campo tipo_venta vacío")}
  if (!precio || precio.length < 1) {throw new Error("Campo precio vacío")}
  //if (!representacion || representacion.length < 1) {throw new Error("Campo representación vacío")}1

  //Validación tipo de dato de precio
  //if (typeof precio !== 'number' || isNaN(parseFloat(precio)) || !isFinite(precio)) {throw new Error("Precio no es número válido")}

  //Validación tipo de venta
  const TiposPermitidos = ['Peso', 'Unidad'];
  if (!TiposPermitidos.includes(tipo_venta)) {throw new Error("Tipo de venta no válido");}

  let categoria = await buscarCategoria(id_categoria);

  const newArticulo = await prisma.articulo.create({
    data: {
      nombre: nombre,
      tipo_venta: tipo_venta,
      precio: Number(precio),
      ref: ref,
      color: color,
      imagen: imagen,
      id_categoria: parseInt(id_categoria),
      estado: true
    },
  })

if (id_categoria == "" || categoria == null) {
  const articuloSincatFormato = {
    id: newArticulo.id,
    nombre: newArticulo.nombre,
    tipo_venta: newArticulo.tipo_venta,
    precio: newArticulo.precio,
    ref: newArticulo.ref,
    color: newArticulo.color,
    imagen: newArticulo.imagen,
    categoria: "Sin categoría"
  }
  return articuloSincatFormato;
} else {
  const articuloFormato = {
    id: newArticulo.id,
    nombre: newArticulo.nombre,
    tipo_venta: newArticulo.tipo_venta,
    precio: Number(newArticulo.precio),
    ref: newArticulo.ref,
    color: newArticulo.color,
    imagen: newArticulo.imagen,
  }
  return articuloFormato; 
}
  
}; 

export const listarArticulos = async ()=>{

  const articulos = await prisma.articulo.findMany({
    where: {
      estado: true
    },
    include: {
      categoria: true
    }
  })

  // Mapear los artículos a un formato deseado
  const articulosFormato = articulos.map((articulo) => {
    // Verificar si la categoría está presente y activa
    const categoria = articulo.categoria && articulo.categoria.estado ? {
      id: articulo.categoria.id,
      nombre: articulo.categoria.nombre,
      color: articulo.categoria.color,
    } : "Sin categoría";

    return {
      id: articulo.id,
      nombre: articulo.nombre,
      tipo_venta: articulo.tipo_venta,
      precio: articulo.precio,
      ref: articulo.ref,
      color: articulo.color,
      imagen: articulo.imagen,
      categoria: categoria,
    };
  });

  return articulosFormato;
}

export const listarArticuloPorId = async (id) => {

  const articulo = await prisma.articulo.findUnique({
    where: {
      id: parseInt(id),
      estado: true
    },
    include: {
      categoria: true
    }
  })

  //Si el id no existe
  if (!articulo) {return null}

  // Verificar si la categoría está presente y activa
  const categoria = articulo.categoria && articulo.categoria.estado ? {
    id: articulo.categoria.id,
    nombre: articulo.categoria.nombre,
    color: articulo.categoria.color,
  } : "Sin categoría";

  const articuloFormato = {
    id: articulo.id,
    nombre: articulo.nombre,
    tipo_venta: articulo.tipo_venta,
    precio: articulo.precio,
    ref: articulo.ref,
    color: articulo.color,
    imagen: articulo.imagen,
    categoria: categoria,
  };
  return articuloFormato;
} 

export const modificarArticulo = async (id, nombre, tipo_venta, precio, ref, color, imagen, id_categoria) => {

  if (!nombre || nombre.length < 1) {throw new Error("Campo nombre vacío")}
  if (!tipo_venta || tipo_venta.length < 1) {throw new Error("Campo tipo_venta vacío")}
  if (!precio || precio.length < 1) {throw new Error("Campo precio vacío")}

  //Validación tipo de dato de precio
  //if (typeof precio !== 'number' || isNaN(parseFloat(precio)) || !isFinite(precio)) {throw new Error("Precio no es número válido")}

  //Validación tipo de venta
  const TiposPermitidos = ['Peso', 'Unidad'];
  if (!TiposPermitidos) {throw new Error("Tipo de venta no válido")}

  //Buscar si existe un artículo con el id
  const articuloExistente = await prisma.articulo.findUnique({
    where: {
      id: parseInt(id),
      estado: true
    }
  })

  //Si el id no existe
  if (!articuloExistente) {return null}

  const categoria = await buscarCategoria(id_categoria);

const articulo = await prisma.articulo.update({
  where: {
    id: parseInt(id),
    estado: true
  },
  data: {
    nombre: nombre,
    tipo_venta: tipo_venta,
    precio: Number(precio),
    ref: ref,
    color: color,
    imagen: imagen,
    id_categoria: parseInt(id_categoria),
  }
})

const articuloFormato = {
  id: articulo.id,
  nombre: articulo.nombre,
  tipo_venta: articulo.tipo_venta,
  precio: Number(articulo.precio),
  ref: articulo.ref,
  color: articulo.color,
  imagen: articulo.imagen,
  categoria: categoria,
}

return articuloFormato;
}

export const eliminarArticulo = async (id) => {

  //Buscar si existe un artículo con el id
  const articuloExistente = await prisma.articulo.findUnique({
    where: {
      id: parseInt(id),
      estado: true
    }
  })

  //Si el id no existe
  if (!articuloExistente) {return null}

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


//Función para buscar una categoría por id
const buscarCategoria = async (id_categoria) => {

  if (id_categoria === "") {return null}
  const categoriaExistente = await prisma.categoria.findUnique({
    where: {
      id: parseInt(id_categoria),
      estado: true
    }
  })

  if(!categoriaExistente) {throw new Error("Categoría inexistente")}

  const categoriaFormato = {
    id: categoriaExistente.id,
    nombre: categoriaExistente.nombre,
    color: categoriaExistente.color
  }
  return categoriaFormato
}