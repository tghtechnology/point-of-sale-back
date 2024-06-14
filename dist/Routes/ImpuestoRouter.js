"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _ImpuestoControlador = require("../controllers/ImpuestoControlador");
var _express = require("express");
var _verificarAuth = require("../Middleware/verificarAuth");
var router = (0, _express.Router)();

//Sólo propietario
router.post('/impuesto/crear', _verificarAuth.verificarAuth, _verificarAuth.isPropietario, _ImpuestoControlador.crearImpuesto);
router.put('/impuesto/actualizar/:id', _verificarAuth.verificarAuth, _verificarAuth.isPropietario, _ImpuestoControlador.actualizarImpuesto);
router["delete"]('/impuesto/eliminar/:id', _verificarAuth.verificarAuth, _verificarAuth.isPropietario, _ImpuestoControlador.eliminarImpuesto);
router.get('/impuesto/listar', _verificarAuth.verificarAuth, _ImpuestoControlador.listarImpuestos);
router.get('/impuesto/listar/:id', _verificarAuth.verificarAuth, _ImpuestoControlador.listarImpuestoPorId);
var _default = exports["default"] = router;