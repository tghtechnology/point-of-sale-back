import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();




/**
 * Crea una nueva categoría y la guarda en la base de datos.
 * 
 * @param {string} nombre - El nombre de la categoría. No debe estar vacío.
 * @param {string} color - El color asociado a la categoría. No debe estar vacío.
 * 
 * @returns {Object} - Objeto que representa la categoría recién creada. Contiene el ID, el nombre y el color de la categoría.
 * 
 * @throws {Error} - Si el nombre o el color están vacíos, o si la categoría ya existe.
 */
export const crearCategoria = async (nombre, color, usuario_id) => {
  const categoriaExistente = await prisma.categoria.findFirst({
    where:{
      nombre: nombre,
      estado: true
    }
  })

  if (categoriaExistente) {throw new Error("Categoría existente")}

    if (!Object.keys(colorMapping).includes(color)) {
      throw new Error("Color no valido");
    }
    color = colorMapping[color];

    //Obtener el nombre de usuario
    const usuario = await prisma.usuario.findFirst({
      where: {id: usuario_id},
      select: {nombre: true}
    })

    const id_punto = await prisma.puntoDeVenta.findFirst({
      where: {
        estado: true,
        propietario: usuario.nombre
      },
      select: {id: true}
    })

    //Asignar id del punto de venta
    const id_puntoDeVenta = id_punto.id

  const newCategoria = await prisma.categoria.create({
    data: {
      nombre: nombre,
      color: color,
      estado: true,
      id_puntoDeVenta: id_puntoDeVenta
    },
  })

  const categoriaFormato = {
    id: newCategoria.id,
    nombre: newCategoria.nombre,
    color: newCategoria.color,
    id_puntoDeVenta: newCategoria.id_puntoDeVenta
  }
  return categoriaFormato; 
}; 




/**
 * Lista todas las categorías activas en la base de datos.
 * 
 * @returns {Array<Object>} - Una lista de objetos, cada uno representando una categoría. Cada objeto contiene el ID, el nombre y el color de la categoría.
 * 
 * @throws {Error} - Si hay algún error al obtener las categorías de la base de datos.
 */
export const listarCategorias = async (usuario_id)=>{

  const id_puntoDeVenta = await obtenerIdPunto(usuario_id)

  const allCategorias = await prisma.categoria.findMany({
    where: {
      estado: true,
      id_puntoDeVenta: id_puntoDeVenta
    }
  })

  return allCategorias;
}




/**
 * Obtiene la información de una categoría por su ID.
 *
 * @param {number|string} id - El ID de la categoría. No debe estar vacío.
 * 
 * @returns {Object|null} - Un objeto representando la categoría con sus campos: ID, nombre y color. Devuelve `null` si no se encuentra la categoría.
 * 
 * @throws {Error} - Si el campo ID está vacío o es inválido.
 */
export const listarCategoriaPorId = async (id, usuario_id) => {
  
  const id_puntoDeVenta = await obtenerIdPunto(usuario_id)
  const categoria = await prisma.categoria.findUnique({
    where: {
      id: parseInt(id),
      estado: true,
      id_puntoDeVenta: id_puntoDeVenta
    }
  })

  //Si el id no existe
  if (!categoria) {return null}

  return categoria;
} 




/**
 * Modifica una categoría existente en la base de datos.
 * 
 * @param {number|string} id - El ID de la categoría a modificar. No debe estar vacío.
 * @param {string} nombre - El nuevo nombre para la categoría. No debe estar vacío.
 * @param {string} color - El nuevo color para la categoría. No debe estar vacío.
 * 
 * @returns {Object|null} - Objeto representando la categoría modificada con sus campos: ID, nombre y color. Devuelve `null` si la categoría no se encuentra.
 * 
 * @throws {Error} - Si el campo ID está vacío, o si el nombre o color están vacíos, o si ya existe una categoría con el mismo nombre.
 */

export const modificarCategoria = async (id, nombre, color, usuario_id) => {

  const id_puntoDeVenta = await obtenerIdPunto(usuario_id)

    //Buscar si existe una categoría con el id
    const categoriaExistente = await prisma.categoria.findUnique({
      where: {
        id: parseInt(id),
        estado: true,
        id_puntoDeVenta: id_puntoDeVenta
      }
    })

    //Si el id no existe
    if (!categoriaExistente) {return null}

    if (!Object.keys(colorMapping).includes(color)) {
      throw new Error("Color no valido");
    }
    color = colorMapping[color];

  const categoria = await prisma.categoria.update({
    where: {
      id: parseInt(id),
      estado: true,
      id_puntoDeVenta: id_puntoDeVenta
    },
    data: {
      nombre: nombre,
      color: color
    }
  })

  return categoria;
}




/**
 * Elimina (desactiva) una categoría existente en la base de datos cambiando su estado a falso.
 * 
 * @param {number|string} id - El ID de la categoría a eliminar. No debe estar vacío.
 * 
 * @returns {Object|null} - Objeto representando la categoría eliminada. Devuelve `null` si la categoría no se encuentra.
 * 
 * @throws {Error} - Si el campo ID está vacío o si la categoría no se encuentra.
 */

export const eliminarCategoria = async (id, usuario_id) => {

  //Validación campo vacío
  if (id == undefined) {throw new Error("Campo ID vacío")}

  const id_puntoDeVenta = await obtenerIdPunto(usuario_id)
  //Buscar si existe una categoría con el id
  const categoriaExistente = await prisma.categoria.findUnique({
    where: {
      id: parseInt(id),
      estado: true,
      id_puntoDeVenta: id_puntoDeVenta
    }
  })

  //Si el id no existe
  if (!categoriaExistente) {return null}

  const categoria = await prisma.categoria.update({
    where: {
      id: parseInt(id),
      estado: true,
      id_puntoDeVenta: id_puntoDeVenta
    },
    data: {
      estado: false
    }
  })
  return categoria
}


//Mapeo de colores de hexadecimal a string
const colorMapping = {
  '#FF0000': 'Rojo',
  '#00FF00': 'Verde_limon',
  '#0000FF': 'Azul',
  '#FFFF00': 'Amarillo',
  '#00FFFF': 'Turquesa',
  '#FF00FF': 'Fucsia',
  '#C0C0C0': 'Gris_claro',
  '#808080': 'Gris_oscuro',
};

const obtenerIdPunto = async (usuario_id) => {
  const usuario = await prisma.usuario.findFirst({
    where: {id: usuario_id},
    select: {nombre: true}
  })

  const id_punto = await prisma.puntoDeVenta.findFirst({
    where: {
      estado: true,
      propietario: usuario.nombre
    },
    select: {id: true}
  })

  //Asignar id del punto de venta
  const id_puntoDeVenta = parseInt(id_punto.id)

  return id_puntoDeVenta;
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
