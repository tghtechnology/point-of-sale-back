import {
  crearEmpleado,
  editarEmpleado,
  listarEmpleados,
  listarEmpleadoPorId,
  eliminarEmpleadoPorId,
  cambiarContraseña
} from "../controllers/EmpleadoControlador";
import { verificarAuth, isPropietario } from "../Middleware/verificarAuth";
import { Router } from "express";

const routerEmpleado = Router();

// Rutas para la gestión de empleados
routerEmpleado.post("/empleado", /*verificarAuth, isPropietario,*/ crearEmpleado);
routerEmpleado.put("/empleado/:id", /*verificarAuth, isPropietario,*/ editarEmpleado);
routerEmpleado.delete("/empleado/:id", verificarAuth, isPropietario, eliminarEmpleadoPorId);
routerEmpleado.get("/empleado", verificarAuth, listarEmpleados);
routerEmpleado.get("/empleado/:id", verificarAuth, listarEmpleadoPorId);

// Nueva ruta para cambiar la contraseña de un empleado
routerEmpleado.put("/empleado/:id/cambiarPass", verificarAuth, isPropietario, cambiarContraseña);

export default routerEmpleado;