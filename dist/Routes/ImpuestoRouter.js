"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _ImpuestoControlador = require("../controllers/ImpuestoControlador");
var _express = require("express");
var router = (0, _express.Router)();
router.get("/impuesto/listar", _ImpuestoControlador.listarImpuestos);
router.post("/impuesto/crear", _ImpuestoControlador.crearImpuesto);
router.get("/impuesto/listar/:id", _ImpuestoControlador.listarImpuestoPorId);
router.put("/impuesto/actualizar/:id", _ImpuestoControlador.actualizarImpuesto);
router["delete"]("/impuesto/eliminar/:id", _ImpuestoControlador.eliminarImpuesto);
var _default = exports["default"] = router;