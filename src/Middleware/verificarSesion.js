import jwt from "jsonwebtoken";

// Middleware para verificar token de sesión
export const verificarSesion = async (req, res, next) => {
  const token = req.headers.authorization; // Obtiene el token de autorización del encabezado de la solicitud

  if (!token) {
    // Si no hay token proporcionado en el encabezado
    return res.status(401).json({ error: "Token no proporcionado" }); // Devuelve un error de "Token no proporcionado"
  }

  try {
    const decoded = jwt.verify(token, "secreto_del_token"); // Verifica y decodifica el token usando el secreto "secreto_del_token"
    req.usuarioId = decoded.id; // Asigna el ID del usuario decodificado a req.usuarioId
    next(); // Llama a la siguiente función en la cadena de middleware
  } catch (error) {
    return res.status(401).json({ error: "Token inválido" }); // Si hay un error en la verificación del token, devuelve un error de "Token inválido"
  }
};
