import { login,logout,enviarPIN,verificarPIN,cambiarPassword } from '../controllers/AuthControlador';
import { crearUsuario,listaPaises, verificarContrasena, eliminarTemporalmente, restaurarCuenta, eliminarCuentasVencidas, eliminarPermanentemente} from "../controllers/UsuarioControlador"
import { Router } from 'express';

const routerUsuario = Router();
//REGISTRO DE USUARIO
routerUsuario.post('/registro',crearUsuario);
routerUsuario.get('/listaPaises',listaPaises)
//SISTEMA DE ACCESO AL USUARIO
routerUsuario.post('/login',login)
routerUsuario.post('/logout',logout)
routerUsuario.post('/enviarPin',enviarPIN)
routerUsuario.post('/verificarPin',verificarPIN)
routerUsuario.post('/cambiarPassword',cambiarPassword)

//RUTAS PARA ELIMINACIÓN DE CUENTA
routerUsuario.post("/verificar/:id", verificarContrasena)
routerUsuario.post("/eliminar-temporal/:id", eliminarTemporalmente)
routerUsuario.post("/restaurar-cuenta/:id", restaurarCuenta)
routerUsuario.post("/eliminar_cuenta-vencida/:id", eliminarCuentasVencidas)
routerUsuario.post("/eliminar-permanente/:id", eliminarPermanentemente)

export default routerUsuario;  
