import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const crearEmpleado = async (nombre, correo, telefono, cargo) => {
  const empleado = await prisma.empleado.create({
    data: {
      nombre,
      correo,
      telefono,
      cargo,
      estado: true,
    },
  });
  return empleado;
};

export const editarEmpleado = async (id, nombre, correo, telefono, cargo) => {
  // Actualizar empleado en la base de datos
  const empleado = await prisma.empleado.update({
    where: {
      id: Number(id),
    },
    data: {
      nombre: nombre,
      correo: correo,
      telefono: telefono,
      cargo: cargo,
      estado: true,
    },
  });
  const updatedEmpleado = {
    nombre: empleado.nombre,
    correo: empleado.correo,
    telefono: empleado.telefono,
    cargo: empleado.cargo,
    estado: empleado.estado,
  };

  return updatedEmpleado;
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

module.exports = {
  crearEmpleado,
  editarEmpleado,
  listarEmpleados,
  listarEmpleadoPorId,
  eliminarEmpleadoPorId,
};
