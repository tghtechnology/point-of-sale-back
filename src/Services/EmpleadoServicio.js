import { validarNombrePais } from "../helpers/helperPais";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import * as EmailInvitacion from "../Utils/emailInvitacion";
import nodemailer from "nodemailer";

const prisma = new PrismaClient();

const encryptPassword = async (password) => {
  if (!password) {
    throw new Error("Se requiere una contraseña para encriptar.");
  }

  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
};

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const crearEmpleado = async (
  nombre,
  email,
  telefono,
  cargo,
  pais,
  password
) => {
  const hashedPassword = await encryptPassword(password);

  if (!validarNombrePais(pais)) {
    throw new Error("País inválido");
  }

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
    },
  });

  const mensajeCorreo = await EmailInvitacion.enviarCorreoBienvenida(
    email,
    nombre,
    password
  );
  await transporter.sendMail(mensajeCorreo);

  return empleado;
};

export const editarEmpleado = async (
  id,
  nombre,
  email,
  telefono,
  cargo,
  pais,
  password
) => {
  const empleadoExistente = await prisma.usuario.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!empleadoExistente) {
    throw new Error(`No se encontró ningún empleado con el ID ${id}`);
  }

  let dataToUpdate = {
    nombre,
    email,
    telefono,
    cargo,
    pais,
    estado: true,
  };

  if (password && empleadoExistente.password !== password) {
    const hashedPassword = await encryptPassword(password);
    dataToUpdate.password = hashedPassword;
  }

  const empleado = await prisma.usuario.update({
    where: {
      id: Number(id),
    },
    data: dataToUpdate,
  });

  return empleado;
};

export const listarEmpleadoPorId = async (id) => {
  const empleado = await prisma.usuario.findUnique({
    where: { id: parseInt(id, 10) },
  });

  if (!empleado) {
    throw new Error(`No se encontró ningún empleado con el ID ${id}`);
  }

  return empleado;
};

export const eliminarEmpleadoPorId = async (id) => {
  return await prisma.usuario.update({
    where: { id: parseInt(id, 10) },
    data: { estado: false },
  });
};

export const listarEmpleados = async () => {
  return await prisma.usuario.findMany({
    where: { estado: true },
  });
};
