import { validarNombrePais } from "../helpers/helperPais";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { logout } from "../Services/AuthServicio";
import { cuerpoCorreo } from "../helpers/helperEmail";
import { envioCorreo } from "../Utils/SendEmail";

const prisma = new PrismaClient();

export const crearUsuario = async (
  nombre,
  email,
  password,
  pais,
  telefono,
  cargo
) => {
  // Validación del país
  if (!validarNombrePais(pais)) {
    throw new Error("País inválido");
  }

  // Encriptado de la contraseña
  const hashedPassword = await bcrypt.hash(password, 10);

  // Crea el nuevo usuario en la base de datos con rol 'Propietario'
  const newUsuario = await prisma.usuario.create({
    data: {
      nombre: nombre,
      email: email,
      pais: pais,
      password: hashedPassword,
      rol: "Propietario",
      telefono: telefono,
      cargo: cargo,
      estado: true,
    },
  });
  return newUsuario;
};

//Validaciones para eliminar cuenta
const validarUsuario = async (id, password, token) => {
  if (!token) {
    throw new Error("Token no proporcionado");
  }
  const sesion = await prisma.sesion.findFirst({
    where: {
      token,
    },
  });
  if (!sesion) {
    throw new Error("Debe iniciar sesión");
  }
  const usuario = await prisma.usuario.findUnique({
    where: {
      id: parseInt(id),
      estado: true,
    },
    select: {
      password: true,
    },
  });
  if (!usuario) {
    throw new Error("Usuario no encontrado");
  }
  const match = await bcrypt.compare(password, usuario.password);
  if (!match) {
    throw new Error("Contraseña incorrecta");
  }
  return usuario;
};
//Funcion para eliminar sesiones activas
const eliminarSesionesActivas = async (usuario_id) => {
  const activeSessions = await prisma.sesion.findMany({
    where: { usuario_id: usuario_id, expiracion: { gt: new Date() } },
  });

  if (activeSessions.length > 0) await logout(activeSessions[0].token);
};
// Eliminar cuenta temporalmente
export const eliminarTemporalmente = async (usuario_id, password, token) => {
  // Verificar si la cuenta ya está eliminada temporalmente
  const usuarioverificado = await prisma.usuario.findUnique({
    where: {
      id: parseInt(usuario_id),
      estado: false,
    },
  });
  if (usuarioverificado) {
    throw new Error("Cuenta eliminada");
  }
  // Validar usuario con el token
  const usuario = await validarUsuario(usuario_id, password, token);
  //Encontrar el email y nombre del usuario
  const usuarioInfo = await prisma.usuario.findUnique({
    where: {
      id: parseInt(usuario_id),
    },
    select: {
      email: true,
      nombre: true,
    },
  });

  const cuerpo = cuerpoCorreo(usuarioInfo.nombre);
  await envioCorreo(
    usuarioInfo.email,
    "Cuenta eliminada temporalmente",
    cuerpo
  );

  // Eliminar sesiones activas para este usuario
  await eliminarSesionesActivas(usuario_id);

  // Actualizar el estado de la cuenta y establecer la fecha de eliminación temporal
  const results = await prisma.usuario.update({
    where: { id: parseInt(usuario_id) },
    data: {
      estado: false,
      eliminado_temporal_fecha: { set: new Date() },
    },
  });

  return results;
};
//Eliminar cuenta permanentemente
export const eliminarPermanentemente = async (usuario_id, password, token) => {
  const usuario = await validarUsuario(usuario_id, password, token);
  await eliminarSesionesActivas(usuario_id);
  const results = await prisma.usuario.delete({
    where: {
      id: parseInt(usuario_id),
    },
  });
  return results;
};
//Eliminar cuentas al pasar el límite de tiempo
export const eliminarCuentasVencidas = async (id) => {
  const fechaUnaSemanaAtras = new Date();
  fechaUnaSemanaAtras.setDate(fechaUnaSemanaAtras.getDate() - 7);

  const results = await prisma.usuario.deleteMany({
    where: {
      id: parseInt(id),
      estado: false,
      eliminado_temporal_fecha: { lte: fechaUnaSemanaAtras },
    },
  });

  return results.count > 0;
};
//Restaurar cuenta
export const restaurarCuenta = async (id) => {
  const usuario = await prisma.usuario.findUnique({
    where: { id: parseInt(id) },
    select: { eliminado_temporal_fecha: true },
  });
  if (!usuario || !usuario.eliminado_temporal_fecha) {
    return false;
  }
  const unaSemanaEnMiliseg = 7 * 24 * 60 * 60 * 1000;
  const fechaEliminacion = new Date(usuario.eliminado_temporal_fecha);

  if (Date.now() - fechaEliminacion <= unaSemanaEnMiliseg) {
    await prisma.usuario.update({
      where: { id: parseInt(id) },
      data: { estado: true, eliminado_temporal_fecha: null },
    });
    return true;
  } else {
    return false;
  }
};
