import { login,logout,enviarTokenCambioPassword,cambiarPassword,verificarSesion } from '../controllers/AuthControlador';
import { Router } from 'express';

const routerAuth = Router();
//VERIFICAR SESION
routerAuth.get('/verificarSesion',verificarSesion) 

//SISTEMA DE ACCESO AL USUARIO
routerAuth.post('/login',login)
routerAuth.post('/logout',logout)
routerAuth.post('/envioCorreo',enviarTokenCambioPassword)
routerAuth.post('/cambiarPassword',cambiarPassword)

export default routerAuth;