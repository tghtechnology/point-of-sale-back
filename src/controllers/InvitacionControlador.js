import * as InvitacionServicio from "../Services/InvitacionServicio";

export const enviarInvitacion = async (req, res) => {
  const { emailDestinatario } = req.body;

  try {
    const info = await InvitacionServicio.enviarCorreoInvitacion(
      emailDestinatario
    );
    res
      .status(200)
      .json({ mensaje: "Correo de invitación enviado correctamente", info });
  } catch (error) {
    console.error("Error al enviar el correo:", error);
    res.status(500).json({ error: "Error al enviar el correo de invitación" });
  }
};
