"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _ReciboControlador = require("../controllers/ReciboControlador");
var _express = require("express");
var _verificarAuth = require("../Middleware/verificarAuth");
var routerRecibo = (0, _express.Router)();
routerRecibo.post("/recibo", _verificarAuth.verificarAuth, _ReciboControlador.CrearRecibo);
routerRecibo.get("/recibo", _verificarAuth.verificarAuth, _ReciboControlador.ListarRecibo);
routerRecibo.post("/reembolsar", _verificarAuth.verificarAuth, _ReciboControlador.Reembolsar);
routerRecibo.get("/recibo/:id", _verificarAuth.verificarAuth, _ReciboControlador.ListarReciboById);
routerRecibo.get("/recibo/venta/:id_venta", _verificarAuth.verificarAuth, _ReciboControlador.ListarRecibosByVenta);
var _default = exports["default"] = routerRecibo;