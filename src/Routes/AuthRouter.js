import {
  login,
  logout,
  enviarTokenCambioPassword,
  cambiarPassword,
  verificarSesion,
} from "../controllers/AuthControlador";
import { Router } from "express";
const verificarAuth = require('../Middleware/verificarAuth.js')
const routerAuth = Router();

//SISTEMA DE ACCESO AL USUARIO

routerAuth.post("/login", login);
routerAuth.post("/logout", verificarAuth, logout);
routerAuth.post("/envioCorreo", verificarAuth, enviarTokenCambioPassword);
routerAuth.post("/cambiarPassword", verificarAuth, cambiarPassword);

export default routerAuth;
