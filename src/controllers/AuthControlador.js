import * as AuthServicio from "../Services/AuthServicio";


/**
 * Maneja los errores de la solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 * @param {Error} error - El error capturado.
 */
const handleError = (res, error) => {
  console.error("Error:", error.message);
  res.status(500).json({ error: "Error interno del servidor" });
};

/**
 * Inicia sesión de usuario.
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 * @param {string} req.body.email - El correo electrónico del usuario.
 * @param {string} req.body.password - La contraseña del usuario.
 * @returns {Object} - El token de sesión y el ID del usuario.
 * @throws {Error} - Devuelve un error si las credenciales son inválidas.
 */
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await AuthServicio.login(email, password);
    return res.status(200).json({
      token: result.token,
      usuario_id: result.usuario_id,
    });
  } catch (error) {
    console.error("Error al iniciar sesión:", error.message);
    return res.status(401).json({ error: "Credenciales inválidas" });
  }
};

/**
 * Cierra sesión de usuario.
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 * @returns {Object} - Un mensaje indicando que la sesión ha sido cerrada correctamente.
 * @throws {Error} - Devuelve un error si hay un problema al cerrar la sesión.
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
 * Obtiene los datos de un usuario por su ID.
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 * @param {number} req.params.id - El ID del usuario.
 * @returns {Object} - Los datos del usuario encontrado.
 * @throws {Error} - Devuelve un error si el ID de usuario es inválido o si no se encuentra el usuario.
 */
export const obtenerDatosUsuarioPorId = async (req, res) => {
  const { id } = req.params;
  const usuario_id = req.usuario.id;

  try {
    const usuarioId = parseInt(id);
    if (isNaN(usuarioId)) {
      return res.status(400).json({ error: "ID de usuario inválido" });
    }
    const usuario = await AuthServicio.obtenerDatosUsuarioPorId(usuarioId, usuario_id);
    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    return res.status(200).json(usuario);
  } catch (error) {
    handleError(res, error);
  }
};

/**
 * Envía de correo electrónico generando un token.
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 * @param {string} req.body.email - El correo electrónico del usuario.
 * @returns {Object} - Un mensaje indicando que se ha enviado el correo electrónico.
 * @throws {Error} - Devuelve un error si no se proporciona un correo electrónico o si hay un problema al enviar el correo.
 */
export const enviarTokenCambioPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: "Correo electrónico requerido" });
  }
  try {
    await AuthServicio.enviarCorreoCambioPass(email);
    return res.status(200).json({
      message: "Se ha enviado un correo electrónico de cambio de contraseña",
    });
  } catch (error) {
    handleError(res, error);
  }
};

/**
 * Cambia la contraseña de un usuario para poder reestablecerla.
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 * @param {string} req.body.token - El token de cambio de contraseña.
 * @param {string} req.body.password - La nueva contraseña del usuario.
 * @returns {Object} - Un mensaje indicando que la contraseña ha sido actualizada correctamente.
 */
// Cambiar contraseña
export const cambiarPassword = async (req, res) => {
  const { token, password } = req.body;
  try {
    await AuthServicio.cambiarPassword(token, password);
    return res.json({ message: "Contraseña actualizada" });
  } catch (error) {
    handleError(res, error);
  }
};