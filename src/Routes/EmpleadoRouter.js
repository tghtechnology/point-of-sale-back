import {
  crearEmpleado,
  editarEmpleado,
  listarEmpleados,
  listarEmpleadoPorId,
  eliminarEmpleadoPorId,
} from "../controllers/EmpleadoControlador";
const verificarAuth = require('../Middleware/verificarAuth.js')
import { Router } from "express";

const routerEmpleado = Router();

// Rutas para la gestión de empleados
routerEmpleado.post("/empleado", verificarAuth, crearEmpleado); // Crear un nuevo empleado
routerEmpleado.put("/empleado/:id", verificarAuth, editarEmpleado); // Editar un empleado
routerEmpleado.get("/empleado", verificarAuth, listarEmpleados); // Obtener la lista de empleados activos
routerEmpleado.get("/empleado/:id", verificarAuth, listarEmpleadoPorId); // Obtener un empleado por su ID
//routerEmpleado.patch("/actualizarEmpleado/:id", actualizarEmpleadoPorId); // Actualizar un empleado por su ID
routerEmpleado.delete("/empleado/:id", verificarAuth, eliminarEmpleadoPorId); // Eliminar un empleado por su ID

export default routerEmpleado;
