import {
  crearUsuario,
  listaPaises,
  verificarContrasena,
  eliminarTemporalmente,
  restaurarCuenta,
  eliminarCuentasVencidas,
  eliminarPermanentemente,
} from "../controllers/UsuarioControlador";
const verificarAuth = require('../Middleware/verificarAuth.js')
import { Router } from "express";

const routerUsuario = Router();
//REGISTRO DE USUARIO
routerUsuario.post("/registro", crearUsuario);
routerUsuario.get("/listaPaises", listaPaises);
//RUTAS PARA ELIMINACIÓN DE CUENTA
routerUsuario.post("/eliminar-temporal", verificarAuth, eliminarTemporalmente);
routerUsuario.post("/restaurar-cuenta/:id", verificarAuth, restaurarCuenta);
routerUsuario.post("/eliminar-cuenta-vencida/:id", verificarAuth, eliminarCuentasVencidas);
routerUsuario.post("/eliminar-permanente", verificarAuth, eliminarPermanentemente);

export default routerUsuario;
