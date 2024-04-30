import { CrearVenta, ListarVentas,ObtenerVentaPorId } from "../controllers/VentaControlador";
import { Router } from "express";

const routerVenta =Router()

routerVenta.post("/venta", CrearVenta)
routerVenta.get("/venta", ListarVentas)
routerVenta.get("/venta/:id",ObtenerVentaPorId)


export default routerVenta