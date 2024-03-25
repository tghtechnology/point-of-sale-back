import { crearCliente,obtenerClienteById,listarClientes,editarCliente,eliminarCliente,listaPaises, clientesEliminados } from "../controllers/ClienteControlador";
import { Router } from "express";

const routerCliente = Router();

routerCliente.get('/listaPaises',listaPaises)
//RUTAS DE CLIENTES
routerCliente.post('/cliente',crearCliente);
routerCliente.get('/cliente',listarClientes);
routerCliente.get('/cliente/:id',obtenerClienteById);
routerCliente.put('/cliente/:id',editarCliente);
routerCliente.delete('/cliente/:id',eliminarCliente);
routerCliente.get('/clientesEliminados',clientesEliminados);
export default routerCliente;