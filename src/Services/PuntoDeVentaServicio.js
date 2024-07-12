import { PrismaClient } from "@prisma/client";
import { getUTCTime } from "../Utils/Time";
import { eliminarSesionesActivas } from "./UsuarioServicio";
import { desactivarRegistros, reactivarRegistros } from "../Middleware/ActualizarRegsByPos";

const prisma = new PrismaClient();

/**
 * Crea un nuevo punto de venta en la base de datos.
 * 
 * @param {string} nombre - El nombre del punto de venta.
 * @param {string} propietario - El nombre del propietario del punto de venta.
 * @returns {Object} - Retorna un objeto con la información del nuevo punto de venta creado.
 * @throws {Error} - Si ocurre un error al crear el punto de venta.
 */
export const crearPOS = async (nombre, propietario) => {

    const nombrePOS = nombre
    const nombrePropietario = propietario
    const todayISO = new Date().toISOString()
    const fecha_creacion = getUTCTime(todayISO)

    const newPos = await prisma.puntoDeVenta.create({
        data: {
            nombre: nombrePOS,
            propietario: nombrePropietario,
            estado: true,
            fecha_creacion: fecha_creacion 
        }
    })
    return newPos
}


/**
 * Obtiene una lista de todos los puntos de venta activos en la base de datos.
 * 
 * @returns {Array<Object>} - Retorna un array de objetos con la información de los puntos de venta activos.
 * @throws {Error} - Si ocurre un error al obtener la lista de puntos de venta.
 */

export const listarPOS = async () => {
    const pos = await prisma.puntoDeVenta.findMany({
        where: {
            estado: true
        }
    })
    return pos
}


/**
 * Obtiene un punto de venta por su ID.
 * 
 * @param {Number} id - El ID del punto de venta.
 * @returns {Object} - Retorna un objeto con la información del punto de venta si existe, de lo contrario, retorna null.
 */
export const listarPOSPorId = async (id) => {
    const pos = await prisma.puntoDeVenta.findUnique({
        where: {
            id: parseInt(id),
            estado: true
        }
    })
    return pos
}

/**
 * Elimina un punto de venta de la base de datos.
 * 
 * @param {Number} id - El ID del punto de venta a eliminar.
 * @returns {Object} - Retorna un objeto con la información del punto de venta eliminado.
 * @throws {Error} - Si ocurre un error al eliminar el punto de venta.
 */
export const eliminarPOS = async (id) => {


    const pos = await prisma.puntoDeVenta.update({
        where: {
            id: parseInt(id),
            estado: true
        },
        data: {
            estado: false
        },
        select: {
            propietario: true
        }
    })

    const usuarioId = await prisma.usuario.findFirst({
        where: {
            nombre: pos.propietario,
            estado: true
        },
        select: {
            id:true
        }
    })

    await eliminarSesionesActivasEmpleados(id)
    const cerrarSesionProp = eliminarSesionesActivas(usuarioId.id)

    const eliminarPropietario = await prisma.usuario.update({
        where: {
            id: usuarioId.id,
            estado: true
        },
        data: {
            estado: false
        }
    })

    const eliminarEmpleados = await prisma.usuario.updateMany({
        where: {
            id_puntoDeVenta: parseInt(id),
            estado: true
        },
        data: {
            estado: false,
        }
    })

    await desactivarRegistros(parseInt(id))


    return pos
}


/**
 * Restablece un punto de venta previamente eliminado.
 * 
 * @param {Number} id - El ID del punto de venta a restablecer.
 * @returns {Object} - Retorna un objeto con la información del punto de venta restablecido.
 * @throws {Error} - Si ocurre un error al restablecer el punto de venta.
 */
export const reestablecerPos = async (id) => {

    const pos = await prisma.puntoDeVenta.update({
        where: {
            id: parseInt(id),
            estado: false
        },
        data: {
            estado: true
        },
        select: {
            propietario: true
        }
    })

    const usuarioId = await prisma.usuario.findFirst({
        where: {
            nombre: pos.propietario,
            estado: false
        },
        select: {
            id:true
        }
    })

    const reactivarPropietario = await prisma.usuario.update({
        where: {
            id: usuarioId.id,
            estado: false
        },
        data: {
            estado: true
        }
    })

    const reactivarEmpleados = await prisma.usuario.updateMany({
        where: {
            id_puntoDeVenta: parseInt(id),
            estado: false
        },
        data: {
            estado: true,
        }
    })

    await reactivarRegistros(parseInt(id))

    return pos
}

/**
 * Obtiene una lista de todos los puntos de venta eliminados en la base de datos.
 * 
 * @returns {Array<Object>} - Retorna un array de objetos con la información de los puntos de venta eliminados.
 * @throws {Error} - Si ocurre un error al obtener la lista de puntos de venta eliminados.
 */
export const listarPosEliminados = async () => {
    const pos = await prisma.puntoDeVenta.findMany({
        where: {
            estado: false
        }
    })
    return pos
}


/**
 * Obtiene un punto de venta eliminado por su ID.
 * 
 * @param {Number} id - El ID del punto de venta eliminado.
 * @returns {Object} - Retorna un objeto con la información del punto de venta eliminado si existe, de lo contrario, retorna null.
 */
export const listarPosEliminadosPorId = async (id) => {
    const pos = await prisma.puntoDeVenta.findUnique({
        where: {
            id: parseInt(id),
            estado: false
        }
    })
    return pos
}


/**
 * Elimina las sesiones activas de los empleados asociados a un punto de venta.
 * 
 * @param {Number} id_puntoDeVenta - El ID del punto de venta.
 * @returns {Promise<void>}
 */
const eliminarSesionesActivasEmpleados = async (id_puntoDeVenta) => {
    const activeSessions = await prisma.sesion.findMany({
      where: { 
        id_puntoDeVenta: parseInt(id_puntoDeVenta),
        expiracion: { gt: new Date() } },
    });
  
    if (activeSessions.length > 0) await logout(activeSessions[0].token);
  };