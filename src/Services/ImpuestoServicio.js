import { PrismaClient } from "@prisma/client";
import * as DTOInsert from "../DTOS/ImpuestoDTO/ImpuestoDTOForInsert"
import * as DTOMin from "../DTOS/ImpuestoDTO/ImpuestoDTOMinimal"
import * as DTOList from "../DTOS/ImpuestoDTO/ImpuestoDTOForList"

const prisma = new PrismaClient();


export const crearImpuesto = async (nombre, tasa, tipo_impuesto) => {
    
    const imp = await DTOInsert.toCreate(nombre, tasa, tipo_impuesto)
    const impuestoFormato = DTOMin.DTOFormat(imp.id, imp.nombre, imp.tasa, imp.tipo_impuesto);

    return impuestoFormato
}

export const listarImpuestos = async () => {

    const impuestos = await DTOList.toList()
    return impuestos
}

export const listarImpuestoPorId = async (id) => {

    const impuesto = await DTOList.toListById(id)
    return impuesto
}

export const modificarImpuesto = async (id, nombre, tasa, tipo_impuesto) => {

    const imp = await DTOInsert.toEdit(id, nombre, tasa, tipo_impuesto)
    const impuestoFormato = DTOMin.DTOFormat(imp.id, imp.nombre, imp.tasa, imp.tipo_impuesto);
    return impuestoFormato
}

export const eliminarImpuesto = async (id) => {
    const impuesto = await prisma.impuesto.update({
        where: {
          id: parseInt(id),
          estado: true
        },
        data: {
            estado: false
        }
      })
      return impuesto
}