"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _PuntoDeVentaControlador = require("../controllers/PuntoDeVentaControlador");
var _express = require("express");
var _verificarAuth = require("../Middleware/verificarAuth");
var router = (0, _express.Router)();

//Sólo admin
//router.put("/categoria/actualizar/:id", verificarAuth, isPropietario, actualizarCategoria);
router["delete"]("/pos/:id", _verificarAuth.verificarAuth, _verificarAuth.isAdmin, _PuntoDeVentaControlador.eliminarPOS);
router.get("/pos", _verificarAuth.verificarAuth, _verificarAuth.isAdmin, _PuntoDeVentaControlador.listarPOS);
router.get("/pos/:id", _verificarAuth.verificarAuth, _verificarAuth.isAdmin, _PuntoDeVentaControlador.listarPOSPorId);
router.put("/pos/:id", _verificarAuth.verificarAuth, _verificarAuth.isAdmin, _PuntoDeVentaControlador.reestablecerPOS);
router.get("/deleted/pos", _verificarAuth.verificarAuth, _verificarAuth.isAdmin, _PuntoDeVentaControlador.listarPosEliminados);
router.get("/deleted/pos/:id", _verificarAuth.verificarAuth, _verificarAuth.isAdmin, _PuntoDeVentaControlador.listarPosEliminadosPorId);
var _default = exports["default"] = router;