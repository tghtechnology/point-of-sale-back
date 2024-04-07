import {
  crearDescuento,
  eliminarDescuento,
  modificarDescuento,
  obtenerDescuentoById,
  obtenerDescuentos,
  cambiarEstadoDescuento,
  obtenerDescuentosEliminados,
} from "../controllers/DescuentoControlador";
const verificarAuth = require('../Middleware/verificarAuth.js')
import { Router } from "express";

const routerDescuento = Router();
//DESCUENTO CRUD
routerDescuento.post("/descuento", verificarAuth, crearDescuento);
routerDescuento.get("/descuento", verificarAuth, obtenerDescuentos);
routerDescuento.get("/descuento/:id", verificarAuth, obtenerDescuentoById);
routerDescuento.put("/descuento/:id", verificarAuth, modificarDescuento);
routerDescuento.delete("/descuento/:id", verificarAuth, eliminarDescuento);
routerDescuento.get("/descuentosEliminados", verificarAuth, obtenerDescuentosEliminados);
// Ruta para desactivar y activar descuento
routerDescuento.put("/descuento/:id/cambiar-estado", cambiarEstadoDescuento);

export default routerDescuento;
