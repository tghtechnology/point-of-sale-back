import { crearCliente,listarClienteById,listarClientes,editarCliente,eliminarCliente } from "../controllers/ClienteControlador";
import { Router } from "express";

const routerCliente = Router();

//RUTAS DE CLIENTES
routerCliente.post('/cliente',crearCliente);
routerCliente.get('/cliente',listarClientes);
routerCliente.get('/cliente/:id',listarClienteById);
routerCliente.put('/cliente/:id',editarCliente);
routerCliente.delete('/cliente/:id',eliminarCliente);

export default routerCliente;