import { CrearDetalle,ListarDetalles,ListarDetallesByVenta,DetalleById } from "../controllers/DetalleVentaControlador";
import { Router } from "express";
import { verificarAuth, isPropietario } from "../Middleware/verificarAuth";

const routerDetalleVenta = Router();

routerDetalleVenta.get("/detalle", verificarAuth, ListarDetalles)
routerDetalleVenta.post("/detalle", verificarAuth, CrearDetalle);
routerDetalleVenta.get("/detalle/venta/:ventaId", verificarAuth, ListarDetallesByVenta);
routerDetalleVenta.get("/detalle/:id",verificarAuth, DetalleById);

export default routerDetalleVenta;