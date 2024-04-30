import {
  crearUsuario,
  listaPaises,
  editarUsuarioPorId,
  listarUsuarios,
  cambiarContraseña,
  eliminarTemporalmente,
  restaurarCuenta,
  eliminarCuentasVencidas,
  eliminarPermanentemente,
} from "../controllers/UsuarioControlador";
import { verificarAuth, isPropietario } from "../Middleware/verificarAuth";
import { Router } from "express";

const routerUsuario = Router();
//REGISTRO DE USUARIO
routerUsuario.post("/registro", crearUsuario);
routerUsuario.put("/editar/:id", editarUsuarioPorId);
routerUsuario.put("/usuario/:id/cambiarPass", cambiarContraseña);
routerUsuario.get("/listaPaises", listaPaises);
routerUsuario.get("/listar", listarUsuarios);

//RUTAS PARA ELIMINACIÓN DE CUENTA
routerUsuario.post("/eliminar-temporal", verificarAuth, isPropietario, eliminarTemporalmente);
routerUsuario.post("/eliminar-cuenta-vencida/:id", verificarAuth, eliminarCuentasVencidas);
routerUsuario.post("/eliminar-permanente", verificarAuth, isPropietario, eliminarPermanentemente);

export default routerUsuario;
