import { crearCategoria, listarCategorias, obtenerCategoriaPorId, actualizarCategoria, eliminarCategoria} from '../controllers/CategoriaControlador';
import { Router } from 'express';

const router = Router();

router.get('/listarC',listarCategorias);
router.post('/crearC',crearCategoria);
/*router.get('/listarUnoC/:id',obtenerCategoriaPorId);
router.put('/actualizarC/:id', actualizarCategoria)
router.delete('/eliminarC/:id', eliminarCategoria)
*/
export default router;