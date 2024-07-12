import { crearCliente,obtenerClienteById,listarClientes,editarCliente,eliminarCliente,listaPaises } from "../controllers/ClienteControlador";
import { Router } from "express";
import { verificarAuth, isPropietario } from "../Middleware/verificarAuth";
const routerCliente = Router();

routerCliente.get('/listaPaises',listaPaises)
//RUTAS DE CLIENTES

//Sólo propietario
routerCliente.post('/cliente', verificarAuth, crearCliente);
routerCliente.put('/cliente/:id', verificarAuth, editarCliente);
routerCliente.delete('/cliente/:id', verificarAuth, isPropietario, eliminarCliente);

routerCliente.get('/cliente', verificarAuth, listarClientes);
routerCliente.get('/cliente/:id', verificarAuth, obtenerClienteById);

export default routerCliente;