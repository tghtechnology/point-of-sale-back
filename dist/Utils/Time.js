"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUTCTime = exports.getPeruTime = void 0;
/**
 * Convierte una fecha y hora a UTC.
 * 
 * @param {string} dateTimeString - La cadena de fecha y hora a convertir. Debe ser 
 * un formato reconocible por el constructor `Date` de JavaScript.
 *
 * @returns {Date} - Devuelve un objeto `Date` ajustado a UTC.
 * 
 * @throws {Error} - Si la cadena de entrada no puede convertirse a un objeto `Date`.
 */
var getUTCTime = exports.getUTCTime = function getUTCTime(dateTimeString) {
  var dt = new Date(dateTimeString);
  var dtNumber = dt.getTime();
  var dtOffset = dt.getTimezoneOffset() * 60000;
  var dtUTC = new Date();
  dtUTC.setTime(dtNumber - dtOffset);
  return dtUTC;
};

/**
 * Obtiene la fecha y hora actual ajustada a la zona horaria de Perú.
 * 
 * @returns {Date} - Devuelve un objeto `Date` que representa la fecha y hora actual 
 * ajustada a la zona horaria de Perú.
 */

var getPeruTime = exports.getPeruTime = function getPeruTime() {
  var ahoraUTC = new Date();
  var diffHorariaPeru = -5;
  var fechaAhora = new Date(ahoraUTC.getTime() + diffHorariaPeru * 60 * 60 * 1000);
  return fechaAhora;
};