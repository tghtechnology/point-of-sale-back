"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _DescuentoControlador = require("../controllers/DescuentoControlador");
var _express = require("express");
var routerDescuento = (0, _express.Router)();
//DESCUENTO CRUD
routerDescuento.post("/descuento", _DescuentoControlador.crearDescuento);
routerDescuento.get("/descuento", _DescuentoControlador.obtenerDescuentos);
routerDescuento.get("/descuento/:id", _DescuentoControlador.obtenerDescuentoById);
routerDescuento.put("/descuento/:id", _DescuentoControlador.modificarDescuento);
routerDescuento["delete"]("/descuento/:id", _DescuentoControlador.eliminarDescuento);
routerDescuento.get("/descuentosEliminados", _DescuentoControlador.obtenerDescuentosEliminados);
// Ruta para desactivar y activar descuento
routerDescuento.put("/descuento/:id/cambiar-estado", _DescuentoControlador.cambiarEstadoDescuento);
var _default = exports["default"] = routerDescuento;