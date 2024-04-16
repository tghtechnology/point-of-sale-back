import { crearRecibo, listarRecibo } from "../Services/ReciboServicio";
import { Router } from "express";

const routerRecibo =Router()

routerRecibo.post("/recibo/:id", crearRecibo)
routerRecibo.get("/recibo", listarRecibo)

export default routerRecibo