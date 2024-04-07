import {
  crearArticulo,
  listarArticulos,
  obtenerArticuloPorId,
  actualizarArticulo,
  eliminarArticulo,
} from "../controllers/ArticuloControlador";
import { Router } from "express";
const verificarAuth = require('../Middleware/verificarAuth.js')
const router = Router();
//router.use(verificarAuth)

router.get("/articulo/listar", verificarAuth, listarArticulos);
router.post("/articulo/crear", verificarAuth, crearArticulo);
router.get("/articulo/listar/:id", verificarAuth, obtenerArticuloPorId);
router.put("/articulo/actualizar/:id", verificarAuth, actualizarArticulo);
router.delete("/articulo/eliminar/:id", verificarAuth, eliminarArticulo);

export default router;
