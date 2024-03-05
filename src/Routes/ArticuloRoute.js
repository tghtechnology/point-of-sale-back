import { crearArticulo, listarArticulos, obtenerArticuloPorId, actualizarArticulo, eliminarArticulo} from '../controllers/ArticuloControlador';
import { Router } from 'express';

const router = Router();

router.get('/listarA',listarArticulos);
router.post('/crearA',crearArticulo);
router.get('/listarUnoA/:id',obtenerArticuloPorId);
router.put('/actualizarA/:id', actualizarArticulo)
router.delete('/eliminarA/:id', eliminarArticulo)

export default router;