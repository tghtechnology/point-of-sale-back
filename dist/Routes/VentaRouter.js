"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _VentaControlador = require("../controllers/VentaControlador");
var _express = require("express");
var _verificarAuth = require("../Middleware/verificarAuth");
var routerVenta = (0, _express.Router)();
routerVenta.post("/venta", _verificarAuth.verificarAuth, _VentaControlador.CrearVenta);
routerVenta.get("/venta", _verificarAuth.verificarAuth, _VentaControlador.ListarVentas);
routerVenta.get("/venta/:id", _verificarAuth.verificarAuth, _VentaControlador.ObtenerVentaPorId);
var _default = exports["default"] = routerVenta;