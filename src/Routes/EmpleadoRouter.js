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

//CREAR NUEVO EMPLEADO
routerEmpleado.post("/empleado", crearEmpleado);

//ACTUALIZAR EMPLEADO
routerEmpleado.put("/:id", editarEmpleado);

//OBTENER TODOS LOS EMPLEADOS
routerEmpleado.get("/", listarEmpleados);

//OBTENER EMPLEADO POR ID
routerEmpleado.get("/:id", listarEmpleadoPorId);

//ACTUALIZAR EMPLEADO POR ID
routerEmpleado.put("/actualizar/:id", actualizarEmpleadoPorId);

//ELIMINAR EMPLEADO POR ID
routerEmpleado.delete("/:id", eliminarEmpleadoPorId);

export default routerEmpleado;
