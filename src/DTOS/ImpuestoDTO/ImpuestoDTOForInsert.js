import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const toCreate = async (nombre, tasa, tipo_impuesto) => {
    
    const impuesto = await prisma.impuesto.create({
    data: {
      nombre: nombre, 
      tasa: tasa,
      tipo_impuesto: tipo_impuesto,
      estado: true
    }
  })
    return impuesto
}

export const toEdit = async (id, nombre, tasa, tipo_impuesto) => {

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
    //console.log(impuesto.id)
    return impuesto
}