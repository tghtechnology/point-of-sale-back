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
  const { email, password } = req.body;
  try {

    const token = await AuthService.login(email, password);
    if(token) {
      return res.json({token})
    } else if (token == true){
      return res.status(401).json({ message: "Ya se inició sesión anteriormente"})
    }
  } catch (error) {
    console.error("Error al autenticar al usuario:", error.message);
    return res.status(401).json({ error: "Nombre de usuario o contraseña incorrectos" });
  }
};

export const logout = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];   
  try {
    await AuthService.logout(token);
    return res.json({ message: "Sesión cerrada exitosamente" });
  } catch (error) {
    console.error("Error al cerrar sesión:", error.message);
    return res.status(500).json({ error: "Error del servidor" });
  }
};

export const enviarTokenCambioPassword = async (req, res) => {
  const { email } = req.body;
  try {
    await AuthService.enviarTokenCambioPassword(email);
    return res.json({ message: "Se ha enviado un correo, si es que existe" });
  } catch (error) {
    console.error("Error al enviar el token de cambio de contraseña:", error.message);
    return res.status(500).json({ error: "Error del servidor" });
  }
};

export const cambiarPassword = async (req, res) => {
  const { token, newPassword } = req.body;
  try {
    const message = await AuthService.cambiarPassword(token, newPassword);
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