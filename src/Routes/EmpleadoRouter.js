import {
  crearEmpleado,
  editarEmpleado,
  listarEmpleados,
  listarEmpleadoPorId,
  eliminarEmpleadoPorId,
} from "../controllers/EmpleadoControlador";
import { Router } from "express";

const routerEmpleado = Router();

// Rutas para la gestión de empleados
routerEmpleado.post("/empleado", crearEmpleado); // Crear un nuevo empleado
routerEmpleado.put("/empleado/:id", editarEmpleado); // Editar un empleado
routerEmpleado.get("/empleado", listarEmpleados); // Obtener la lista de empleados activos
routerEmpleado.get("/empleado/:id", listarEmpleadoPorId); // Obtener un empleado por su ID
//routerEmpleado.patch("/actualizarEmpleado/:id", actualizarEmpleadoPorId); // Actualizar un empleado por su ID
routerEmpleado.delete("/empleado/:id", eliminarEmpleadoPorId); // Eliminar un empleado por su ID

export default routerEmpleado;
