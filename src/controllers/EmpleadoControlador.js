import * as EmpleadoServicio from "../Services/EmpleadoServicio";

export const crearEmpleado = async (req, res) => {
  const { nombre, email, telefono, cargo, pais, password } = req.body;
  try {
    const nuevoEmpleado = await EmpleadoServicio.crearEmpleado(
      nombre,
      email,
      telefono,
      cargo,
      pais,
      password
    );
    res.status(200).json(nuevoEmpleado);
  } catch (error) {
    console.error("Error al crear empleado:", error.message);
    res.status(500).json({ mensaje: "Error al crear el empleado." });
  }
};

export const listarEmpleados = async (_req, res) => {
  try {
    const empleados = await EmpleadoServicio.listarEmpleados();
    res.status(200).json(empleados);
  } catch (error) {
    console.error("Error al obtener la lista de empleados:", error.message);
    res
      .status(500)
      .json({ mensaje: "Error al obtener la lista de empleados." });
  }
};

export const listarEmpleadoPorId = async (req, res) => {
  const id = req.params.id;
  try {
    const empleado = await EmpleadoServicio.listarEmpleadoPorId(id);
    res.status(200).json(empleado);
  } catch (error) {
    console.error("Error al obtener el empleado:", error.message);
    res.status(500).json({ mensaje: "Error al obtener el empleado." });
  }
};

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
    console.error("Error al editar el empleado:", error.message);
    res.status(500).json({ mensaje: "Error al editar el empleado." });
  }
};

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
    console.error(
      "Error al cambiar la contraseña del empleado:",
      error.message
    );
    res
      .status(500)
      .json({ mensaje: "Error al cambiar la contraseña del empleado." });
  }
};

export const eliminarEmpleadoPorId = async (req, res) => {
  const id = req.params.id;
  try {
    await EmpleadoServicio.eliminarEmpleadoPorId(id);
    res.status(200).json({ mensaje: "Empleado eliminado." });
  } catch (error) {
    console.error("Error al eliminar el empleado:", error.message);
    res.status(500).json({ mensaje: "Error al eliminar el empleado." });
  }
};
