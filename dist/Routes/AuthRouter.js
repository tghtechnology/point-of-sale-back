"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _AuthControlador = require("../controllers/AuthControlador");
var _express = require("express");
var routerAuth = (0, _express.Router)();
//VERIFICAR SESION
routerAuth.get("/verificarSesion", _AuthControlador.verificarSesion);

//SISTEMA DE ACCESO AL USUARIO

routerAuth.post("/login", _AuthControlador.login);
routerAuth.post("/logout", _AuthControlador.logout);
routerAuth.post("/envioCorreo", _AuthControlador.enviarTokenCambioPassword);
routerAuth.post("/cambiarPassword", _AuthControlador.cambiarPassword);
var _default = exports["default"] = routerAuth;