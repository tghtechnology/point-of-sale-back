import * as EmpleadoServicio from "../Services/EmpleadoServicio";

/**
 * Maneja los errores de la solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 * @param {Error} error - El error capturado.
 */
const handleError = (res, error) => {
  console.error("Error:", error.message);
  res.status(500).json({ mensaje: "Error interno del servidor" });
};

/**
 * Crea un nuevo empleado.
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 * @param {string} req.body.nombre - El nombre del empleado.
 * @param {string} req.body.email - El correo electrónico del empleado.
 * @param {string} req.body.telefono - El número de teléfono del empleado.
 * @param {string} req.body.cargo - El cargo del empleado.
 * @param {string} req.body.pais - El país del empleado.
 * @param {string} req.body.password - La contraseña del empleado.
 * @returns {Object} - El nuevo empleado creado.
 * @throws {Error} - Devuelve un error si hay un problema al crear el empleado.
 */
export const crearEmpleado = async (req, res) => {
  try {
    const { nombre, email, telefono, cargo, pais, password } = req.body;
    const nuevoEmpleado = await EmpleadoServicio.crearEmpleado(nombre, email, telefono, cargo, pais, password);
    res.status(200).json(nuevoEmpleado);
  } catch (error) {
    handleError(res, error);
  }
};

/**
 * Obtiene la lista de empleados.
 * @param {Object} _req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 * @returns {Object} - La lista de empleados.
 * @throws {Error} - Devuelve un error si hay un problema al obtener la lista de empleados.
 */
export const listarEmpleados = async (_req, res) => {
  try {
    const empleados = await EmpleadoServicio.listarEmpleados();
    res.status(200).json(empleados);
  } catch (error) {
    handleError(res, error);
  }
};

/**
 * Obtiene los datos de un empleado por su ID.
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 * @param {number} req.params.id - El ID del empleado.
 * @returns {Object} - Los datos del empleado encontrado.
 * @throws {Error} - Devuelve un error si hay un problema al obtener los datos del empleado.
 */
export const listarEmpleadoPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const empleado = await EmpleadoServicio.listarEmpleadoPorId(id);
    res.status(200).json(empleado);
  } catch (error) {
    handleError(res, error);
  }
};

/**
 * Edita los datos de un empleado.
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 * @param {number} req.params.id - El ID del empleado.
 * @param {string} req.body.nombre - El nuevo nombre del empleado.
 * @param {string} req.body.email - El nuevo correo electrónico del empleado.
 * @param {string} req.body.telefono - El nuevo número de teléfono del empleado.
 * @param {string} req.body.cargo - El nuevo cargo del empleado.
 * @param {string} req.body.pais - El nuevo país del empleado.
 * @returns {Object} - Los datos del empleado actualizados.
 * @throws {Error} - Devuelve un error si hay un problema al editar los datos del empleado.
 */
export const editarEmpleado = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, email, telefono, cargo, pais } = req.body;
    const empleado = await EmpleadoServicio.editarEmpleado(id, nombre, email, telefono, cargo, pais);
    res.status(200).json(empleado);
  } catch (error) {
    handleError(res, error);
  }
};

/**
 * Cambia la contraseña de un empleado.
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 * @param {number} req.params.id - El ID del empleado.
 * @param {string} req.body.contraseñaActual - La contraseña actual del empleado.
 * @param {string} req.body.nuevaContraseña - La nueva contraseña del empleado.
 * @param {string} req.body.confirmarNuevaContraseña - La confirmación de la nueva contraseña del empleado.
 * @returns {Object} - Un mensaje indicando que la contraseña ha sido cambiada exitosamente.
 * @throws {Error} - Devuelve un error si hay un problema al cambiar la contraseña del empleado.
 */
export const cambiarContraseña = async (req, res) => {
  try {
    const { id } = req.params;
    const { contraseñaActual, nuevaContraseña, confirmarNuevaContraseña } =
      req.body;
    await EmpleadoServicio.cambiarContraseña( id, contraseñaActual, nuevaContraseña, confirmarNuevaContraseña);
    res.status(200).json({ mensaje: "Contraseña cambiada exitosamente." });
  } catch (error) {
    handleError(res, error);
  }
};

/**
 * Elimina un empleado por su ID.
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 * @param {number} req.params.id - El ID del empleado.
 * @returns {Object} - Un mensaje indicando que el empleado ha sido eliminado.
 * @throws {Error} - Devuelve un error si hay un problema al eliminar el empleado.
 */
export const eliminarEmpleadoPorId = async (req, res) => {
  try {
    const { id } = req.params;
    await EmpleadoServicio.eliminarEmpleadoPorId(id);
    res.status(200).json({ mensaje: "Empleado eliminado." });
  } catch (error) {
    handleError(res, error);
  }
};