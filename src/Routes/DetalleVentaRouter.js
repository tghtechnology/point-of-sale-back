import { CrearDetalle,ListarDetalles,ListarDetallesByVenta,DetalleById } from "../controllers/DetalleVentaControlador";
import { Router } from "express";
import { verificarAuth, isPropietario } from "../Middleware/verificarAuth";

const routerDetalleVenta = Router();

routerDetalleVenta.get("/detalle", verificarAuth, isPropietario, ListarDetalles)
routerDetalleVenta.post("/detalle", verificarAuth, isPropietario, CrearDetalle);
routerDetalleVenta.get("/detalle/venta/:ventaId", verificarAuth, isPropietario, ListarDetallesByVenta);
routerDetalleVenta.get("/detalle/:id",verificarAuth, isPropietario, DetalleById);

export default routerDetalleVenta;