import { Router } from "express";
import { enviarInvitacion } from "../controllers/InvitacionControlador";

const routerInvitacion = Router();

// Ruta para enviar una invitación
routerInvitacion.post("/enviar-invitacion", enviarInvitacion);

export default routerInvitacion;
