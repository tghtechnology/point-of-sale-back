import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { validarNombrePais } from "../helpers/helperPais";
import { cuerpoCorreo } from "../helpers/helperEmail";
import { envioCorreo } from "../Utils/SendEmail";
import { getUTCTime } from "../Utils/Time";
import { logout } from "./AuthServicio";
const prisma = new PrismaClient();

export const crearUsuario = async (nombre, email, password, pais, telefono) => {
  if (!validarNombrePais(pais)) {
    throw new Error("País inválido");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const fechaCreacion = getUTCTime(new Date().toISOString());

  const newUsuario = await prisma.usuario.create({
    data: {
      nombre: nombre,
      email: email,
      pais: pais,
      password: hashedPassword,
      rol: "Propietario",
      telefono: telefono,
      cargo: "Gerente",
      estado: true,
      fecha_creacion: fechaCreacion,
      fecha_modificacion: null,
    },
  });
  return newUsuario;
};

export const editarUsuarioPorId = async (id, nombre, email, telefono, pais) => {
  if (!validarNombrePais(pais)) {
    throw new Error("País inválido");
  }

  const usuarioExistente = await prisma.usuario.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!usuarioExistente) {
    throw new Error(`No se encontró ningún usuario con el ID ${id}`);
  }

  const updatedUsuario = await prisma.usuario.update({
    where: {
      id: Number(id),
    },
    data: {
      nombre,
      email,
      telefono,
      pais,
      fecha_modificacion: getUTCTime(new Date().toISOString())
    },
  });

  return updatedUsuario;
};

export const listarUsuarios = async () => {
  return await prisma.usuario.findMany({
    where: { estado: true, rol: "Propietario" },
  });
};

export const cambiarContraseña = async (id, contraseñaActual, nuevaContraseña, verificarContraseña) => {
  if (nuevaContraseña !== verificarContraseña) {
    throw new Error("La nueva contraseña y la verificación no coinciden");
  }

  const usuario = await prisma.usuario.findUnique({
    where: { id: parseInt(id) },
  });

  if (!usuario) {
    throw new Error("Usuario no encontrado");
  }

  const match = await bcrypt.compare(contraseñaActual, usuario.password);
  if (!match) {
    throw new Error("Contraseña actual incorrecta");
  }

  const hashedNuevaContraseña = await bcrypt.hash(nuevaContraseña, 10);

  await prisma.usuario.update({
    where: { id: usuario.id },
    data: { password: hashedNuevaContraseña },
  });  

  return { message: "Contraseña actualizada correctamente" };
};

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

export const eliminarSesionesActivas = async (usuario_id) => {
  const activeSessions = await prisma.sesion.findMany({
    where: { usuario_id: usuario_id, expiracion: { gt: new Date() } },
  });

  if (activeSessions.length > 0) await logout(activeSessions[0].token);
};

export const eliminarTemporalmente = async (usuario_id, password, token) => {
  const usuarioverificado = await prisma.usuario.findUnique({
    where: {
      id: parseInt(usuario_id),
      estado: false,
    },
  });
  if (usuarioverificado) {
    throw new Error("Cuenta eliminada");
  }

  const usuario = await validarUsuario(usuario_id, password, token);

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
  await actualizarEstadoSesion(token, false);

  const todayISO = new Date().toISOString();
  const eliminado_temporal_fecha = getUTCTime(todayISO);
  const results = await prisma.usuario.update({
    where: { id: parseInt(usuario_id) },
    data: {
      estado: false,
      eliminado_temporal_fecha: eliminado_temporal_fecha,
    },
  });
  return results;
};

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
    const session = await prisma.sesion.findFirst({
      where: {
        usuario_id: parseInt(id),
        estado: false,
      },
    });
    if (session) {
      await prisma.sesion.update({
        where: { id: session.id },
        data: { estado: true },
      });
    }
    return true;
  } else {
    return false;
  }
};

const actualizarEstadoSesion = async (token, estado) => {
  await prisma.sesion.updateMany({
    where: {
      token: token,
    },
    data: {
      estado: estado,
    },
  });
};

export const eliminarPermanentemente = async (usuario_id, password, token) => {
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
      id: parseInt(usuario_id),
      estado: true,
    },
  });

  if (!usuario) {
    throw new Error("Usuario no encontrado");
  }

  const match = await bcrypt.compare(password, usuario.password);

  if (!match) {
    throw new Error("Contraseña incorrecta");
  }

  const cuerpo = "Su cuenta ha sido eliminada permanentemente.";
  await envioCorreo(usuario.email, "Cuenta eliminada permanentemente", cuerpo);

  await actualizarEstadoSesion(token, false);

  await prisma.usuario.update({
    where: { id: parseInt(usuario_id) },
    data: {
      estado: false,
    },
  });
  return { message: "Cuenta eliminada permanentemente correctamente" };
};