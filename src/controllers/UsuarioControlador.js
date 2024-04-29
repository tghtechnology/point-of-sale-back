import * as UsuarioServicio from "../Services/UsuarioServicio";
import { obtenerListaPaises } from "../helpers/helperPais";

/**
 * Maneja los errores de la solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 * @param {Error} error - El error capturado.
 */
const handleError = (res, error) => {
  console.error("Error:", error.message);
  if (error.message === "Debe iniciar sesión") {
    return res.status(400).json({ error: "Inicie sesión" });
  } else if (error.message === "Token no proporcionado") {
    return res.status(404).json({ error: "Ingrese token" });
  } else if (error.message === "Usuario no encontrado") {
    return res.status(404).json({ error: "No se encontró el usuario" });
  } else if (error.message === "Contraseña incorrecta") {
    return res.status(404).json({ error: "No coincide la contraseña" });
  } else if (error.message === "Cuenta eliminada") {
    return res
      .status(401)
      .json({ error: "Esta cuenta ya fue eliminada temporalmente" });
  } else {
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};

/**
 * Obtiene la lista de países.
 * @param {Object} _req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 * @returns {Object} - La lista de países.
 * @throws {Error} - Devuelve un error si hay un problema al obtener la lista de países.
 */
export const listaPaises = async (_req, res) => {
  try {
    const listaPaises = obtenerListaPaises();
    res.json(listaPaises);
  } catch (error) {
    handleError(res, error);
  }
};

/**
 * Crea un nuevo propietario.
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 * @param {string} req.body.nombre - El nombre del usuario.
 * @param {string} req.body.email - El correo electrónico del usuario.
 * @param {string} req.body.password - La contraseña del usuario.
 * @param {string} req.body.pais - El país del usuario.
 * @param {string} req.body.telefono - El número de teléfono del usuario.
 * @param {string} req.body.nombreNegocio - El nombre del negocio del usuario.
 * @returns {Object} - El nuevo usuario creado.
 * @throws {Error} - Devuelve un error si hay un problema al crear el usuario.
 */
export const crearUsuario = async (req, res) => {
  try {
    const { nombre, email, password, pais, telefono, nombreNegocio } = req.body;
    const newUsuario = await UsuarioServicio.crearUsuario(nombre, email, password, pais, telefono, nombreNegocio );
    res.json(newUsuario);
  } catch (error) {
    handleError(res, error);
  }
};

/**
 * Edita los datos de un propietario por su ID.
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 * @param {number} req.params.id - El ID del usuario.
 * @param {string} req.body.nombre - El nuevo nombre del usuario.
 * @param {string} req.body.email - El nuevo correo electrónico del usuario.
 * @param {string} req.body.telefono - El nuevo número de teléfono del usuario.
 * @param {string} req.body.pais - El nuevo país del usuario.
 * @returns {Object} - Los datos del usuario actualizados.
 * @throws {Error} - Devuelve un error si hay un problema al editar los datos del usuario.
 */
export const editarUsuarioPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, email, telefono, pais } = req.body;
    const usuario = await UsuarioServicio.editarUsuarioPorId(id, nombre, email, telefono, pais);
    res.status(200).json(usuario);
  } catch (error) {
    handleError(res, error);
  }
};

/**
 * Cambia la contraseña de un propietario.
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 * @param {number} req.params.id - El ID del propietario.
 * @param {string} req.body.contraseñaActual - La contraseña actual del propietario.
 * @param {string} req.body.nuevaContraseña - La nueva contraseña del propietario.
 * @param {string} req.body.verificarContraseña - La confirmación de la nueva contraseña del usuario.
 * @returns {Object} - Un mensaje indicando que la contraseña ha sido cambiada exitosamente.
 * @throws {Error} - Devuelve un error si hay un problema al cambiar la contraseña del usuario.
 */
export const cambiarContraseña = async (req, res) => {
  try {
    const { id } = req.params;
    const { contraseñaActual, nuevaContraseña, verificarContraseña } = req.body;
    const result = await UsuarioServicio.cambiarContraseña(
      id,
      contraseñaActual,
      nuevaContraseña,
      verificarContraseña
    );
    res.status(200).json(result);
  } catch (error) {
    handleError(res, error);
  }
};

