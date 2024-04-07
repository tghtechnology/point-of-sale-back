import { crearCliente,obtenerClienteById,listarClientes,editarCliente,eliminarCliente,listaPaises } from "../controllers/ClienteControlador";
import { Router } from "express";
const verificarAuth = require('../Middleware/verificarAuth.js')
const routerCliente = Router();

routerCliente.get('/listaPaises',listaPaises)
//RUTAS DE CLIENTES
routerCliente.post('/cliente', verificarAuth, crearCliente);
routerCliente.get('/cliente', verificarAuth, listarClientes);
routerCliente.get('/cliente/:id', verificarAuth, obtenerClienteById);
routerCliente.put('/cliente/:id', verificarAuth, editarCliente);
routerCliente.delete('/cliente/:id', verificarAuth, eliminarCliente);
export default routerCliente;