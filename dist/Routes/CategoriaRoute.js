"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _CategoriaControlador = require("../controllers/CategoriaControlador");
var _express = require("express");
var router = (0, _express.Router)();
router.get("/categoria/listar", _CategoriaControlador.listarCategorias);
router.post("/categoria/crear", _CategoriaControlador.crearCategoria);
router.get("/categoria/listar/:text_id", _CategoriaControlador.obtenerCategoriaPorId);
router.put("/categoria/actualizar/:text_id", _CategoriaControlador.actualizarCategoria);
router["delete"]("/categoria/eliminar/:text_id", _CategoriaControlador.eliminarCategoria);
var _default = exports["default"] = router;