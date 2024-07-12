import { PrismaClient } from "@prisma/client";
import { verificarAuth } from "./verificarAuth";
const prisma = new PrismaClient();


/**
 * Asocia un punto de venta (POS) a un usuario autenticado.
 *
 * @returns {Promise<void>} - No devuelve ningún valor, pero puede lanzar errores si falla la autenticación.
 *
 * @description Esta función obtiene el ID de un usuario autenticado mediante la función `verificarAuth`
 * y lo utiliza para realizar operaciones adicionales relacionadas con la asociación de un punto de venta (POS).
 */
export const asociarPOS = async () => {
    const idUsuario = await verificarAuth()
}