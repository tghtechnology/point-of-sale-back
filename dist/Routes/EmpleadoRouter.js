"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _EmpleadoControlador = require("../controllers/EmpleadoControlador");
var _verificarAuth = require("../Middleware/verificarAuth");
var _express = require("express");
var routerEmpleado = (0, _express.Router)();

// Rutas para la gestión de empleados

//Sólo propietario
routerEmpleado.post("/empleado", _verificarAuth.verificarAuth, _verificarAuth.isPropietario, _EmpleadoControlador.crearEmpleado);
routerEmpleado.put("/empleado/:id", _verificarAuth.verificarAuth, _verificarAuth.isPropietario, _EmpleadoControlador.editarEmpleado);
routerEmpleado["delete"]("/empleado/:id", _verificarAuth.verificarAuth, _verificarAuth.isPropietario, _EmpleadoControlador.eliminarEmpleadoPorId);
routerEmpleado.get("/empleado", _verificarAuth.verificarAuth, _EmpleadoControlador.listarEmpleados);
routerEmpleado.get("/empleado/:id", _verificarAuth.verificarAuth, _EmpleadoControlador.listarEmpleadoPorId);
var _default = exports["default"] = routerEmpleado;