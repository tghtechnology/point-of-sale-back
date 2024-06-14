"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _DetalleReembolsoControlador = require("../controllers/DetalleReembolsoControlador");
var routerDetalleReembolso = (0, _express.Router)();
routerDetalleReembolso.get("/reembolso", _DetalleReembolsoControlador.ListarDetallesReembolso);
routerDetalleReembolso.post("/reembolso", _DetalleReembolsoControlador.CrearDetalleReembolso);
routerDetalleReembolso.get("/reembolso/recibo/:reciboId", _DetalleReembolsoControlador.ListarDetallesReembolsoByRecibo);
routerDetalleReembolso.get("/reembolso/:id", _DetalleReembolsoControlador.ListarDetallesReembolsoById);
var _default = exports["default"] = routerDetalleReembolso;