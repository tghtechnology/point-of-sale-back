"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _DescuentoControlador = require("../controllers/DescuentoControlador");
var _verificarAuth = require("../Middleware/verificarAuth");
var _express = require("express");
var routerDescuento = (0, _express.Router)();
//DESCUENTO CRUD

//Sólo propietario
routerDescuento.post("/descuento", _verificarAuth.verificarAuth, _verificarAuth.isPropietario, _DescuentoControlador.crearDescuento);
routerDescuento.put("/descuento/:id", _verificarAuth.verificarAuth, _verificarAuth.isPropietario, _DescuentoControlador.modificarDescuento);
routerDescuento["delete"]("/descuento/:id", _verificarAuth.verificarAuth, _verificarAuth.isPropietario, _DescuentoControlador.eliminarDescuento);
// Ruta para desactivar y activar descuento
routerDescuento.put("/descuento/:id/cambiar-estado", _verificarAuth.verificarAuth, _verificarAuth.isPropietario, _DescuentoControlador.cambiarEstadoDescuento);
routerDescuento.get("/descuento", _verificarAuth.verificarAuth, _DescuentoControlador.obtenerDescuentos);
routerDescuento.get("/descuento/:id", _verificarAuth.verificarAuth, _DescuentoControlador.obtenerDescuentoById);
routerDescuento.get("/descuentosEliminados", _verificarAuth.verificarAuth, _DescuentoControlador.obtenerDescuentosEliminados);
var _default = exports["default"] = routerDescuento;