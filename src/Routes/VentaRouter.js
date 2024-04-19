import { CrearVenta, ListarVentas,ObtenerVentaPorId } from "../controllers/VentaControlador";
import { CrearRecibo } from "../controllers/ReciboControlador";
import { Router } from "express";

const routerVenta =Router()

routerVenta.post("/venta", CrearVenta, CrearRecibo)
routerVenta.get("/venta", ListarVentas)
routerVenta.get("/venta/:id",ObtenerVentaPorId)


export default routerVenta