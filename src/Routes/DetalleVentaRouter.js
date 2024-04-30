import { CrearDetalle,ListarDetalles,ListarDetallesByVenta } from "../controllers/DetalleVentaControlador";
import { Router } from "express";

const routerDetalleVenta = Router();

routerDetalleVenta.get("/detalle",ListarDetalles)
routerDetalleVenta.post("/detalle", CrearDetalle);
routerDetalleVenta.get("/detalle/venta/:ventaId", ListarDetallesByVenta);

export default routerDetalleVenta;