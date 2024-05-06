import {
    listarPOS, listarPOSPorId, eliminarPOS
  } from "../controllers/PuntoDeVentaControlador";
  import { Router } from "express";
  import { verificarAuth, isAdmin } from "../Middleware/verificarAuth";
  const router = Router();
  
  //Sólo admin
  //router.put("/categoria/actualizar/:id", verificarAuth, isPropietario, actualizarCategoria);
  router.delete("/pos/:id", verificarAuth, isAdmin, eliminarPOS);
  router.get("/pos", verificarAuth, isAdmin, listarPOS);
  router.get("/pos/:id", verificarAuth, isAdmin, listarPOSPorId);
  
  export default router;
  