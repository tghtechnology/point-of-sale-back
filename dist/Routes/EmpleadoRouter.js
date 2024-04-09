"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _EmpleadoControlador = require("../controllers/EmpleadoControlador");
var _express = require("express");
var routerEmpleado = (0, _express.Router)();

// Rutas para la gestión de empleados
routerEmpleado.post("/empleado", _EmpleadoControlador.crearEmpleado); // Crear un nuevo empleado
routerEmpleado.put("/empleado/:id", _EmpleadoControlador.editarEmpleado); // Editar un empleado
routerEmpleado.get("/empleado", _EmpleadoControlador.listarEmpleados); // Obtener la lista de empleados activos
routerEmpleado.get("/empleado/:id", _EmpleadoControlador.listarEmpleadoPorId); // Obtener un empleado por su ID
//routerEmpleado.patch("/actualizarEmpleado/:id", actualizarEmpleadoPorId); // Actualizar un empleado por su ID
routerEmpleado["delete"]("/empleado/:id", _EmpleadoControlador.eliminarEmpleadoPorId); // Eliminar un empleado por su ID
var _default = exports["default"] = routerEmpleado;