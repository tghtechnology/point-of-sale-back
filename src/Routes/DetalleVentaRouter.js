import { CrearDetalle,ListarDetalles,ListarDetallesByVenta } from "../controllers/DetalleVentaControlador";
import { Router } from "express";
import { verificarAuth, isPropietario } from "../Middleware/verificarAuth";

const routerDetalleVenta = Router();

routerDetalleVenta.get("/detalle", verificarAuth, isPropietario, ListarDetalles)
routerDetalleVenta.post("/detalle", verificarAuth, isPropietario, CrearDetalle);
routerDetalleVenta.get("/detalle/venta/:ventaId", verificarAuth, isPropietario, ListarDetallesByVenta);

export default routerDetalleVenta;