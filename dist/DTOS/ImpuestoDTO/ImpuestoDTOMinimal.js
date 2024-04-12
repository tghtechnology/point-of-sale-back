"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DTOFormat = void 0;
//Formato para el json de respuesta
var DTOFormat = exports.DTOFormat = function DTOFormat(id, nombre, tasa, tipo_impuesto) {
  var Formato = {
    id: id,
    nombre: nombre,
    tasa: tasa,
    tipo_impuesto: tipo_impuesto
  };
  return Formato;
};