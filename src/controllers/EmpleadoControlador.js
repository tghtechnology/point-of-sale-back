import * as EmpleadoServicio from "../Services/EmpleadoServicio";

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