/**
 * Obtiene la lista de propietarios.
 * @param {Object} _req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 * @returns {Object[]} - La lista de propietarios.
 * @throws {Error} - Devuelve un error si hay un problema al obtener la lista de usuarios.
 */
export const listarUsuarios = async (_req, res) => {
  try {
    const usuarios = await UsuarioServicio.listarUsuarios();
    res.status(200).json(usuarios);
  } catch (error) {
    handleError(res, error);
  }
};

/**
 * Elimina temporalmente la cuenta de un usuario.
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 * @param {number} req.body.usuario_id - El ID del usuario.
 * @param {string} req.body.password - La contraseña del usuario.
 * @param {string} req.body.token - El token del usuario.
 * @returns {Object} - Un mensaje indicando que la cuenta ha sido eliminada temporalmente.
 * @throws {Error} - Devuelve un error si hay un problema al eliminar temporalmente la cuenta del usuario.
 */
export const eliminarTemporalmente = async (req, res) => {
  try {
    const { usuario_id, password, token } = req.body;
    const results = await UsuarioServicio.eliminarTemporalmente(
      usuario_id,
      password,
      token
    );
    res
      .status(200)
      .json({ mensaje: "Cuenta eliminada con éxito por un plazo de 1 semana" });
  } catch (error) {
    handleError(res, error);
  }
};

/**
 * Restaura la cuenta de un usuario.
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 * @param {number} req.params.id - El ID del usuario.
 * @returns {Object} - Un mensaje indicando que la cuenta ha sido restaurada.
 * @throws {Error} - Devuelve un error si hay un problema al restaurar la cuenta del usuario.
 */
export const restaurarCuenta = async (req, res) => {
  try {
    const id = req.params.id;
    const results = await UsuarioServicio.restaurarCuenta(id);

    if (results) {
      res.status(200).json({ mensaje: "Cuenta restaurada" });
    }
  } catch (error) {
    handleError(res, error);
  }
};

/**
 * Elimina las cuentas de usuario que han expirado.
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 * @param {number} req.params.id - El ID del usuario.
 * @returns {Object} - Un mensaje indicando que la cuenta ha sido eliminada o que no está vencida.
 * @throws {Error} - Devuelve un error si hay un problema al eliminar las cuentas vencidas del usuario.
 */
export const eliminarCuentasVencidas = async (req, res) => {
  try {
    const id = req.params.id;
    const results = await UsuarioServicio.eliminarCuentasVencidas(id);

    if (results) {
      res.status(200).json({ mensaje: "La cuenta ha sido eliminada" });
    } else if (results == false) {
      res.status(400).json({ mensaje: "La cuenta no está vencida" });
    } else if (!results) {
      res.status(404).json({ mensaje: "Usuario no encontrado" });
    }
  } catch (error) {
    handleError(res, error);
  }
};

/**
 * Elimina permanentemente la cuenta de un usuario.
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 * @param {number} req.body.usuario_id - El ID del usuario.
 * @param {string} req.body.password - La contraseña del usuario.
 * @param {string} req.body.token - El token del usuario.
 * @returns {Object} - Un mensaje indicando que la cuenta ha sido eliminada permanentemente.
 * @throws {Error} - Devuelve un error si hay un problema al eliminar permanentemente la cuenta del usuario.
 */
export const eliminarPermanentemente = async (req, res) => {
  try {
    const { usuario_id, password, token } = req.body;
    const results = await UsuarioServicio.eliminarPermanentemente(
      usuario_id,
      password,
      token
    );

    if (results) {
      res
        .status(200)
        .json({ mensaje: "Cuenta eliminada permanentemente" });
    }
  } catch (error) {
    handleError(res, error);
  }
};

// Programar la tarea para ejecutarse periódicamente
setInterval(eliminarCuentasVencidas, 24 * 60 * 60 * 1000); // Ejecutar cada 24 horas