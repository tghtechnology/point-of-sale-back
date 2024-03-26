import {
  crearArticulo,
  listarArticulos,
  obtenerArticuloPorId,
  actualizarArticulo,
  eliminarArticulo,
} from "../controllers/ArticuloControlador";
import { Router } from "express";

const router = Router();

router.get("/articulo/listar", listarArticulos);
router.post("/articulo/crear", crearArticulo);
router.get("/articulo/listar/:text_id", obtenerArticuloPorId);
router.put("/articulo/actualizar/:text_id", actualizarArticulo);
router.delete("/articulo/eliminar/:text_id", eliminarArticulo);

export default router;
