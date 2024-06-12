import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


/**
 * Crea un nuevo impuesto y lo guarda en la base de datos.
 * 
 * @param {string} nombre - El nombre del impuesto. No debe estar vacío.
 * @param {number} tasa - La tasa del impuesto. Debe ser un número válido.
 * @param {string} tipo_impuesto - El tipo de impuesto (Incluido_en_el_precio o Anadido_al_precio).
 * 
 * @returns {Object} - Objeto representando el impuesto creado.
 * @throws {Error} - Si algún campo requerido está vacío, si la tasa no es un número válido, o si el tipo de impuesto no es uno de los permitidos.
 */

export const crearImpuesto = async (usuario_id, nombre, tasa, tipo_impuesto) => {
    //Validación tipo de dato de tasa
    if (!tasa) {throw new Error("Campo tasa vacío")}
    if (typeof tasa !== 'number' || isNaN(parseFloat(tasa)) || !isFinite(tasa)) {throw new Error("Tasa no es número válido")}

    //Validación tipo de impuesto
    let tipo = tipo_impuesto.replace(/\s+/g, '-').replace(/ñ/g, 'n');
    const TiposPermitidos = ['Incluido_en_el_precio', 'Anadido_al_precio'];
    if (!TiposPermitidos.includes(tipo)) {throw new Error("tipo_impuesto no válido")}

    //Validación nombre
    if (!nombre || nombre.length < 1) {throw new Error("Campo nombre vacío")}

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
    
    const newImpuesto = await prisma.impuesto.create({
        data: {
          nombre: nombre,
          tasa: tasa,
          tipo_impuesto: tipo_impuesto,
          estado: true,
          id_puntoDeVenta: id_puntoDeVenta
        }
      })
    
      const impuestoFormato = {
        id: newImpuesto.id,
        nombre: newImpuesto.nombre,
        tasa: newImpuesto.tasa,
        tipo_impuesto: newImpuesto.tipo_impuesto,
        id_puntoDeVenta: newImpuesto.id_puntoDeVenta
      }
      return impuestoFormato; 
}




/**
 * Obtiene todos los impuestos activos de la base de datos.
 * 
 * @returns {Array<Object>} - Una lista de objetos representando todos los impuestos activos, con sus detalles relevantes.
 * @throws {Error} - Si ocurre un error al buscar los impuestos.
 */

export const listarImpuestos = async (usuario_id) => {

  const id_puntoDeVenta = await obtenerIdPunto(usuario_id)

    const allImpuestos = await prisma.impuesto.findMany({
        where: {
          estado: true,
          id_puntoDeVenta: id_puntoDeVenta
        }
      })

      return allImpuestos;
}



/**
 * Obtiene un impuesto por su ID, siempre y cuando esté activo.
 * 
 * @param {number|string} id - El ID del impuesto que se quiere obtener.
 * 
 * @returns {Object|null} - El objeto representando el impuesto encontrado, o null si no se encuentra o si está desactivado.
 * @throws {Error} - Si el ID no es válido o si ocurre un error al buscar el impuesto.
 */

export const listarImpuestoPorId = async (id, usuario_id) => {

  const id_puntoDeVenta = await obtenerIdPunto(usuario_id)

    const impuesto = await prisma.impuesto.findUnique({
        where: {
          id: parseInt(id),
          id_puntoDeVenta: id_puntoDeVenta
        }
      })
    
      //Si el id no existe
      if (!impuesto) {return null}
    
      return impuesto;
}



/**
 * Modifica un impuesto existente en la base de datos.
 * 
 * @param {number|string} id - El ID del impuesto a modificar.
 * @param {string} nombre - El nuevo nombre del impuesto. No debe estar vacío.
 * @param {number} tasa - La nueva tasa del impuesto. Debe ser un número válido.
 * @param {string} tipo_impuesto - El nuevo tipo de impuesto (Incluido_en_el_precio o Anadido_al_precio).
 * 
 * @returns {Object} - El objeto representando el impuesto modificado.
 * @throws {Error} - Si el ID no es válido, si el campo "nombre" está vacío, si la tasa no es un número válido, o si el tipo de impuesto no es uno de los permitidos.
 */

export const modificarImpuesto = async (id, nombre, tasa, tipo_impuesto, usuario_id) => {

     //Validación tipo de dato de tasa
     if (!tasa) {throw new Error("Campo tasa vacío")}
     if (typeof tasa !== 'number' || isNaN(parseFloat(tasa)) || !isFinite(tasa)) {throw new Error("Tasa no es número válido")}

     //Validación tipo de impuesto
    let tipo = tipo_impuesto.replace(/\s+/g, '-').replace(/ñ/g, 'n');
    const TiposPermitidos = ['Incluido_en_el_precio', 'Anadido_al_precio'];
    if (!TiposPermitidos.includes(tipo)) {throw new Error("tipo_impuesto no válido")}

    const id_puntoDeVenta = await obtenerIdPunto(usuario_id)

    const impuesto = await prisma.impuesto.update({
        where: {
          id: parseInt(id),
          estado: true,
          id_puntoDeVenta: id_puntoDeVenta
        },
        data: {
          nombre: nombre,
          tasa: tasa,
          tipo_impuesto: tipo_impuesto
        }
      })

    //Validación nombre
    if (!nombre || nombre.length < 1) {throw new Error("Campo nombre vacío")}

    const impuestoFormato = {
        id: impuesto.id,
        nombre: impuesto.nombre,
        tasa: impuesto.tasa,
        tipo_impuesto: impuesto.tipo_impuesto,
        id_puntoDeVenta: impuesto.id_puntoDeVenta
      }
      return impuestoFormato;
}




/**
 * Desactiva un impuesto en la base de datos.
 * 
 * @param {number|string} id - El ID del impuesto a desactivar.
 * 
 * @returns {Object|null} - El objeto representando el impuesto desactivado, o null si no se encuentra un impuesto activo con el ID especificado.
 * @throws {Error} - Si el ID no es válido o si ocurre un error al desactivar el impuesto.
 */

export const eliminarImpuesto = async (id, usuario_id ) => {

  const id_puntoDeVenta = await obtenerIdPunto(usuario_id)

    //Buscar si existe una categoría con el id
  const impuestoExistente = await prisma.impuesto.findUnique({
    where: {
      id: parseInt(id),
      estado: true,
      id_puntoDeVenta: id_puntoDeVenta
    }
  })

  //Si el id no existe
  if (!impuestoExistente) {return null}

  const impuesto = await prisma.impuesto.update({
    where: {
      id: parseInt(id),
      estado: true,
      id_puntoDeVenta: id_puntoDeVenta
    },
    data: {
      estado: false
    }
  })
}

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