import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const crearRecibo = async (id_venta) => {
    const recibo = prisma.recibo.create({
        data: {
            id_venta: id_venta
        }
    })

    //Busca venta
    


}