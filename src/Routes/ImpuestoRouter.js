import { crearImpuesto, listarImpuestos, listarImpuestoPorId, actualizarImpuesto, eliminarImpuesto} from '../controllers/ImpuestoControlador';
import { Router } from 'express';
const verificarAuth = require('../Middleware/verificarAuth.js')
const router = Router();

router.get('/impuesto/listar', verificarAuth, listarImpuestos);
router.post('/impuesto/crear', verificarAuth, crearImpuesto);
router.get('/impuesto/listar/:id', verificarAuth, listarImpuestoPorId)
router.put('/impuesto/actualizar/:id', verificarAuth, actualizarImpuesto)
router.delete('/impuesto/eliminar/:id', verificarAuth, eliminarImpuesto)

export default router; 