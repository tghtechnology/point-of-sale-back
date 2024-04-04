"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _EmpleadoControlador = require("../controllers/EmpleadoControlador");
var _express = require("express");
var routerEmpleado = (0, _express.Router)();

//CREAR NUEVO EMPLEADO
routerEmpleado.post("/empleado", _EmpleadoControlador.crearEmpleado);

//ACTUALIZAR EMPLEADO
routerEmpleado.put("/:id", _EmpleadoControlador.editarEmpleado);

//OBTENER TODOS LOS EMPLEADOS
routerEmpleado.get("/", _EmpleadoControlador.listarEmpleados);

//OBTENER EMPLEADO POR ID
routerEmpleado.get("/:id", _EmpleadoControlador.listarEmpleadoPorId);

//ACTUALIZAR EMPLEADO POR ID
routerEmpleado.put("/actualizar/:id", _EmpleadoControlador.actualizarEmpleadoPorId);

//ELIMINAR EMPLEADO POR ID
routerEmpleado["delete"]("/:id", _EmpleadoControlador.eliminarEmpleadoPorId);
var _default = exports["default"] = routerEmpleado;