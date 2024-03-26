import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

//Lógica para crear impuesto
export const toCreate = async (nombre, tasa, tipo_impuesto) => {

    const imp = await prisma.impuesto.create({
    data: {
      nombre: nombre, 
      tasa: tasa,
      tipo_impuesto: tipo_impuesto,
      estado: true
    }
  })
    return imp
}

//Lógica para editar impuesto
export const toEdit = async (id, nombre, tasa, tipo_impuesto) => {

    const impuestoExistente = await prisma.impuesto.findUnique({
        where: {
          id: parseInt(id)
        }
    })

    if (!impuestoExistente) { return null }

    const impuesto = await prisma.impuesto.update({
      where: {
        id: parseInt(id)
      },
      data: {
        nombre: nombre, 
        tasa: tasa,
        tipo_impuesto: tipo_impuesto,
      }
    })
    return impuesto
}