import { crearImpuesto, listarImpuestos, listarImpuestoPorId, actualizarImpuesto, eliminarImpuesto} from '../controllers/ImpuestoControlador';
import { Router } from 'express';
import { verificarAuth, isPropietario } from "../Middleware/verificarAuth";
const router = Router();

//Sólo propietario
router.post('/impuesto/crear', verificarAuth, isPropietario, crearImpuesto);
router.put('/impuesto/actualizar/:id', verificarAuth, isPropietario, actualizarImpuesto)
router.delete('/impuesto/eliminar/:id', verificarAuth, isPropietario, eliminarImpuesto)

router.get('/impuesto/listar', verificarAuth, listarImpuestos);
router.get('/impuesto/listar/:id', verificarAuth, listarImpuestoPorId)


export default router; 