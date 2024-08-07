import {
  crearUsuario,
  listaPaises,
  listarUsuarios,
  restaurarCuenta,
  eliminarTemporalmente,
  eliminarCuentasVencidas,
  eliminarPermanentemente,
  cambiarContraseña,
  editarUsuarioPorId
} from "../controllers/UsuarioControlador";
import { verificarAuth, isPropietario } from "../Middleware/verificarAuth";
import { Router } from "express";

const routerUsuario = Router();
//REGISTRO DE USUARIO
routerUsuario.post("/registro", crearUsuario);
routerUsuario.get("/listaPaises", listaPaises);
routerUsuario.get("/usuario", listarUsuarios);
routerUsuario.put("/editar/:id", editarUsuarioPorId);
routerUsuario.put("/usuario/:id/cambiarPass", cambiarContraseña);


//RUTAS PARA ELIMINACIÓN DE CUENTA
routerUsuario.post("/eliminar-temporal", verificarAuth, isPropietario, eliminarTemporalmente);
routerUsuario.post("/eliminar-cuenta-vencida/:id", verificarAuth, eliminarCuentasVencidas);
routerUsuario.post("/restaurar-cuenta/:id", verificarAuth, isPropietario, restaurarCuenta);
routerUsuario.post("/eliminar-permanente", verificarAuth, isPropietario, eliminarPermanentemente);

export default routerUsuario;