"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _ArticuloControlador = require("../controllers/ArticuloControlador");
var _express = require("express");
var _verificarAuth = require("../Middleware/verificarAuth.js");
var router = (0, _express.Router)();

//Sólo propietario
router.post("/articulo/crear", _verificarAuth.verificarAuth, _verificarAuth.isPropietario, _ArticuloControlador.crearArticulo);
router.put("/articulo/actualizar/:id", _verificarAuth.verificarAuth, _verificarAuth.isPropietario, _ArticuloControlador.actualizarArticulo);
router["delete"]("/articulo/eliminar/:id", _verificarAuth.verificarAuth, _verificarAuth.isPropietario, _ArticuloControlador.eliminarArticulo);

//Propietario y empleado
router.get("/articulo/listar", _verificarAuth.verificarAuth, _ArticuloControlador.listarArticulos);
router.get("/articulo/listar/:id", _verificarAuth.verificarAuth, _ArticuloControlador.obtenerArticuloPorId);
var _default = exports["default"] = router;