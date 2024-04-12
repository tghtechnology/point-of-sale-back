import {
  crearDescuento,
  eliminarDescuento,
  modificarDescuento,
  obtenerDescuentoById,
  obtenerDescuentos,
  cambiarEstadoDescuento,
  obtenerDescuentosEliminados,
} from "../controllers/DescuentoControlador";
import { verificarAuth, isPropietario } from "../Middleware/verificarAuth";
import { Router } from "express";

const routerDescuento = Router();
//DESCUENTO CRUD

//Sólo propietario
routerDescuento.post("/descuento", verificarAuth, isPropietario, crearDescuento);
routerDescuento.put("/descuento/:id", verificarAuth, isPropietario, modificarDescuento);
routerDescuento.delete("/descuento/:id", verificarAuth, isPropietario, eliminarDescuento);
// Ruta para desactivar y activar descuento
routerDescuento.put("/descuento/:id/cambiar-estado", verificarAuth, isPropietario, cambiarEstadoDescuento);

routerDescuento.get("/descuento", verificarAuth, obtenerDescuentos);
routerDescuento.get("/descuento/:id", verificarAuth, obtenerDescuentoById);
routerDescuento.get("/descuentosEliminados", verificarAuth, obtenerDescuentosEliminados);

export default routerDescuento;
