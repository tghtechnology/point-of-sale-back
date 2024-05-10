import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


/**
 * Crea un nuevo artículo y lo guarda en la base de datos.
 * 
 * @param {string} nombre - El nombre del artículo. No debe estar vacío.
 * @param {string} tipo_venta - El tipo de venta (Peso o Unidad). Debe ser uno de los valores permitidos.
 * @param {number|string} precio - El precio del artículo. Debe ser un número y no estar vacío.
 * @param {string} representacion - Forma de representar el artículo (color o imagen). Debe ser uno de estos valores.
 * @param {string|null} color - El color del artículo. Requerido si la representación es por color.
 * @param {string|null} imagen - La URL de la imagen del artículo. Requerido si la representación es por imagen.
 * @param {number|string|null} id_categoria - El ID de la categoría del artículo. Puede estar vacío ya que un artículo puede pertenecer a ninguna categoría.
 * 
 * @returns {Object} - Objeto representando el artículo creado y formateado (muestra solo los datos necesarios).
 * @throws {Error} - Si algún campo es inválido o está vacío.
 */
export const crearArticulo = async (nombre, tipo_venta, precio, representacion, color, imagen, id_categoria) => {

  //Validación campos vacíos
  if (!nombre || nombre.length < 1) {throw new Error("Campo nombre vacío")}
  if (!tipo_venta || tipo_venta.length < 1) {throw new Error("Campo tipo_venta vacío")}
  if (!precio || precio.length < 1) {throw new Error("Campo precio vacío")}

  //Validación tipo de venta
  const TiposPermitidos = ['Peso', 'Unidad'];
  if (!TiposPermitidos.includes(tipo_venta)) {throw new Error("Tipo de venta no válido");}

  let categoria = await buscarCategoria(id_categoria);

  if (representacion !== 'color' && representacion !== 'imagen') {throw new Error("Representacion no valida")}

  //Validacion colores
    if (representacion === 'color') {
      if (!Object.keys(colorMapping).includes(color)) {
        throw new Error("Color no valido");
      }
      color = colorMapping[color];
    }

  //Generar ref
  const ref = await generarRef(ref)

  const newArticulo = await prisma.articulo.create({
    data: {
      nombre: nombre,
      tipo_venta: tipo_venta,
      precio: Number(precio),
      ref: ref,
      representacion: representacion,
      color: representacion === 'color' ? color : null,
      imagen: representacion === 'imagen' ? imagen : null,
      id_categoria: id_categoria ? parseInt(id_categoria) : null,
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





/**
 * Lista todos los artículos activos
 * 
 * @returns {Array} - Una lista de objetos representando los artículos activos y sus detalles necesarios.
 * Cada objeto contiene la siguiente información:
 *  - {number} id - El ID único del artículo.
 *  - {string} nombre - El nombre del artículo.
 *  - {string} tipo_venta - El tipo de venta (Peso o Unidad).
 *  - {number} precio - El precio del artículo.
 *  - {string} ref - Referencia única para el artículo.
 *  - {string|null} color - El color del artículo (si aplica).
 *  - {string|null} imagen - La URL de la imagen del artículo (si aplica).
 *  - {Object|string} categoria - La información de la categoría a la que pertenece el artículo.
 *     - Si el artículo tiene una categoría, el objeto contiene:
 *        - {number} id - El ID de la categoría.
 *        - {string} nombre - El nombre de la categoría.
 *        - {string} color - El color de la categoría.
 *     - Si el artículo no tiene una categoría o la categoría no está activa, devuelve "Sin categoría".
 * 
 * @throws {Error} - Si ocurre algún error durante la consulta a la base de datos.
 */
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





/**
 * Obtiene la información detallada de un artículo por su ID.
 * 
 * @param {number|string} id - El ID del artículo a buscar.
 * @returns {Object|null} - Devuelve un objeto que representa el artículo con su información detallada, o `null` si el artículo no existe o no está activo.
 * @throws {Error} - Si el ID no es válido o no se puede buscar el artículo.
 * 
 * El objeto devuelto tiene la siguiente estructura:
 * - `id`: El ID del artículo.
 * - `nombre`: El nombre del artículo.
 * - `tipo_venta`: El tipo de venta del artículo (por ejemplo, "Peso" o "Unidad").
 * - `precio`: El precio del artículo.
 * - `ref`: La referencia del artículo.
 * - `color`: El color del artículo, si es representado por color.
 * - `imagen`: La URL de la imagen del artículo, si es representado por imagen.
 * - `categoria`: Un objeto que representa la categoría del artículo o la cadena "Sin categoría" si no tiene categoría. Este objeto incluye:
 *   - `id`: El ID de la categoría.
 *   - `nombre`: El nombre de la categoría.
 *   - `color`: El color de la categoría.
 */

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





/**
 * Modifica un artículo existente por su ID y devuelve el artículo modificado.
 * 
 * @param {number|string} id - El ID del artículo a modificar.
 * @param {string} nombre - El nuevo nombre para el artículo. No debe estar vacío.
 * @param {string} tipo_venta - El nuevo tipo de venta para el artículo. Debe ser "Peso" o "Unidad".
 * @param {number|string} precio - El nuevo precio del artículo. No debe estar vacío.
 * @param {string|null} color - El nuevo color del artículo. Puede ser `null` si no es necesario.
 * @param {string|null} imagen - La nueva URL de la imagen del artículo. Puede ser `null` si no es necesario.
 * @param {number|string|null} id_categoria - El nuevo ID de la categoría para el artículo. Puede ser `null` si el artículo no tiene categoría.
 * 
 * @returns {Object|null} - Devuelve un objeto representando el artículo modificado, o `null` si el artículo con el ID dado no existe o no está activo.
 * 
 * @throws {Error} - Si el nombre, tipo_venta, o precio están vacíos, o si el tipo_venta no es válido.
 * 
 * El objeto devuelto tiene la siguiente estructura:
 * - `id`: El ID del artículo.
 * - `nombre`: El nuevo nombre del artículo.
 * - `tipo_venta`: El nuevo tipo de venta del artículo.
 * - `precio`: El nuevo precio del artículo.
 * - `ref`: La referencia del artículo.
 * - `color`: El nuevo color del artículo.
 * - `imagen`: La nueva URL de la imagen del artículo.
 * - `categoria`: La nueva categoría del artículo. Puede ser un objeto con:
 *   - `id`: El ID de la categoría.
 *   - `nombre`: El nombre de la categoría.
 *   - `color`: El color de la categoría.
 */
export const modificarArticulo = async (id, nombre, tipo_venta, precio, representacion, color, imagen, id_categoria, id_puntoDeVenta) => {

  if (!nombre || nombre.length < 1) {throw new Error("Campo nombre vacío")}
  if (!tipo_venta || tipo_venta.length < 1) {throw new Error("Campo tipo_venta vacío")}
  if (!precio || precio.length < 1) {throw new Error("Campo precio vacío")}

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
  console.log(articuloExistente.imagen)

  if (representacion !== 'color' && representacion !== 'imagen') {throw new Error("Representacion no valida")}

  //Validacion colores
    if (representacion === 'color') {
      if (!Object.keys(colorMapping).includes(color)) {
        throw new Error("Color no valido");
      }
      color = colorMapping[color];
    }

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
    representacion: representacion,
    color: color ? color : null,
    imagen: imagen ? imagen : null,
    id_categoria: parseInt(id_categoria),
  }
})

const articuloFormato = {
  id: articulo.id,
  nombre: articulo.nombre,
  tipo_venta: articulo.tipo_venta,
  precio: Number(articulo.precio),
  ref: articulo.ref,
  representacion:articulo.representacion,
  color: articulo.color,
  imagen: articulo.imagen,
  categoria: categoria,
}

return articuloFormato;
}





/**
 * Elimina (desactiva) un artículo existente cambiando su estado a 'false'.
 *
 * @param {number|string} id - El ID del artículo a eliminar. Debe ser un valor numérico.
 * @returns {Object|null} - El objeto del artículo actualizado con el estado cambiado a 'false', o `null` si no se encuentra un artículo con el ID dado.
 * @throws {Error} - Si el ID no es válido o no se puede desactivar el artículo.
 *
 * Este método no elimina físicamente el artículo de la base de datos, sino que cambia su estado para indicar que ha sido eliminado.
 */
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





/**
 * Busca una categoría por su ID y devuelve sus detalles.
 *
 * @param {number|string} id_categoria - El ID de la categoría a buscar. Debe ser un valor numérico.
 * @returns {Object|null} - Un objeto que contiene los detalles de la categoría encontrada (ID, nombre, color) o `null` si el ID de la categoría es una cadena vacía.
 * @throws {Error} - Si la categoría con el ID especificado no existe o si el estado de la categoría es `false`.
 * 
 * Este método busca una categoría activa por su ID. Si la categoría está inactiva o no existe, lanza un error.
 */
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





/**
 * Genera un nuevo valor de referencia para un artículo basado en el último ID de venta.
 *
 * La referencia se genera tomando el último ID de venta conocido y agregando 1000 a este.
 * El formato final es "#1-{nuevo_id}", donde "nuevo_id" es el último ID de venta más 1000.
 *
 * @returns {string} - La nueva referencia generada.
 * @throws {Error} - Si hay un problema al obtener el último ID de venta o al generar la referencia.
 */

const generarRef = async () => {
  try {
    const ultimoArticulo = await prisma.articulo.findFirst({
      orderBy: { id: "desc" },
    });

    const ultimoArticuloID = ultimoArticulo ? ultimoArticulo.id : 0;

    const nuevoRef = `#1-${ultimoArticuloID + 1000}`;

    return nuevoRef;
  } catch (error) {
    console.error("Error al generar el valor de ref:", error);
    throw error;
  }
};

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