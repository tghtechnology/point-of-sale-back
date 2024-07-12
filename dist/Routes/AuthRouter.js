"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _AuthControlador = require("../controllers/AuthControlador");
var _express = require("express");
var _verificarAuth = require("../Middleware/verificarAuth");
var routerAuth = (0, _express.Router)();
routerAuth.post("/login", _AuthControlador.login);
routerAuth.post("/logout", _verificarAuth.verificarAuth, _AuthControlador.logout);
routerAuth.post("/envioCorreo", _AuthControlador.enviarTokenCambioPassword);
routerAuth.post("/cambiarPassword", _AuthControlador.cambiarPassword);
routerAuth.get("/usuario/:id", _verificarAuth.verificarAuth, _AuthControlador.obtenerDatosUsuarioPorId);
var _default = exports["default"] = routerAuth;