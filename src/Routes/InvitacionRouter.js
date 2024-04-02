import { Router } from "express";
import { enviarInvitacion } from '../controllers/InvitacionControlador';

const router = Router();

// Ruta para enviar una invitación
router.post('/enviar-invitacion', enviarInvitacion);

export default router;
