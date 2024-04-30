import { crearRecibo, ListarRecibo,Reembolsar, ListarReciboById, ListarRecibosByVenta } from "../controllers/ReciboControlador";
import { Router } from "express";

const routerRecibo =Router()

//routerRecibo.post("/recibo/:id", crearRecibo)
routerRecibo.get("/recibo", ListarRecibo)
routerRecibo.post("/reembolsar",Reembolsar)
routerRecibo.get("/recibo/:id",ListarReciboById)
routerRecibo.get("/recibo/venta/:id_venta",ListarRecibosByVenta)
export default routerRecibo