import * as AuthService from "../Services/AuthServicio";
import  {verificarSesion as verificacion} from "../Middleware/verificarSesion";

export const verificarSesion = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const usuarioId = await verificacion(token);
    req.usuarioId = usuario.id;
    next();
  } catch (error) {
    return res.status(401).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await AuthService.login(email, password);
    if(token) {
      return res.status(200).json({status:"Logged In", token:token})
    } 
  } catch (error) {
    if (error.message === "Nombre de usuario o contraseña incorrectos") {
      return res.status(401).json({ error: "Nombre de usuario o contraseña incorrectos" });
    } else if (error.message === "Sesión activa encontrada") {
      return res.status(401).json({ error: "Ya has iniciado sesión",activeSessions: true });
    } else {
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  }
};

export const logout = async (req, res) => {  
  try {
    const token = req.headers.authorization.split(" ")[1];
    await AuthService.logout(token);
    return res.json({ message: "Sesión cerrada exitosamente" });
  } catch (error) {
    console.error("Error al cerrar sesión:", error.message);
    return res.status(500).json({ error: "Error del servidor" });
  }
};

export const enviarTokenCambioPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({
      message: 'El correo electrónico es obligatorio',
    });
  }
  try {
    const mensaje = await AuthService.enviarCorreoCambioPass(email);
    if (mensaje) {
      return res.status(404).json({
        message: mensaje,
      });
    }
    return res.status(200).json({
      message: 'Se ha enviado un correo electrónico de cambio de contraseña',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Ocurrió un error. Por favor, inténtalo de nuevo más tarde',
    });
  }
}

export const cambiarPassword = async (req, res) => {
  const { token, password } = req.body;
  try {
    const message = await AuthService.cambiarPassword(token, password);
    return res.json({ message });
  } catch (error) {
    console.error("Error al cambiar la contraseña:", error.message);
    return res.status(500).json({ error: "Error del servidor" });
  }
};

export const eliminarTokensExpirados = async () => {
  try {
    await AuthService.eliminarTokensExpirados();
    console.log("Tokens expirados eliminados correctamente.");
  } catch (error) {
    console.error("Error al eliminar tokens expirados:", error.message);
  }
};

// Llamada inicial para eliminar tokens expirados
eliminarTokensExpirados();

// Programación de la ejecución periódica para eliminar tokens expirados cada hora
const horasEnMilisegundos = 60 * 60 * 1000; // 1 hora en milisegundos
setInterval(eliminarTokensExpirados, horasEnMilisegundos);