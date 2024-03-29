import { crearDescuento,eliminarDescuento,modificarDescuento,obtenerDescuentoById,obtenerDescuentos,cambiarEstadoDescuento,obtenerDescuentosEliminados } from '../controllers/DescuentoControlador';
import { Router } from 'express';

const routerDescuento = Router();
//DESCUENTO CRUD
routerDescuento.post('/descuento',crearDescuento);
routerDescuento.get('/descuento',obtenerDescuentos);
routerDescuento.get('/descuento/:id',obtenerDescuentoById);
routerDescuento.put('/descuento/:id',modificarDescuento); 
routerDescuento.delete('/descuento/:id',eliminarDescuento);
routerDescuento.get('/descuentosEliminados',obtenerDescuentosEliminados)
// Ruta para desactivar y activar descuento
routerDescuento.put('/descuento/:id/cambiar-estado', cambiarEstadoDescuento);

export default routerDescuento;