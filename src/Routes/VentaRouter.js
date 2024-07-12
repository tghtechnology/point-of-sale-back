import { CrearVenta, ListarVentas,ObtenerVentaPorId } from "../controllers/VentaControlador";
import { Router } from "express";
import { verificarAuth, isPropietario } from "../Middleware/verificarAuth";

const routerVenta =Router()

routerVenta.post("/venta", verificarAuth, CrearVenta)
routerVenta.get("/venta", verificarAuth, ListarVentas)
routerVenta.get("/venta/:id", verificarAuth, ObtenerVentaPorId)


export default routerVenta