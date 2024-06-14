"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.idSchema = exports.editCategorySchema = exports.createCategorySchema = void 0;
var _zod = require("zod");
//Validación para crear categoría
var createCategorySchema = exports.createCategorySchema = _zod.z.object({
  nombre: _zod.z.string().min(1, 'El campo nombre no puede estar vacío'),
  color: _zod.z.string().min(1, 'El campo color no puede estar vacío')
});

//Validación
var idSchema = exports.idSchema = _zod.z.object({
  id: _zod.z.string().refine(function (val) {
    return !isNaN(parseInt(val, 10)) && parseInt(val, 10) > 0;
  }, {
    message: 'El ID debe ser un número entero positivo'
  })
});
var editCategorySchema = exports.editCategorySchema = _zod.z.object({
  id: _zod.z.string().refine(function (val) {
    return !isNaN(parseInt(val, 10)) && parseInt(val, 10) > 0;
  }, {
    message: 'El ID debe ser un número entero positivo'
  }),
  nombre: _zod.z.string().min(1, 'El campo nombre no puede estar vacío'),
  color: _zod.z.string().min(1, 'El campo color no puede estar vacío')
});