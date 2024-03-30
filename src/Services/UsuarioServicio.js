import { validarNombrePais } from "../helpers/helperPais";
import bcrypt from "bcrypt"
import { PrismaClient } from "@prisma/client";
import {login,logout} from "../Services/AuthServicio"
//Inicialización de prisma
const prisma = new PrismaClient();

export const crearUsuario = async (nombre, email, password, pais) => {
    // Validación del país
    if (!validarNombrePais(pais)) {
      throw new Error("País inválido");
    }
    // Encriptado de la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUsuario=await prisma.usuario.create({
      data:{
            nombre: nombre,
            email: email,
            pais: pais,
            password:hashedPassword,
            estado:true
      }
    })
    return newUsuario
}; 

//Eliminar temporalmente una cuenta
export const eliminarTemporalmente = async (id, password,token) => {
  const usuarioverificado= await prisma.usuario.findUnique({
    where: {
      id: parseInt(id),
      estado: false
    },
  })
  if(usuarioverificado){
    throw new Error("Cuenta eliminada");
  }
  const sesionValida = await prisma.sesion.findFirst({
    where: {
      token: token
    }
  });
  if (!sesionValida) {
    throw new Error("Debe iniciar sesión");
  }
  const usuario = await prisma.usuario.findUnique({
    where: {
      id: parseInt(id),
      estado: true
    },
    select: {
      password: true
    }
  });

  if (!usuario) {
    throw new Error("Usuario no encontrado");
  }

  const match = await bcrypt.compare(password, usuario.password);
  if (!match) {
    throw new Error("Contraseña incorrecta");
  }

  const results = await prisma.usuario.update({
    where: { id: parseInt(id) },
    data: {
      estado: false,
      eliminado_temporal_fecha: { set: new Date() }
    }
  });
  // Verificar si el usuario tiene una sesión activa
  const activeSessions = await prisma.sesion.findMany({
    where: {
        usuario_id: usuario.id,
        expiracion: {
            gt: new Date(),
        },
    },
});
// Si el usuario tiene una sesión activa, cerrarla
  if (activeSessions.length > 0) {
      await logout(activeSessions[0].token);
  }
    return results;
};

//Eliminar permanente
export const eliminarPermanentemente = async (id,password,token) => {
  const sesionValida = await prisma.sesion.findFirst({
    where: {
      token: token
    }
  });
  if (!sesionValida) {
    throw new Error("Debe iniciar sesión");
  }
  const usuario = await prisma.usuario.findUnique({
    where: {
      id: parseInt(id),
      estado: true
    },
    select: {
      password: true
    }
  });

  if (!usuario) {
    throw new Error("Usuario no encontrado");
  }

  const match = await bcrypt.compare(password, usuario.password);
  if (!match) {
    throw new Error("Contraseña incorrecta");
  }
  const activeSessions = await prisma.sesion.findMany({
    where: {
        usuario_id: usuario.id,
        expiracion: {
            gt: new Date(),
        },
    },
  });
  // Si el usuario tiene una sesión activa, cerrarla
  if (activeSessions.length > 0) {
    await logout(activeSessions[0].token);
  }
  const results = await prisma.usuario.delete({ where: { id: parseInt(id) } });

  return results;
};

//Eliminicar cuentas temporales pasado el tiempo límite
export const eliminarCuentasVencidas = async (id) => {
  const fechaUnaSemanaAtras = new Date();
  fechaUnaSemanaAtras.setDate(fechaUnaSemanaAtras.getDate() - 7);

  const usuarioEliminado = await prisma.usuario.findFirst({
    where: {
      id: parseInt(id),
      estado: false,
      eliminado_temporal_fecha: { lte: fechaUnaSemanaAtras }
    }
  });

  if (!usuarioEliminado) return false;

  const results = await prisma.usuario.delete({ where: { id: parseInt(id) } });
  return results;
};

//Restaurar cuentas 
export const restaurarCuenta = async (id) => {
  const usuario = await prisma.usuario.findUnique({
    where: { id: parseInt(id) },
    select: {
      id: true,
      estado: true,
      eliminado_temporal_fecha: true
    }
  });

  if (!usuario || usuario.estado === 1) return null;

  const unaSemanaEnMiliseg = 7 * 24 * 60 * 60 * 1000;
  const fechaEliminacion = new Date(usuario.eliminado_temporal_fecha);

  if (Date.now() - fechaEliminacion > unaSemanaEnMiliseg) return true;

  const results = await prisma.usuario.update({
    where: { id: parseInt(id) },
    data: { estado: true, eliminado_temporal_fecha: null }
  });
  return results;
};
