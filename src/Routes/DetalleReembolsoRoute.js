import { Router } from "express";
import { CrearDetalleReembolso, ListarDetallesReembolso, ListarDetallesReembolsoByRecibo, ListarDetallesReembolsoById } from "../controllers/DetalleReembolsoControlador";

const routerDetalleReembolso = Router();

routerDetalleReembolso.get("/detalleReembolso", ListarDetallesReembolso)
routerDetalleReembolso.post("/detalleReembolso", CrearDetalleReembolso)
routerDetalleReembolso.get("/detalleReembolso/recibo/:reciboId", ListarDetallesReembolsoByRecibo)
routerDetalleReembolso.get("/detalleReembolso/:id", ListarDetallesReembolsoById)

export default routerDetalleReembolso;