import { crearRecibo, ListarRecibo,Reembolsar } from "../controllers/ReciboControlador";
import { Router } from "express";

const routerRecibo =Router()

//routerRecibo.post("/recibo/:id", crearRecibo)
routerRecibo.get("/recibo", ListarRecibo)
routerRecibo.post("/reembolsar",Reembolsar)

export default routerRecibo