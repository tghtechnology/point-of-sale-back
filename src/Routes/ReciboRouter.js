import { CrearRecibo, ListarRecibo,Reembolsar, ListarReciboById, ListarRecibosByVenta } from "../controllers/ReciboControlador";
import { Router } from "express";
import { verificarAuth, isPropietario } from "../Middleware/verificarAuth";

const routerRecibo =Router()

routerRecibo.post("/recibo",verificarAuth, CrearRecibo)
routerRecibo.get("/recibo", verificarAuth, ListarRecibo)
routerRecibo.post("/reembolsar", verificarAuth, Reembolsar)
routerRecibo.get("/recibo/:id",verificarAuth, ListarReciboById)
routerRecibo.get("/recibo/venta/:id_venta", verificarAuth, ListarRecibosByVenta)
export default routerRecibo