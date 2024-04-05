import { Router } from "express";
import {
  crearEmpleado,
  editarEmpleado,
  listarEmpleados,
  listarEmpleadoPorId,
  eliminarEmpleadoPorId,
} from "../controllers/EmpleadoControlador";

const routerEmpleado = Router();

// Crear un nuevo empleado
routerEmpleado.post("/empleado", crearEmpleado);

// Obtener la lista de empleados activos
routerEmpleado.get("/empleados", listarEmpleados);

// Obtener un empleado por su ID
routerEmpleado.get("/empleado/:id", listarEmpleadoPorId);

// Editar un empleado por su ID
routerEmpleado.put("/empleado/:id", editarEmpleado);

// Eliminar un empleado por su ID
routerEmpleado.delete("/empleado/:id", eliminarEmpleadoPorId);

export default routerEmpleado;
