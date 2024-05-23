import {
  login,
  logout,
  enviarTokenCambioPassword,
  cambiarPassword,
  obtenerDatosUsuarioPorId,
} from "../controllers/AuthControlador";
import { Router } from "express";
import { verificarAuth } from "../Middleware/verificarAuth";
const routerAuth = Router();

routerAuth.post("/login", login);
routerAuth.post("/logout", verificarAuth, logout);
routerAuth.post("/envioCorreo", enviarTokenCambioPassword);
routerAuth.post("/cambiarPassword", cambiarPassword);
routerAuth.get("/usuario/:id", verificarAuth, obtenerDatosUsuarioPorId);

export default routerAuth;