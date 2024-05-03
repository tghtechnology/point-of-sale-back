import { CrearVenta, ListarVentas,ObtenerVentaPorId } from "../controllers/VentaControlador";
import { Router } from "express";
import { verificarAuth, isPropietario } from "../Middleware/verificarAuth";

const routerVenta =Router()

routerVenta.post("/venta", verificarAuth, isPropietario, CrearVenta)
routerVenta.get("/venta", verificarAuth, isPropietario, ListarVentas)
routerVenta.get("/venta/:id", verificarAuth, isPropietario, ObtenerVentaPorId)


export default routerVenta