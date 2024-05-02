import {
  crearArticulo,
  listarArticulos,
  obtenerArticuloPorId,
  actualizarArticulo,
  eliminarArticulo,
} from "../controllers/ArticuloControlador";
import { Router } from "express";
import { verificarAuth, isPropietario } from "../Middleware/verificarAuth.js";

const router = Router();

//Sólo propietario
router.post("/articulo/crear",/* verificarAuth, isPropietario, */crearArticulo);
router.put("/articulo/actualizar/:id", verificarAuth, isPropietario, actualizarArticulo);
router.delete("/articulo/eliminar/:id", verificarAuth, isPropietario, eliminarArticulo);

//Propietario y empleado
router.get("/articulo/listar", verificarAuth, listarArticulos);
router.get("/articulo/listar/:id", verificarAuth, obtenerArticuloPorId);


export default router;
