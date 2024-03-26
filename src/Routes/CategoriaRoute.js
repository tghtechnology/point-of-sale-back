import {
  crearCategoria,
  listarCategorias,
  obtenerCategoriaPorId,
  actualizarCategoria,
  eliminarCategoria,
} from "../controllers/CategoriaControlador";
import { Router } from "express";

const router = Router();

router.get("/categoria/listar", listarCategorias);
router.post("/categoria/crear", crearCategoria);
router.get("/categoria/listar/:text_id", obtenerCategoriaPorId);
router.put("/categoria/actualizar/:text_id", actualizarCategoria);
router.delete("/categoria/eliminar/:text_id", eliminarCategoria);
export default router;
