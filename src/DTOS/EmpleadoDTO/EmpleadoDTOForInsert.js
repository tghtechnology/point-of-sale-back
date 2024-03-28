import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

//Lógica para crear Empleado
export const crearEmpleado = async (empleadoData) => {
    const newempleado = new crearEmpleado();
    const empleado = await empleado.create({
      data: {
        nombre: empleadoData.nombre,
        correo: empleadoData.correo,
        telefono: empleadoData.telefono,
        estado: empleadoData.estado || true,
        cargo: empleadoData.cargo,
      },
    });
  
    return newempleado;
  };

//Lógica para editar Empleado
export const editarEmpleado = async (id, empleadoData) => {
    const empleadoEditado = await empleado.update({
      where: { id: parseInt(id) },
      data: {
        nombre: empleadoData.nombre,
        correo: empleadoData.correo,
        telefono: empleadoData.telefono,
        estado: empleadoData.estado || true,
        cargo: empleadoData.cargo,
      },
    });
  
    return empleadoEditado;
  };