"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _UsuarioControlador = require("../controllers/UsuarioControlador");
var _verificarAuth = require("../Middleware/verificarAuth");
var _express = require("express");
var routerUsuario = (0, _express.Router)();
//REGISTRO DE USUARIO
routerUsuario.post("/registro", _UsuarioControlador.crearUsuario);
routerUsuario.get("/listaPaises", _UsuarioControlador.listaPaises);
routerUsuario.get("/usuario", _UsuarioControlador.listarUsuarios);
routerUsuario.put("/editar/:id", _UsuarioControlador.editarUsuarioPorId);
routerUsuario.put("/usuario/:id/cambiarPass", _UsuarioControlador.cambiarContraseña);

//RUTAS PARA ELIMINACIÓN DE CUENTA
routerUsuario.post("/eliminar-temporal", _verificarAuth.verificarAuth, _verificarAuth.isPropietario, _UsuarioControlador.eliminarTemporalmente);
routerUsuario.post("/eliminar-cuenta-vencida/:id", _verificarAuth.verificarAuth, _UsuarioControlador.eliminarCuentasVencidas);
routerUsuario.post("/restaurar-cuenta/:id", _verificarAuth.verificarAuth, _verificarAuth.isPropietario, _UsuarioControlador.restaurarCuenta);
routerUsuario.post("/eliminar-permanente", _verificarAuth.verificarAuth, _verificarAuth.isPropietario, _UsuarioControlador.eliminarPermanentemente);
var _default = exports["default"] = routerUsuario;