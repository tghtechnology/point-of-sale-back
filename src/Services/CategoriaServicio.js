import { desasociarArticulo } from "../Middleware/DesvCategoria";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Función para obtener el nombre de color correspondiente al valor hexadecimal
const getColorName = (hex) => {
  for (const key in colorMapping) {
    if (colorMapping[key] === hex) {
      return key;
    }
  }
  throw new Error('Color no válido');
};


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
  const id_puntoDeVenta = await obtenerIdPunto(usuario_id);

  if (!Object.keys(colorMapping).includes(color)) {
    throw new Error("Color no válido");
  }

  const colorHex = colorMapping[color];

  

  const newCategoria = await prisma.categoria.create({
    data: {
      nombre: nombre,
      color: colorHex,
      estado: true,
      id_puntoDeVenta: id_puntoDeVenta
    },
  });

  const categoriaFormato = {
    id: newCategoria.id,
    nombre: newCategoria.nombre,
    color: color, 
    id_puntoDeVenta: newCategoria.id_puntoDeVenta
  };

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

  const categoriasFormato = allCategorias.map((categoria) => {
    return {
      id: categoria.id,
      nombre: categoria.nombre,
      color: nameToHexMapping[categoria.color] 
    };
  });
  console.log(categoriasFormato)

  return categoriasFormato;
};




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
    console.log(color)
    if (!Object.keys(colorMapping).includes(color)) {
      console.log(color)
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
  const categoriaFormato = {
    id: categoria.id,
    nombre: categoria.nombre,
    color: categoria.color,
    id_puntoDeVenta: categoria.id_puntoDeVenta
  }
  return categoriaFormato;

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
  const categoriaExistente = await prisma.categoria.findFirst({
    where: {
      id: parseInt(id),
      estado: true,
      id_puntoDeVenta: id_puntoDeVenta
    }
  })

  //Si el id no existe
  if (!categoriaExistente) {return null}

  await desasociarArticulo(parseInt(id))

  const categoria = await prisma.categoria.update({
    where: {
      id: parseInt(id),
      estado: true,
      id_puntoDeVenta: id_puntoDeVenta
    },
    data: {
      estado: false,
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
// Mapeo de colores de nombres a hexadecimal
const nameToHexMapping = {
  'Rojo': '#FF0000',
  'Verde_limon': '#00FF00',
  'Azul': '#0000FF',
  'Amarillo': '#FFFF00',
  'Turquesa': '#00FFFF',
  'Fucsia': '#FF00FF',
  'Gris_claro': '#C0C0C0',
  'Gris_oscuro': '#808080',
};

/**
 * Obtiene el ID del punto de venta asociado a un usuario.
 *
 * @param {number|string} usuario_id - El ID del usuario para el que se quiere obtener el ID del punto de venta.
 * @returns {number} - El ID del punto de venta asociado al usuario.
 * @throws {Error} - Si no se encuentra el usuario o no está asociado a un punto de venta.
 */
const obtenerIdPunto = async (usuario_id) => {
  const usuario = await prisma.usuario.findFirst({
    where: { id: usuario_id
     },
    select: { id_puntoDeVenta: true }
  });
  const punto=usuario.id_puntoDeVenta
  const usuarioExistente = await prisma.usuario.findFirst({
    where: { id: usuario_id,
      id_puntoDeVenta:punto
     },
    select: { id_puntoDeVenta: true }
  });

  if (!usuarioExistente) {
    throw new Error("Usuario no encontrado");
  }

  return usuarioExistente.id_puntoDeVenta;
};

