import {
  crearEmpleado,
  editarEmpleado,
  listarEmpleados,
  listarEmpleadoPorId,
  eliminarEmpleadoPorId,
} from "../controllers/EmpleadoControlador";
import { verificarAuth, isPropietario } from "../Middleware/verificarAuth";
import { Router } from "express";

const routerEmpleado = Router();

routerEmpleado.post("/empleado", verificarAuth, isPropietario, crearEmpleado); 
routerEmpleado.put("/empleado/:id", verificarAuth, isPropietario, editarEmpleado); 
routerEmpleado.delete("/empleado/:id", verificarAuth, isPropietario, eliminarEmpleadoPorId); 

routerEmpleado.get("/empleado", verificarAuth, listarEmpleados); 
routerEmpleado.get("/empleado/:id", verificarAuth, listarEmpleadoPorId); 

export default routerEmpleado;