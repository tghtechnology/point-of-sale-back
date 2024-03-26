"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _UsuarioControlador = require("../controllers/UsuarioControlador");
var _express = require("express");
var routerUsuario = (0, _express.Router)();
//REGISTRO DE USUARIO
routerUsuario.post("/registro", _UsuarioControlador.crearUsuario);
routerUsuario.get("/listaPaises", _UsuarioControlador.listaPaises);
//RUTAS PARA ELIMINACIÓN DE CUENTA
routerUsuario.post("/verificar/:id", _UsuarioControlador.verificarContrasena);
routerUsuario.post("/eliminar-temporal/:id", _UsuarioControlador.eliminarTemporalmente);
routerUsuario.post("/restaurar-cuenta/:id", _UsuarioControlador.restaurarCuenta);
routerUsuario.post("/eliminar-cuenta-vencida/:id", _UsuarioControlador.eliminarCuentasVencidas);
routerUsuario.post("/eliminar-permanente/:id", _UsuarioControlador.eliminarPermanentemente);
var _default = exports["default"] = routerUsuario;