import * as AuthServicio from "../Services/AuthServicio";

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await AuthServicio.login(email, password);
    return res.status(200).json({
      token: result.token,
      usuario_id: result.usuario_id,
    });
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    if (error.message === "Nombre de usuario o contraseña incorrectos") {
      return res
        .status(401)
        .json({ error: "Nombre de usuario o contraseña incorrectos" });
    } else {
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  }
};

export const logout = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  try {
    await AuthServicio.logout(token);
    return res.json({ message: "Sesión cerrada exitosamente" });
  } catch (error) {
    console.error("Error al cerrar sesión:", error.message);
    return res.status(500).json({ error: "Error del servidor" });
  }
};

export const obtenerDatosUsuarioPorId = async (req, res) => {
  const { id } = req.params; // Cambiado a 'id'
  
  try {
    // Asegúrate de que el 'id' sea un número entero
    const usuarioId = parseInt(id);

    // Verifica si el ID es un número válido
    if (isNaN(usuarioId)) {
      return res.status(400).json({ error: "ID de usuario inválido" });
    }

    // Llama a la función para obtener los datos del usuario por su ID
    const usuario = await AuthServicio.obtenerDatosUsuarioPorId(usuarioId);

    // Verifica si se encontró el usuario
    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    // Devuelve los datos del usuario
    return res.status(200).json(usuario);
  } catch (error) {
    console.error("Error al obtener datos del usuario:", error.message);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const enviarTokenCambioPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res
      .status(400)
      .json({ message: "El correo electrónico es obligatorio" });
  }

  try {
    await AuthServicio.enviarCorreoCambioPass(email);
    return res.status(200).json({
      message: "Se ha enviado un correo electrónico de cambio de contraseña",
    });
  } catch (error) {
    console.error("Error al enviar correo de cambio de contraseña:", error);
    if (error.message === "Correo no encontrado") {
      return res.status(404).json({ message: error.message });
    } else {
      return res.status(500).json({
        message:
          "Ocurrió un error al enviar el correo. Por favor, inténtalo de nuevo más tarde",
      });
    }
  }
};

export const cambiarPassword = async (req, res) => {
  const { token, password } = req.body;

  try {
    await AuthServicio.cambiarPassword(token, password);
    return res.json({ message: "Contraseña actualizada" });
  } catch (error) {
    console.error("Error al cambiar la contraseña:", error.message);
    return res.status(500).json({ error: "Error del servidor" });
  }
};