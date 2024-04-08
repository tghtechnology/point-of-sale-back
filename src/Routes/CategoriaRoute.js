import {
  crearCategoria,
  listarCategorias,
  obtenerCategoriaPorId,
  actualizarCategoria,
  eliminarCategoria
} from "../controllers/CategoriaControlador";
import { Router } from "express";
import { verificarAuth, isPropietario } from "../Middleware/verificarAuth";
const router = Router();

//Sólo propietario
router.post("/categoria/crear", verificarAuth, isPropietario, crearCategoria);
router.put("/categoria/actualizar/:id", verificarAuth, isPropietario, actualizarCategoria);
router.delete("/categoria/eliminar/:id", verificarAuth, isPropietario, eliminarCategoria);

router.get("/categoria/listar", verificarAuth, listarCategorias);
router.get("/categoria/listar/:id", verificarAuth, obtenerCategoriaPorId);

export default router;
