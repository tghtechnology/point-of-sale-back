"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _ArticuloControlador = require("../controllers/ArticuloControlador");
var _express = require("express");
var router = (0, _express.Router)();
router.get("/articulo/listar", _ArticuloControlador.listarArticulos);
router.post("/articulo/crear", _ArticuloControlador.crearArticulo);
router.get("/articulo/listar/:text_id", _ArticuloControlador.obtenerArticuloPorId);
router.put("/articulo/actualizar/:text_id", _ArticuloControlador.actualizarArticulo);
router["delete"]("/articulo/eliminar/:text_id", _ArticuloControlador.eliminarArticulo);
var _default = exports["default"] = router;