import {
  crearUsuario,
  listaPaises,
  verificarContrasena,
  eliminarTemporalmente,
  restaurarCuenta,
  eliminarCuentasVencidas,
  eliminarPermanentemente,
} from "../controllers/UsuarioControlador";
import { Router } from "express";

const routerUsuario = Router();
//REGISTRO DE USUARIO
routerUsuario.post("/registro", crearUsuario);
routerUsuario.get("/listaPaises", listaPaises);
//RUTAS PARA ELIMINACIÓN DE CUENTA
routerUsuario.post("/verificar/:id", verificarContrasena);
routerUsuario.post("/eliminar-temporal/:id", eliminarTemporalmente);
routerUsuario.post("/restaurar-cuenta/:id", restaurarCuenta);
routerUsuario.post("/eliminar-cuenta-vencida/:id", eliminarCuentasVencidas);
routerUsuario.post("/eliminar-permanente/:id", eliminarPermanentemente);

export default routerUsuario;
