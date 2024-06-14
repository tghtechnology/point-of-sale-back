"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.options = void 0;
/**
 * Configuración de opciones para la documentación de la API utilizando OpenAPI.
 *
 * @type {Object}
 *
 * @description Este objeto define las opciones necesarias para la documentación de la API utilizando OpenAPI.
 * Define la versión de OpenAPI utilizada, la información básica de la API (título, versión, descripción),
 * y los servidores en los que se ejecuta la API.
 * Además, especifica los archivos de rutas que deben ser incluidos en la documentación de la API.
 **/
var options = exports.options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API",
      version: "1.0.0",
      description: "A simple express library API"
    },
    servers: [{
      url: "http://localhost:3000"
    }]
  },
  apis: ["./src/routes/**/*.js"]
};