export const verificarSesion = async (token) => {
  try {
    // Verificar el token de sesión y devolver el ID de usuario si es válido
    const decodedToken = jwt.verify(token, "secreto_del_token");
    return decodedToken.id;
  } catch (error) {
    // Si el token es inválido o ha expirado, devolver null
    return null;
  }
};
