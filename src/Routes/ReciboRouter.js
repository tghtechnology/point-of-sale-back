import { crearRecibo, ListarRecibo,Reembolsar, ListarReciboById, ListarRecibosByVenta } from "../controllers/ReciboControlador";
import { Router } from "express";
import { verificarAuth, isPropietario } from "../Middleware/verificarAuth";

const routerRecibo =Router()

//routerRecibo.post("/recibo/:id", crearRecibo)
routerRecibo.get("/recibo", verificarAuth, isPropietario, ListarRecibo)
routerRecibo.post("/reembolsar", verificarAuth, isPropietario, Reembolsar)
routerRecibo.get("/recibo/:id",verificarAuth, isPropietario, ListarReciboById)
routerRecibo.get("/recibo/venta/:id_venta", verificarAuth, isPropietario, ListarRecibosByVenta)
export default routerRecibo