import { connect } from "../database";
import { PrismaClient } from "@prisma/client";
import * as CategoriaServicio from "../Services/CategoriaServicio"

const prisma = new PrismaClient();

const crearArticulo = async (nombre, tipo_venta, precio, coste, ref, representacion, id_categoria, categoriaNueva) => {
    const connection = await connect();
  
    let idCategoria;
  
    if (categoriaNueva) {
      // Crear una nueva categoría desde artículo
      const nuevaCategoria = await CategoriaServicio.crearCategoria(nombreCategoria, colorCategoria);
      idCategoria = nuevaCategoria.insertId;
    } else {
      // Si la categoría ya existe
      idCategoria = id_categoria;
    }

    const articulo = await prisma.articulo.create({
      data: {
        nombre: nombre,
        tipo_venta: tipo_venta,          
        precio: precio,
        coste: coste,
        ref: ref,
        representacion: representacion,
        id_categoria: idCategoria,
        estado: true
      }
    })
  
    
    return articulo;
  };

const listarArticulos = async ()=>{
    const connection = await connect();

    const articulos = await prisma.articulo.findMany({
      where: {
        estado: true
      }
    })
    return articulos;
  }

  const listarArticuloPorId = async (id) => {
    const connection = await connect();
    const [results] = await connection.execute(
      "SELECT id, nombre, tipo_venta, precio, coste, ref, representacion, id_categoria FROM articulo WHERE id = ? AND estado = true", [id])

  const articulo = results[0];

  const [categoriaResults] = await connection.execute(
    "SELECT id, nombre, color FROM categoria WHERE id = ? AND estado = true", [articulo.id_categoria]);

  articulo.categoria = categoriaResults[0];
    return articulo;
  }

  const modificarArticulo = async (id, nombre, tipo_venta, precio, coste, ref, representacion, id_categoria) => {
    const connection = await connect();
  
    const [results] = await connection.query("UPDATE articulo SET nombre = ?, tipo_venta = ?, precio = ?, coste = ?, ref = ?, representacion = ?, id_categoria = ? WHERE id = ? AND estado = true" ,
    [nombre, tipo_venta, precio, coste, ref, representacion, id_categoria, id])
    return results;
  }

  const eliminarArticulo = async (id) => {
    const connection = await connect();
    await connection.execute(
      'UPDATE articulo SET estado = false WHERE id = ?',[id]
    );
  }



  module.exports = { 
    crearArticulo, 
    listarArticulos,
    listarArticuloPorId,
    modificarArticulo,
    eliminarArticulo
  }