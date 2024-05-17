import { CrearDetalle,ListarDetalles,ListarDetallesByVenta,DetalleById } from "../controllers/DetalleVentaControlador";
import { Router } from "express";

const routerDetalleVenta = Router();

routerDetalleVenta.get("/detalle",ListarDetalles)
routerDetalleVenta.post("/detalle", CrearDetalle);
routerDetalleVenta.get("/detalle/venta/:ventaId", ListarDetallesByVenta);
routerDetalleVenta.get("/detalle/:id", DetalleById);

export default routerDetalleVenta;