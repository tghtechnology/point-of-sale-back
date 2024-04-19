import { crearRecibo, listarRecibo,Reembolsar } from "../Services/ReciboServicio";
import { Router } from "express";

const routerRecibo =Router()

//routerRecibo.post("/recibo/:id", crearRecibo)
routerRecibo.get("/recibo", listarRecibo)
routerRecibo.post("/reembolsar",Reembolsar)

export default routerRecibo