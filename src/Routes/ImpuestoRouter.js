import { crearImpuesto, listarImpuestos, listarImpuestoPorId, actualizarImpuesto, eliminarImpuesto} from '../controllers/ImpuestoControlador';
import { Router } from 'express';

const router = Router();

router.get('/impuesto/listar',listarImpuestos);
router.post('/impuesto/crear',crearImpuesto);
router.get('/impuesto/listar/:id', listarImpuestoPorId)
router.put('/impuesto/actualizar/:id', actualizarImpuesto)
router.delete('/impuesto/eliminar/:id', eliminarImpuesto)

export default router; 