import * as EmpleadoServicio from "../Services/EmpleadoServicio";

const handleError = (res, error) => {
  console.error("Error:", error.message);
  res.status(500).json({ mensaje: "Error interno del servidor" });
};

// Crear Empleado
export const crearEmpleado = async (req, res) => {
  try {
    const { nombre, email, telefono, cargo, pais, password, propietarioId } = req.body;
    const nuevoEmpleado = await EmpleadoServicio.crearEmpleado(nombre, email, telefono, cargo, pais, password, propietarioId);
    res.status(200).json(nuevoEmpleado);
  } catch (error) {
    handleError(res, error);
  }
};

// Listar Empleados
export const listarEmpleados = async (_req, res) => {
  try {
    const empleados = await EmpleadoServicio.listarEmpleados();
    res.status(200).json(empleados);
  } catch (error) {
    handleError(res, error);
  }
};

// Listar Empleados por ID
export const listarEmpleadoPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const empleado = await EmpleadoServicio.listarEmpleadoPorId(id);
    res.status(200).json(empleado);
  } catch (error) {
    handleError(res, error);
  }
};

// Editar Empleado
export const editarEmpleado = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, email, telefono, cargo, pais } = req.body;
    const empleado = await EmpleadoServicio.editarEmpleado(
      id,
      nombre,
      email,
      telefono,
      cargo,
      pais
    );
    res.status(200).json(empleado);
  } catch (error) {
    handleError(res, error);
  }
};

// Cambiar contraseña 
export const cambiarContraseña = async (req, res) => {
  try {
    const { id } = req.params;
    const { contraseñaActual, nuevaContraseña, confirmarNuevaContraseña } =
      req.body;
    await EmpleadoServicio.cambiarContraseña(
      id,
      contraseñaActual,
      nuevaContraseña,
      confirmarNuevaContraseña
    );
    res.status(200).json({ mensaje: "Contraseña cambiada exitosamente." });
  } catch (error) {
    handleError(res, error);
  }
};

// Eliminar Empleado por ID
export const eliminarEmpleadoPorId = async (req, res) => {
  try {
    const { id } = req.params;
    await EmpleadoServicio.eliminarEmpleadoPorId(id);
    res.status(200).json({ mensaje: "Empleado eliminado." });
  } catch (error) {
    handleError(res, error);
  }
};