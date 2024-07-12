import * as EmpleadoServicio from "../Services/EmpleadoServicio";

/**
 * Crea un nuevo empleado y lo asocia con el usuario autenticado.
 * 
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 * @param {string} req.body.nombre - Nombre del nuevo empleado.
 * @param {string} req.body.email - Correo electrónico del nuevo empleado.
 * @param {string} req.body.telefono - Número de teléfono del nuevo empleado.
 * @param {string} req.body.cargo - Cargo del nuevo empleado.
 * @param {string} req.body.pais - País del nuevo empleado.
 * @param {string} req.body.password - Contraseña del nuevo empleado.
 * @param {number} req.body.propietarioId - ID del propietario al que se asociará el nuevo empleado.
 * @param {number} req.usuario.id - ID del usuario autenticado.
 * @returns {Object} - El nuevo empleado creado.
 * @throws {Error} - Devuelve un error si hay un problema al crear el empleado.
 */
export const crearEmpleado = async (req, res) => {
  const usuario_id = req.usuario.id;
  try {
    const { nombre, email, telefono, cargo, pais, password, propietarioId } = req.body;
    const nuevoEmpleado = await EmpleadoServicio.crearEmpleado(nombre, email, telefono, cargo, pais, password, propietarioId, usuario_id);
    res.status(200).json(nuevoEmpleado);
  } catch (error) {
    console.error("Error al crear empleado:", error.message);
    res.status(500).json({ mensaje: "Error al crear el empleado." });
  }
};


/**
 * Obtiene la lista de todos los empleados.
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 * @param {number} req.usuario.id - ID del usuario autenticado.
 * @returns {Array<Object>}  - La lista de todos los empleados.
 * @throws {Error} - Devuelve un error si hay un problema al obtener la lista de empleados.
 */
export const listarEmpleados = async (req, res) => {
  try {
    const usuario_id = req.usuario.id;
    const empleados = await EmpleadoServicio.listarEmpleados(usuario_id);
    res.status(200).json(empleados);
  } catch (error) {
    console.error("Error al obtener la lista de empleados:", error.message);
    res
      .status(500)
      .json({ mensaje: "Error al obtener la lista de empleados." });
  }
};


/**
 * Obtiene un empleado por su ID asociado con el usuario autenticado.
 * 
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 * @param {number} req.params.id - ID del empleado a buscar.
 * @param {number} req.usuario.id - ID del usuario autenticado.
 * @returns {Object} - El empleado encontrado.
 * @throws {Error} - Devuelve un error si hay un problema al obtener el empleado.
 */
export const listarEmpleadoPorId = async (req, res) => {
  const id = req.params.id;
  const usuario_id = req.usuario.id;
  try {
    const empleado = await EmpleadoServicio.listarEmpleadoPorId(id, usuario_id);
    res.status(200).json(empleado);
  } catch (error) {
    console.error("Error al obtener el empleado:", error.message);
    res.status(500).json({ mensaje: "Error al obtener el empleado." });
  }
};

/**
 * Edita un empleado asociado con el usuario autenticado.
 * 
 * @param {Object} req - Objeto de solicitud.
 * @param {Object} res - Objeto de respuesta.
 * @param {number} req.params.id - ID del empleado a editar.
 * @param {number} req.usuario.id - ID del usuario autenticado.
 * @param {string} req.body.nombre - Nuevo nombre del empleado.
 * @param {string} req.body.email - Nuevo correo electrónico del empleado.
 * @param {string} req.body.telefono - Nuevo número de teléfono del empleado.
 * @param {string} req.body.cargo - Nuevo cargo del empleado.
 * @param {string} req.body.pais - Nuevo país del empleado.
 * @returns {Object} - El empleado actualizado.
 * @throws {Error} - Devuelve un error si hay un problema al editar el empleado.
 */

export const editarEmpleado = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario_id = req.usuario.id;
    const { nombre, email, telefono, cargo, pais, password } = req.body;
    const empleado = await EmpleadoServicio.editarEmpleado(
      id,
      nombre,
      email,
      telefono,
      cargo,
      pais,
      usuario_id
    );
    res.status(200).json(empleado);
  } catch (error) {
    console.error("Error al editar el empleado:", error.message);
    res.status(500).json({ mensaje: "Error al editar el empleado." });
  }
};


/**
 * Elimina un empleado por su ID asociado con el usuario autenticado.
 * 
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 * @param {number} req.params.id - ID del empleado a eliminar.
 * @param {number} req.usuario.id - ID del usuario autenticado.
 * @returns {Object} - Un mensaje de confirmación de que el empleado se ha eliminado correctamente.
 * @throws {Error} - Devuelve un error si hay un problema al eliminar el empleado.
 */
export const eliminarEmpleadoPorId = async (req, res) => {
  const id = req.params.id;
  const usuario_id = req.usuario.id;
  try {
    await EmpleadoServicio.eliminarEmpleadoPorId(id, usuario_id);
    res.status(200).json({ mensaje: "Empleado eliminado." });
  } catch (error) {
    console.error("Error al eliminar el empleado:", error.message);
    res.status(500).json({ mensaje: "Error al eliminar el empleado." });
  }
};