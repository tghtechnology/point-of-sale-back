import * as AuthServicio from "../Services/AuthServicio";
const passport = require("passport");
require("../Middleware/passport");

/**
 * Inicia sesión de un usuario.
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 * @param {string} req.body.email - El correo electrónico del usuario.
 * @param {string} req.body.password - La contraseña del usuario.
 * @returns {Object} - Un objeto JSON con el token de sesión y el ID del usuario.
 * @throws {Error} - Devuelve un error si las credenciales son incorrectas o si hay un problema en el servidor.
 */
export const login = async (req, res) => {
  const { email, password } = req.body;

    return res.status(200).json({ token: result.token, usuario_id: result.usuario_id,});
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    if (error.message === "Nombre de usuario o contraseña incorrectos") {
      return res.status(401).json({ error: "Nombre de usuario o contraseña incorrectos" });
    } else if (error.message === "Sesión activa encontrada") {
      return res.status(401).json({ error: "Ya has iniciado sesión", activeSessions: true });
    } else {
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  }
};

/**
 * Cierra la sesión de un usuario.
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 * @returns {Object} - Un mensaje de confirmación de que la sesión se ha cerrado correctamente.
 * @throws {Error} - Devuelve un error si hay un problema al cerrar la sesión en el servidor.
 */
export const logout = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];

  try {
    await AuthServicio.logout(token);
    return res.json({ message: "Sesión cerrada exitosamente" });
  } catch (error) {
    handleError(res, error);
  }
};

/**
 * Envía un correo electrónico para restablecer la contraseña de un usuario.
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 * @param {string} req.body.email - El correo electrónico del usuario.
 * @returns {Object} - Un mensaje de confirmación de que se ha enviado el correo electrónico de restablecimiento de contraseña.
 * @throws {Error} - Devuelve un error si el correo electrónico no se encuentra en la base de datos o si hay un problema al enviar el correo.
 */
export const enviarTokenCambioPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: "El correo electrónico es obligatorio" });
  }
  try {
    await AuthServicio.enviarCorreoCambioPass(email);
    return res.status(200).json({message: "Se ha enviado un correo electrónico de cambio de contraseña",});
  } catch (error) {
    console.error("Error al enviar correo de cambio de contraseña:", error);
    if (error.message === "Correo no encontrado") {
      return res.status(404).json({ message: error.message });
    } else {
      return res.status(500).json({message:"Ocurrió un error al enviar el correo. Por favor, inténtalo de nuevo más tarde",});
    }
  }
};

/**
 * Cambia la contraseña de un usuario.
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 * @param {string} req.body.token - El token de restablecimiento de contraseña.
 * @param {string} req.body.password - La contraseña nueva
 * @returns {Object} - Un mensaje de confirmación de que la contraseña se ha actualizado correctamente.
 * @throws {Error} - Devuelve un error si hay un problema al cambiar la contraseña en el servidor.
 */
export const cambiarPassword = async (req, res) => {
  const { token, password } = req.body;
  try {
    await AuthServicio.cambiarPassword(token, password);
    return res.json({ message: "Contraseña actualizada" });
  } catch (error) {
    handleError(res, error);
  }
};

/**
 * Elimina los tokens expirados de la base de datos.
 * @throws {Error} - Devuelve un error si hay un problema al eliminar los tokens expirados en el servidor.
 */
export const eliminarTokensExpirados = async () => {
  try {
    await AuthServicio.eliminarTokensExpirados();
    console.log("Tokens expirados eliminados correctamente.");
  } catch (error) {
    console.error("Error al eliminar tokens expirados:", error.message);
  }
};

// Programación de la ejecución periódica para eliminar tokens expirados cada hora
const horasEnMilisegundos = 60 * 60 * 1000; // 1 hora en milisegundos
setInterval(eliminarTokensExpirados, horasEnMilisegundos);
