import { PrismaClient } from "@prisma/client";
import { verificarAuth } from "./verificarAuth";
const prisma = new PrismaClient();

export const asociarPOS = async () => {
    const idUsuario = await verificarAuth()
}