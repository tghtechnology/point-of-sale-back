"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validarNombrePais = exports.obtenerListaPaises = void 0;
// Importación de la librería i18n-iso-countries
var paises = require("i18n-iso-countries");

// Registro del idioma español para la librería de países
paises.registerLocale(require("i18n-iso-countries/langs/es.json"));

// Función para validar si un nombre de país es válido
var validarNombrePais = exports.validarNombrePais = function validarNombrePais(pais) {
  var listaPaises = paises.getNames("es");
  return Object.values(listaPaises).includes(pais);
};

// Función para obtener la lista de nombres de todos los países disponibles
var obtenerListaPaises = exports.obtenerListaPaises = function obtenerListaPaises() {
  return Object.values(paises.getNames("es", {
    select: "official"
  }));
};