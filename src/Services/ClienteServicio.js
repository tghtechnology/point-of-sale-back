import {connect} from "../database"
import { validarNombrePais } from "../helpers/helperPais";
import { PrismaClient } from "@prisma/client";
import { getUTCTime } from "../Utils/Time";

const prisma = new PrismaClient();




/**
 * Crea un nuevo cliente y lo guarda en la base de datos.
 * 
 * @param {string} nombre - El nombre del cliente. No debe estar vacío.
 * @param {string} email - El correo electrónico del cliente. Puede ser nulo.
 * @param {string} telefono - El teléfono del cliente. Puede ser nulo.
 * @param {string} direccion - La dirección del cliente. Puede ser nulo.
 * @param {string} ciudad - La ciudad del cliente. Puede ser nulo.
 * @param {string} region - La región del cliente. Puede ser nulo.
 * @param {string} pais - El país del cliente. Debe ser válido según el método `validarNombrePais`.
 * 
 * @returns {Object} - Objeto representando el cliente creado, incluyendo su ID y otros detalles.
 * 
 * @throws {Error} - Si el país es inválido.
 */

const crearCliente = async (nombre, email, telefono, direccion, ciudad, region, pais, usuario_id) => {
    if (!validarNombrePais(pais)) {
      throw new Error("País inválido");
    }

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

    const clienteExistente = await prisma.cliente.findUnique({
      where: {
          email: email,
          estado:true,
          id_puntoDeVenta: id_puntoDeVenta
      }
      });

      if (clienteExistente) {
          throw new Error("El correo electrónico ya está en uso");
      }
    const todayISO = new Date().toISOString()
    const fecha_creacion = getUTCTime(todayISO)
    const newCliente=await prisma.cliente.create({
      data:{
            nombre: nombre,
            email: email,
            telefono: telefono,
            direccion: direccion,
            ciudad: ciudad,
            region: region,
            pais: pais,
            fecha_creacion:fecha_creacion,
            fecha_modificacion: null,
            estado:true,
            id_puntoDeVenta: id_puntoDeVenta,
      }
    })
    return newCliente
}; 





/**
 * Obtiene la lista de clientes activos de la base de datos.
 * 
 * @returns {Array<Object>} - Una lista de objetos que representan a los clientes. Cada objeto contiene detalles del cliente, como su ID, nombre, correo electrónico, teléfono, dirección, ciudad, región, código postal y país.
 * 
 * @throws {Error} - Si ocurre un error durante la recuperación de datos de la base de datos.
 */

const listarClientes= async(usuario_id)=>{

  const id_puntoDeVenta = await obtenerIdPunto(usuario_id)
    const clientes= await prisma.cliente.findMany({
        where: {
          estado: true,
          id_puntoDeVenta: id_puntoDeVenta
        }
      })
      return clientes;
}




/**
 * Obtiene un cliente por su ID.
 * 
 * @param {number|string} id - El ID del cliente que se va a buscar. Debe ser convertible a número.
 * 
 * @returns {Object|null} - El objeto que representa al cliente, o `null` si no se encuentra un cliente con el ID especificado. El objeto contiene detalles del cliente, como su ID, nombre, correo electrónico, teléfono, dirección, ciudad, región, código postal y país.
 * 
 * @throws {Error} - Si ocurre un error durante la búsqueda en la base de datos.
 */

const obtenerClienteById=async (id, usuario_id) => {

  const id_puntoDeVenta = await obtenerIdPunto(usuario_id)
    const cliente= await prisma.cliente.findFirst({
        where: {
          id: Number(id),
          estado: true,
          id_puntoDeVenta: id_puntoDeVenta
        }
      })
      return cliente;
}




/**
 * Edita los detalles de un cliente existente por su ID.
 * 
 * @param {number|string} id - El ID del cliente que se va a editar. Debe ser convertible a número.
 * @param {string} nombre - El nombre del cliente. No debe estar vacío.
 * @param {string} email - La dirección de correo electrónico del cliente. Debe ser un correo electrónico válido.
 * @param {string} telefono - El número de teléfono del cliente. Puede ser un valor opcional.
 * @param {string} direccion - La dirección del cliente. Puede ser un valor opcional.
 * @param {string} ciudad - La ciudad del cliente. Puede ser un valor opcional.
 * @param {string} region - La región del cliente. Puede ser un valor opcional.
 * @param {string} pais - El país del cliente. Debe ser un nombre válido de país.
 * 
 * @returns {Object} - Objeto representando al cliente con los detalles actualizados. Contiene el nombre, correo electrónico, teléfono, dirección, ciudad, región, código postal, país, fecha de creación, fecha de modificación y estado del cliente.
 * 
 * @throws {Error} - Si el país es inválido o si el ID no se encuentra en la base de datos.
 */

const editarCliente = async (id, nombre, email, telefono, direccion, ciudad, region, pais, usuario_id) => {
  if (!validarNombrePais(pais)) {
    throw new Error("País inválido");
  }

  const id_puntoDeVenta = await obtenerIdPunto(usuario_id);

  const clienteExistente = await prisma.cliente.findUnique({
    where: {
      email: email,
      id_puntoDeVenta: id_puntoDeVenta,
      id: Number(id)
    }
  });
  if (!clienteExistente) {
    throw new Error("Cliente no encontrado");
  }

  const todayISO = new Date().toISOString();
  const fecha_modificacion = getUTCTime(todayISO);
  const cliente = await prisma.cliente.update({
    where: {
      id: Number(id),
      estado: true,
      id_puntoDeVenta: id_puntoDeVenta
    },
    data: {
      nombre: nombre,
      email: email,
      telefono: telefono,
      direccion: direccion,
      ciudad: ciudad,
      region: region,
      pais: pais,
      fecha_modificacion: fecha_modificacion,
      estado: true
    }
  });
  const updatedCliente = {
    nombre: cliente.nombre,
    email: cliente.email,
    telefono: cliente.telefono,
    direccion: cliente.direccion,
    ciudad: cliente.ciudad,
    region: cliente.region,
    pais: cliente.pais,
    fecha_creacion: cliente.fecha_creacion,
    fecha_modificacion: cliente.fecha_modificacion,
    estado: cliente.estado,
    id_puntoDeVenta: cliente.id_puntoDeVenta,
  };
  return updatedCliente;
};





/**
 * Elimina (desactiva) un cliente por su ID estableciendo su estado como falso.
 * 
 * @param {number|string} id - El ID del cliente a eliminar. Debe ser convertible a número.
 * 
 * @throws {Error} - Si no se puede encontrar un cliente con el ID proporcionado.
 */

const eliminarCliente = async (id, usuario_id) => {

  const id_puntoDeVenta = await obtenerIdPunto(usuario_id)
    const cliente=await prisma.cliente.update({
      where: {
        id: Number(id),
        id_puntoDeVenta: id_puntoDeVenta
      },
      data:{
        estado: false
      }
    })
};

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



module.exports={
    crearCliente,
    listarClientes,
    obtenerClienteById,
    editarCliente,
    eliminarCliente
}
