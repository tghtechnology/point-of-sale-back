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
export const crearCategoria = async (nombre, color) => {

  const categoriaExistente = await prisma.categoria.findFirst({
    where:{
      nombre: nombre,
      estado: true
    }
  })

  if (categoriaExistente) {throw new Error("Categoría existente")}
  console.log(color)

   if (!Object.keys(colorMapping).includes(color)) {
      throw new Error("Color no valido");
    }
    color = colorMapping[color];

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




/**
 * Lista todas las categorías activas en la base de datos.
 * 
 * @returns {Array<Object>} - Una lista de objetos, cada uno representando una categoría. Cada objeto contiene el ID, el nombre y el color de la categoría.
 * 
 * @throws {Error} - Si hay algún error al obtener las categorías de la base de datos.
 */
export const listarCategorias = async () => {
  const allCategorias = await prisma.categoria.findMany({
    where: {
      estado: true
    }
  });

  const categoriasFormato = allCategorias.map((categoria) => {
    return {
      id: categoria.id,
      nombre: categoria.nombre,
      color: nameToHexMapping[categoria.color] // Convertir a hexadecimal
    };
  });

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
export const listarCategoriaPorId = async (id) => {

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
export const modificarCategoria = async (id, nombre, color) => {
  console.log(color)
  // Verificar si el color proporcionado es válido
  if (!Object.keys(colorMapping).includes(color)) {
    console.log(color)
    throw new Error("Color no válido");
  }

  // Obtener el valor hexadecimal correspondiente al nombre del color
  const colorHex = colorMapping[color];

  // Actualizar la categoría en la base de datos
  const categoria = await prisma.categoria.update({
    where: {
      id: parseInt(id),
      estado: true
    },
    data: {
      nombre: nombre,
      color: colorHex // Usar el valor hexadecimal del color
    }
  });

  const categoriaFormato = {
    id: categoria.id,
    nombre: categoria.nombre,
    color: categoria.color,
    id_puntoDeVenta: categoria.id_puntoDeVenta
  }
  return categoriaFormato;
};






/**
 * Elimina (desactiva) una categoría existente en la base de datos cambiando su estado a falso.
 * 
 * @param {number|string} id - El ID de la categoría a eliminar. No debe estar vacío.
 * 
 * @returns {Object|null} - Objeto representando la categoría eliminada. Devuelve `null` si la categoría no se encuentra.
 * 
 * @throws {Error} - Si el campo ID está vacío o si la categoría no se encuentra.
 */

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