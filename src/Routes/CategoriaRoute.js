import {
  crearCategoria,
  listarCategorias,
  obtenerCategoriaPorId,
  actualizarCategoria,
  eliminarCategoria
} from "../controllers/CategoriaControlador";
import { Router } from "express";

const router = Router();

router.get("/categoria/listar", listarCategorias);
router.post("/categoria/crear", crearCategoria);
router.get("/categoria/listar/:id", obtenerCategoriaPorId);
router.put("/categoria/actualizar/:id", actualizarCategoria);
router.delete("/categoria/eliminar/:id", eliminarCategoria);
//router.get("/categoria/buscar", buscarCategoria)
export default router;
