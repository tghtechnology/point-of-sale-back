import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt"; // Importa bcrypt para la encriptación de contraseñas
import * as EmailInvitacion from "../Utils/emailInvitacion";

const prisma = new PrismaClient();

// Función para encriptar la contraseña
const encryptPassword = async (password) => {
  if (!password) {
    throw new Error("Se requiere una contraseña para encriptar.");
  }

  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

export const crearEmpleado = async (
  nombre,
  correo,
  telefono,
  cargo,
  contrasena
) => {
  // Encripta la contraseña antes de guardarla en la base de datos
  const hashedPassword = await encryptPassword(contrasena);

  // Crea el nuevo empleado en la base de datos
  const empleado = await prisma.empleado.create({
    data: {
      nombre,
      correo,
      telefono,
      cargo,
      estado: true,
      contrasena: hashedPassword,
    },
  });

  // Envía el correo de bienvenida
  await EmailInvitacion.enviarCorreoBienvenida(
    correo,
    nombre,
    correo,
    contrasena
  );

  return empleado;
};

export const editarEmpleado = async (
  id,
  nombre,
  correo,
  telefono,
  cargo,
  contrasena
) => {
  let dataToUpdate = {
    nombre,
    correo,
    telefono,
    cargo,
    estado: true,
  };

  // Buscar el empleado por ID para obtener la contraseña actual
  const empleadoExistente = await prisma.empleado.findUnique({
    where: {
      id: Number(id),
    },
  });

  // Verificar si se proporcionó una nueva contraseña y si es diferente de la actual
  if (contrasena && empleadoExistente.contrasena !== contrasena) {
    // Encriptar la nueva contraseña
    const hashedPassword = await encryptPassword(contrasena);
    dataToUpdate.contrasena = hashedPassword;
  }

  // Actualizar empleado en la base de datos
  const empleado = await prisma.empleado.update({
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
  const empleados = await prisma.empleado.findMany({
    where: { estado: true },
  });
  return empleados;
};
