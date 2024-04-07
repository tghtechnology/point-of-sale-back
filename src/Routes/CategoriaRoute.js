import {
  crearCategoria,
  listarCategorias,
  obtenerCategoriaPorId,
  actualizarCategoria,
  eliminarCategoria
} from "../controllers/CategoriaControlador";
import { Router } from "express";
const verificarAuth = require('../Middleware/verificarAuth.js')
const router = Router();

router.get("/categoria/listar", verificarAuth, listarCategorias);
router.post("/categoria/crear", verificarAuth, crearCategoria);
router.get("/categoria/listar/:id", verificarAuth, obtenerCategoriaPorId);
router.put("/categoria/actualizar/:id", verificarAuth, actualizarCategoria);
router.delete("/categoria/eliminar/:id", verificarAuth, eliminarCategoria);
export default router;
