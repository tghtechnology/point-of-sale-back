import { CrearVenta, ListarVentas,ObtenerVentaPorId } from "../controllers/VentaControlador";
import { crearRecibo } from "../Services/ReciboServicio";
import { Router } from "express";

const routerVenta =Router()

routerVenta.post("/venta", CrearVenta, crearRecibo)
routerVenta.get("/venta", ListarVentas)
routerVenta.get("/venta/:id",ObtenerVentaPorId)


export default routerVenta