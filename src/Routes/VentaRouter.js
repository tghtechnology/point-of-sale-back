import { CrearVenta } from "../controllers/VentaControlador";
import { Router } from "express";

const routerVenta =Router()

routerVenta.post("/venta", CrearVenta)

export default routerVenta