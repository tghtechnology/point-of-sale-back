import { CrearDetalle,ListarDetalles } from "../controllers/DetalleVentaControlador";
import { Router } from "express";

const routerDetalleVenta = Router();

routerDetalleVenta.get("/detalle",ListarDetalles)
routerDetalleVenta.post("/detalle", CrearDetalle);
export default routerDetalleVenta;