import {
    listarPOS, listarPOSPorId, eliminarPOS, reestablecerPOS, listarPosEliminados, listarPosEliminadosPorId
  } from "../controllers/PuntoDeVentaControlador";
  import { Router } from "express";
  import { verificarAuth, isAdmin } from "../Middleware/verificarAuth";
  const router = Router();
  
  //Sólo admin
  //router.put("/categoria/actualizar/:id", verificarAuth, isPropietario, actualizarCategoria);
  router.delete("/pos/:id", verificarAuth, isAdmin, eliminarPOS);
  router.get("/pos", verificarAuth, isAdmin, listarPOS);
  router.get("/pos/:id", verificarAuth, isAdmin, listarPOSPorId);
  router.put("/pos/:id", verificarAuth, isAdmin, reestablecerPOS)
  router.get("/deleted/pos", verificarAuth, isAdmin, listarPosEliminados)
  router.get("/deleted/pos/:id", verificarAuth, isAdmin, listarPosEliminadosPorId)
  
  export default router;
  