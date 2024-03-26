import { PrismaClient } from "@prisma/client";
//Inicialización de prisma
const prisma = new PrismaClient();

// Create a new employee
export const crearEmpleado = async (
  nombre,
  correo,
  telefono,
  estado,
  cargo
) => {
  const newEmpleado = await prisma.empleado.create({
    data: {
      nombre: nombre,
      correo: correo,
      telefono: telefono,
      estado: estado,
      cargo: cargo,
    },
  });
  return newEmpleado;
};

// Update an employee
export const editarEmpleado = async (
  id,
  nombre,
  correo,
  telefono,
  estado,
  cargo
) => {
  const empleado = await prisma.empleado.findUnique({
    where: {
      id: id,
    },
  });

  if (!empleado) {
    return null;
  }

  return await prisma.empleado.update({
    where: {
      id: id,
    },
    data: {
      nombre: nombre || empleado.nombre,
      correo: correo || empleado.correo,
      telefono: telefono || empleado.telefono,
      estado: estado || empleado.estado,
      cargo: cargo || empleado.cargo,
    },
  });
};

// Get all employees
export const listarEmpleados = async () => {
  return await prisma.empleado.findMany();
};

// Get an employee by ID
export const listarEmpleadoPorId = async (id) => {
  return await prisma.empleado.findUnique({
    where: {
      id: id,
    },
  });
};

// Update an employee by ID
export const actualizarEmpleadoPorId = async (id, nuevosDatos) => {
  const empleado = await prisma.empleado.findUnique({
    where: {
      id: id,
    },
  });

  if (!empleado) {
    return null;
  }

  return await prisma.empleado.update({
    where: {
      id: id,
    },
    data: nuevosDatos,
  });
};

// Delete an employee by ID
export const eliminarEmpleadoPorId = async (id) => {
  const empleado = await prisma.empleado.findUnique({
    where: {
      id: id,
    },
  });

  if (!empleado) {
    return null;
  }

  return await prisma.empleado.delete({
    where: {
      id: id,
    },
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
