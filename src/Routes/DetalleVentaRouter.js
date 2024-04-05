import { CrearDetalle } from "../controllers/DetalleVentaControlador";
import { Router } from "express";

const routerDetalleVenta = Router();

routerDetalleVenta.post("/detalle", CrearDetalle);
export default routerDetalleVenta;