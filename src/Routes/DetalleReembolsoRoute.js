import { Router } from "express";
import { CrearDetalleReembolso, ListarDetallesReembolso, ListarDetallesReembolsoByRecibo, ListarDetallesReembolsoById } from "../controllers/DetalleReembolsoControlador";

const routerDetalleReembolso = Router();

routerDetalleReembolso.get("/reembolso", ListarDetallesReembolso)
routerDetalleReembolso.post("/reembolso", CrearDetalleReembolso)
routerDetalleReembolso.get("/reembolso/recibo/:reciboId", ListarDetallesReembolsoByRecibo)
routerDetalleReembolso.get("/reembolso/:id", ListarDetallesReembolsoById)

export default routerDetalleReembolso;