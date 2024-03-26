import { connect } from "../database";
import { validarNombrePais } from "../helpers/helperPais";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
//Inicialización de prisma
const prisma = new PrismaClient();

export const crearUsuario = async (nombre, email, password, pais) => {
  // Validación del país
  if (!validarNombrePais(pais)) {
    throw new Error("País inválido");
  }
  // Encriptado de la contraseña
  const hashedPassword = await bcrypt.hash(password, 10);
  // Creación del nuevo usuario en la base de datos
  const connection = await connect();
  const newUsuario = await prisma.usuario.create({
    data: {
      nombre: nombre,
      email: email,
      pais: pais,
      password: hashedPassword,
      estado: true,
    },
  });
  return newUsuario;
};

//Función para verificar contraseña antes de eliminar
export const verificarContrasena = async (id, password) => {
  const connection = await connect();

  const passwordFromRequest = password;
  const contrasena = await prisma.usuario.findUnique({
    where: {
      id: parseInt(id),
      estado: true,
    },
    select: {
      password: true,
    },
  });

  if (contrasena == null) {
    return null;
  }

  const hashedPasswordFromDatabase = contrasena.password;
  const match = await bcrypt.compare(
    passwordFromRequest,
    hashedPasswordFromDatabase
  ); //Comparación de contraseña ingresada y de la BD

  return match;
};

//Eliminar temporalmente durante 1 semana
export const eliminarTemporalmente = async (id) => {
  const connection = await connect();

  //Verificar la existencia de un registro con la ID ingresada
  const idResult = await prisma.usuario.findUnique({
    where: {
      id: parseInt(id),
      //estado: true
    },
    select: {
      id: true,
      estado: true,
    },
  });
  if (!idResult || idResult.length === 0) {
    return null;
  }

  //Verificar que la cuenta no esté ya eliminada
  const { estado } = idResult;
  if (estado == 0) {
    return false;
  }

  const results = await prisma.usuario.update({
    where: {
      id: parseInt(id),
    },
    data: {
      estado: false,
      eliminado_temporal_fecha: {
        set: new Date(),
      },
    },
  });

  return results;
};

//Función para restaurar una cuenta que ha sido eliminada temporalmente
export const restaurarCuenta = async (id) => {
  const connection = await connect();

  //Verificar la existencia de un registro con la ID ingresada
  const idResult = await prisma.usuario.findUnique({
    where: {
      id: parseInt(id),
    },
    select: {
      id: true,
      estado: true,
    },
  });
  if (!idResult || idResult.length === 0) {
    return null;
  }

  //Verificar que la cuenta no esté ya restaurada
  const { estado } = idResult;
  if (estado == 1) {
    return false;
  }

  const fecha = await prisma.usuario.findUnique({
    where: {
      id: parseInt(id),
    },
    select: {
      eliminado_temporal_fecha: true,
    },
  });
  const eliminadoTemporalmente = fecha.eliminado_temporal_fecha;

  // Verificar si ha pasado más de 1 semana
  const unaSemanaEnMiliseg = 7 * 24 * 60 * 60 * 1000;
  const fechaAhora = new Date();
  const fechaEliminacion = new Date(eliminadoTemporalmente);

  if (fechaAhora - fechaEliminacion > unaSemanaEnMiliseg) {
    return true;
  }

  const results = await prisma.usuario.update({
    where: {
      id: parseInt(id),
    },
    data: {
      estado: true,
      eliminado_temporal_fecha: null,
    },
  });
  return results;
};

//Función para eliminar las cuentas vencidas (pasado 1 semana de haber sido eliminados temporalmente)
export const eliminarCuentasVencidas = async (id) => {
  const connection = await connect();

  ///Verificar la existencia de un registro con la ID ingresada
  const idResult = await prisma.usuario.findUnique({
    where: {
      id: parseInt(id),
    },
    select: {
      id: true,
    },
  });
  if (!idResult) {
    return null;
  }

  const fechaUnaSemanaAtras = new Date();
  fechaUnaSemanaAtras.setDate(fechaUnaSemanaAtras.getDate() - 7);

  const usuarioEliminado = await prisma.usuario.findFirst({
    where: {
      id: parseInt(id),
      estado: false,
      eliminado_temporal_fecha: {
        lte: fechaUnaSemanaAtras,
      },
    },
  });

  if (usuarioEliminado) {
    const results = await prisma.usuario.delete({
      where: {
        id: parseInt(id),
      },
    });
    return results;
  } else {
    return false;
  }
};

//Función para eliminaruna cuenta permanentemente
export const eliminarPermanentemente = async (id) => {
  const connection = await connect();

  //Verificar la existencia de un registro con la ID ingresada
  const idResult = await prisma.usuario.findUnique({
    where: {
      id: parseInt(id),
    },
    select: {
      id: true,
      estado: true,
    },
  });
  if (!idResult) {
    return null;
  }

  //Verificar que la cuenta no esté ya restaurada
  const { estado } = idResult;
  if (estado == 0) {
    return false;
  }

  const results = await prisma.usuario.delete({
    where: {
      id: parseInt(id),
    },
  });
  return results;
};

module.exports = {
  crearUsuario,
  verificarContrasena,
  eliminarTemporalmente,
  restaurarCuenta,
  eliminarCuentasVencidas,
  eliminarPermanentemente,
};
