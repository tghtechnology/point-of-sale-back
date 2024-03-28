import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

//Lógica para listar impuestos
export const toList = async () => {
    const impuestos = await prisma.impuesto.findMany({
        where: {
        estado: true
        },
        select: {
            id: true,
            nombre: true,
            tasa: true,
            tipo_impuesto: true,
        }
    })
    return impuestos
}

//Lógica para listar un impuesto
export const toListById = async (id) => {
    const impuesto = await prisma.impuesto.findUnique({
        where: {
        id: parseInt(id),
        estado: true
        },
        select: {
            id: true,
            nombre: true,
            tasa: true,
            tipo_impuesto: true,
        }
    })
    return impuesto
}