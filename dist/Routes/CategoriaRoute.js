"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _CategoriaControlador = require("../controllers/CategoriaControlador");
var _express = require("express");
var _verificarAuth = require("../Middleware/verificarAuth");
var router = (0, _express.Router)();

//Sólo propietario
router.post("/categoria/crear", _verificarAuth.verificarAuth, _verificarAuth.isPropietario, _CategoriaControlador.crearCategoria);
router.put("/categoria/actualizar/:id", _verificarAuth.verificarAuth, _verificarAuth.isPropietario, _CategoriaControlador.actualizarCategoria);
router["delete"]("/categoria/eliminar/:id", _verificarAuth.verificarAuth, _verificarAuth.isPropietario, _CategoriaControlador.eliminarCategoria);
router.get("/categoria/listar", _verificarAuth.verificarAuth, _CategoriaControlador.listarCategorias);
router.get("/categoria/listar/:id", _verificarAuth.verificarAuth, _CategoriaControlador.obtenerCategoriaPorId);
var _default = exports["default"] = router;