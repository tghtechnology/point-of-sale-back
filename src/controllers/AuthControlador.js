import * as AuthServicio from "../Services/AuthServicio";

const handleError = (res, error) => {
  console.error("Error:", error.message);
  res.status(500).json({ error: "Error interno del servidor" });
};

// Iniciar sesión
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

// Cerrar sesión
export const logout = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];

  try {
    await AuthServicio.logout(token);
    return res.json({ message: "Sesión cerrada exitosamente" });
  } catch (error) {
    handleError(res, error);
  }
};

// Obtener datos de usuario por ID
export const obtenerDatosUsuarioPorId = async (req, res) => {
  const { id } = req.params;

  try {
    const usuarioId = parseInt(id);
    if (isNaN(usuarioId)) {
      return res.status(400).json({ error: "ID de usuario inválido" });
    }
    const usuario = await AuthServicio.obtenerDatosUsuarioPorId(usuarioId);
    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    return res.status(200).json(usuario);
  } catch (error) {
    handleError(res, error);
  }
};

// Enviar token de cambio de contraseña por correo electrónico
export const enviarTokenCambioPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: "Correo electrónico requerido" });
  }
  try {
    await AuthServicio.enviarCorreoCambioPass(email);
    return res.status(200).json({message: "Se ha enviado un correo electrónico de cambio de contraseña",});
  } catch (error) {
    handleError(res, error);
  }
};

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