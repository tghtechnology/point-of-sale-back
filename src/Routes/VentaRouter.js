import { CrearVenta, ListarVentas } from "../controllers/VentaControlador";
import { Router } from "express";

const routerVenta =Router()

routerVenta.post("/venta", CrearVenta)
routerVenta.get("/venta", ListarVentas)

export default routerVenta