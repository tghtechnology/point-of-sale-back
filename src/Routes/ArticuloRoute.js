import {
  crearArticulo,
  listarArticulos,
  obtenerArticuloPorId,
  actualizarArticulo,
  eliminarArticulo,
} from "../controllers/ArticuloControlador";
import { Router } from "express";
import { isAuthenticated } from "../Middleware/auth.js";
import { verificarSesion } from "../Middleware/verificarSesion.js";

const router = Router();

router.get("/articulo/listar", isAuthenticated, listarArticulos);
router.post("/articulo/crear", crearArticulo);
router.get("/articulo/listar/:id", obtenerArticuloPorId);
router.put("/articulo/actualizar/:id", actualizarArticulo);
router.delete("/articulo/eliminar/:id", eliminarArticulo);

export default router;
