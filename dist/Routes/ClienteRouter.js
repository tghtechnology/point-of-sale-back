"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _ClienteControlador = require("../controllers/ClienteControlador");
var _express = require("express");
var _verificarAuth = require("../Middleware/verificarAuth");
var routerCliente = (0, _express.Router)();
routerCliente.get('/listaPaises', _ClienteControlador.listaPaises);
//RUTAS DE CLIENTES

//Sólo propietario
routerCliente.post('/cliente', _verificarAuth.verificarAuth, _ClienteControlador.crearCliente);
routerCliente.put('/cliente/:id', _verificarAuth.verificarAuth, _ClienteControlador.editarCliente);
routerCliente["delete"]('/cliente/:id', _verificarAuth.verificarAuth, _verificarAuth.isPropietario, _ClienteControlador.eliminarCliente);
routerCliente.get('/cliente', _verificarAuth.verificarAuth, _ClienteControlador.listarClientes);
routerCliente.get('/cliente/:id', _verificarAuth.verificarAuth, _ClienteControlador.obtenerClienteById);
var _default = exports["default"] = routerCliente;