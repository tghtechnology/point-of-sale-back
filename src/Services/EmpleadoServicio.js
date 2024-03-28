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

export const editarEmpleado = async (id, nuevosDatos) => {
  const idAsNumber = parseInt(id, 10);
  const { estado: originalEstado, ...updatedDataWithoutEstado } = nuevosDatos;

  const updatedEmpleado = await prisma.empleado.update({
    where: { id: idAsNumber },
    data: updatedDataWithoutEstado,
  });

  return updatedEmpleado;
};

export const listarEmpleados = async () => {
  return await prisma.empleado.findMany({
    where: { estado: true },
  });
};

export const listarEmpleadoPorId = async (id) => {
  return await prisma.empleado.findUnique({
    where: { id: parseInt(id, 10) },
  });
};

export const actualizarEmpleadoPorId = async (id, nuevosDatos) => {
  return await prisma.empleado.update({
    where: { id: parseInt(id, 10) },
    data: nuevosDatos,
  });
};

export const eliminarEmpleadoPorId = async (id) => {
  return await prisma.empleado.update({
    where: { id: parseInt(id, 10) },
    data: { estado: false },
  });
};

module.exports = {
  crearEmpleado,
  editarEmpleado,
  listarEmpleados,
  listarEmpleadoPorId,
  actualizarEmpleadoPorId,
  eliminarEmpleadoPorId,
};
