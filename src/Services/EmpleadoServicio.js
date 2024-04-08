import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { validarNombrePais } from "../helpers/helperPais";
import * as EmailInvitacion from "../Utils/emailInvitacion";
import nodemailer from "nodemailer";

const prisma = new PrismaClient();

// Función para encriptar la contraseña
const encryptPassword = async (password) => {
  if (!password) {
    throw new Error("Se requiere una contraseña para encriptar.");
  }

  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

// Configurar el transporte de correo electrónico
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const crearEmpleado = async (
  nombre,
  correo,
  telefono,
  cargo,
  pais,
  rol,
  password
) => {
  // Encripta la contraseña antes de guardarla en la base de datos
  const hashedPassword = await encryptPassword(password);
  // Validación del país
  if (!validarNombrePais(pais)) {
    throw new Error("País inválido");
  }
  // Crea el nuevo empleado en la base de datos
  const empleado = await prisma.usuario.create({
    data: {
      nombre,
      correo,
      telefono,
      cargo,
      pais,
      rol: "Empleado",
      estado: true,
      password: hashedPassword,
    },
  });

  // Construye el mensaje de correo electrónico
  const mensajeCorreo = await EmailInvitacion.enviarCorreoBienvenida(
    correo,
    nombre,
    correo,
    password
  );

  // Envía el correo de bienvenida
  await transporter.sendMail(mensajeCorreo);

  return empleado;
};

export const editarEmpleado = async (
  id,
  nombre,
  correo,
  telefono,
  cargo,
  pais,
  password
) => {
  let dataToUpdate = {
    nombre,
    correo,
    telefono,
    cargo,
    pais,
    estado: true,
  };

  // Buscar el empleado por ID para obtener la contraseña actual
  const empleadoExistente = await prisma.usuario.findUnique({
    where: {
      id: Number(id),
    },
  });

  // Verificar si se proporcionó una nueva contraseña y si es diferente de la actual
  if (password && empleadoExistente.password !== password) {
    // Encriptar la nueva contraseña
    const hashedPassword = await encryptPassword(password);
    dataToUpdate.password = hashedPassword;
  }

  // Actualizar empleado en la base de datos
  const empleado = await prisma.usuario.update({
    where: {
      id: Number(id),
    },
    data: dataToUpdate,
  });

  return empleado;
};

export const listarEmpleadoPorId = async (id) => {
  return await prisma.empleado.findUnique({
    where: { id: parseInt(id, 10) },
  });
};

export const eliminarEmpleadoPorId = async (id) => {
  return await prisma.empleado.update({
    where: { id: parseInt(id, 10) },
    data: { estado: false },
  });
};

export const listarEmpleados = async () => {
  const empleados = await prisma.usuario.findMany({
    where: { estado: true },
  });
  return empleados;
};
