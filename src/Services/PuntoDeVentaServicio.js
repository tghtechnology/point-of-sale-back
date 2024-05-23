import { PrismaClient } from "@prisma/client";
import { getUTCTime } from "../Utils/Time";
import { eliminarSesionesActivas } from "./UsuarioServicio";
import { desasociarPos } from "../Middleware/DesvPOS";

const prisma = new PrismaClient();

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

export const listarPOS = async () => {
    const pos = await prisma.puntoDeVenta.findMany({
        where: {
            estado: true
        }
    })
    return pos
}

export const listarPOSPorId = async (id) => {
    const pos = await prisma.puntoDeVenta.findUnique({
        where: {
            id: id,
            estado: true
        }
    })
    return pos
}

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

    await desasociarPos(parseInt(id))


    return pos
}

const eliminarSesionesActivasEmpleados = async (id_puntoDeVenta) => {
    const activeSessions = await prisma.sesion.findMany({
      where: { 
        id_puntoDeVenta: parseInt(id_puntoDeVenta),
        expiracion: { gt: new Date() } },
    });
  
    if (activeSessions.length > 0) await logout(activeSessions[0].token);
  };