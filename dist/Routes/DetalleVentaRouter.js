"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _DetalleVentaControlador = require("../controllers/DetalleVentaControlador");
var _express = require("express");
var _verificarAuth = require("../Middleware/verificarAuth");
var routerDetalleVenta = (0, _express.Router)();
routerDetalleVenta.get("/detalle", _verificarAuth.verificarAuth, _DetalleVentaControlador.ListarDetalles);
routerDetalleVenta.post("/detalle", _verificarAuth.verificarAuth, _DetalleVentaControlador.CrearDetalle);
routerDetalleVenta.get("/detalle/venta/:ventaId", _verificarAuth.verificarAuth, _DetalleVentaControlador.ListarDetallesByVenta);
routerDetalleVenta.get("/detalle/:id", _verificarAuth.verificarAuth, _DetalleVentaControlador.DetalleById);
var _default = exports["default"] = routerDetalleVenta;