import {
  crearEmpleado,
  editarEmpleado,
  listarEmpleados,
  listarEmpleadoPorId,
  actualizarEmpleadoPorId,
  eliminarEmpleadoPorId,
} from "../controllers/EmpleadoControlador";
import { Router } from "express";

const routerEmpleado = Router();

// Rutas para la gestión de empleados
routerEmpleado.post("/crearEmpleado", crearEmpleado); // Crear un nuevo empleado
routerEmpleado.put("/editarEmpleado/:id", editarEmpleado); // Editar un empleado
routerEmpleado.get("/listarEmpleados", listarEmpleados); // Obtener la lista de empleados activos
routerEmpleado.get("/listarEmpleado/:id", listarEmpleadoPorId); // Obtener un empleado por su ID
routerEmpleado.patch("/actualizarEmpleado/:id", actualizarEmpleadoPorId); // Actualizar un empleado por su ID
routerEmpleado.delete("/eliminarEmpleado/:id", eliminarEmpleadoPorId); // Eliminar un empleado por su ID

export default routerEmpleado;
