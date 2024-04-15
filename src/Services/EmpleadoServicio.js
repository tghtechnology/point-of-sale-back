import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { validarNombrePais } from "../helpers/helperPais";
import * as EmailInvitacion from "../Utils/emailInvitacion";
import nodemailer from "nodemailer";
import { getUTCTime } from "../Utils/Time";

const prisma = new PrismaClient();

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const encryptPassword = async (password) => {
  if (!password) throw new Error("Se requiere una contraseña para encriptar.");
  return bcrypt.hash(password, 10);
};

export const crearEmpleado = async (
  nombre,
  email,
  telefono,
  cargo,
  pais,
  password
) => {
  if (!validarNombrePais(pais)) throw new Error("País inválido");

  const hashedPassword = await encryptPassword(password);
  const fechaCreacion = getUTCTime(new Date().toISOString());

  const empleado = await prisma.usuario.create({
    data: {
      nombre,
      email,
      telefono,
      cargo,
      pais,
      rol: "Empleado",
      estado: true,
      password: hashedPassword,
      fecha_creacion: fechaCreacion,
      fecha_modificacion: null,
    },
  });

  await transporter.sendMail(
    await EmailInvitacion.enviarCorreoBienvenida(
      email,
      nombre,
      email,
      password,
      process.env.URLEMPLOYE
    )
  );

  return empleado;
};

export const editarEmpleado = async (
  id,
  nombre,
  email,
  telefono,
  cargo,
  pais
) => {
  const empleadoExistente = await prisma.usuario.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!empleadoExistente)
    throw new Error(`No se encontró ningún empleado con el ID ${id}`);

  const updatedEmpleado = await prisma.usuario.update({
    where: {
      id: Number(id),
    },
    data: {
      nombre,
      email,
      telefono,
      cargo,
      pais,
      estado: true,
      fecha_modificacion: getUTCTime(new Date().toISOString())
    },
  });

  return updatedEmpleado;
};

export const listarEmpleadoPorId = async (id) => {
  const empleado = await prisma.usuario.findUnique({
    where: { id: parseInt(id, 10) },
  });

  if (!empleado)
    throw new Error(`No se encontró ningún empleado con el ID ${id}`);

  return empleado;
};

export const eliminarEmpleadoPorId = async (id) => {
  return await prisma.usuario.update({
    where: { id: parseInt(id, 10) },
    data: { estado: false },
  });
};

export const listarEmpleados = async () => {
  return await prisma.usuario.findMany({ where: { estado: true } });
};

export const cambiarContraseña = async (
  id,
  contraseñaActual,
  nuevaContraseña,
  confirmarNuevaContraseña
) => {
  const empleado = await prisma.usuario.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!empleado)
    throw new Error(`No se encontró ningún empleado con el ID ${id}`);

  const contraseñaValida = await bcrypt.compare(
    contraseñaActual,
    empleado.password
  );

  if (!contraseñaValida)
    throw new Error(
      `La contraseña actual no es válida para el empleado con el ID ${id}`
    );

  if (nuevaContraseña !== confirmarNuevaContraseña)
    throw new Error(`Las contraseñas nuevas no coinciden`);

  if (!nuevaContraseña)
    throw new Error(`La nueva contraseña no puede estar vacía`);

  const hashedPassword = await encryptPassword(nuevaContraseña);

  return await prisma.usuario.update({
    where: {
      id: Number(id),
    },
    data: {
      password: hashedPassword,
    },
  });
};