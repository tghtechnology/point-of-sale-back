import * as EmpleadoServicio from "../Services/EmpleadoServicio";

export const crearEmpleado = async (req, res) => {
  const { nombre, correo, telefono, cargo, pais, password, rol} = req.body;
  try {
    const nuevoEmpleado = await EmpleadoServicio.crearEmpleado(
      nombre,
      correo,
      telefono,
      cargo,
      pais,
      password,
      rol
    );
    res.status(200).json(nuevoEmpleado);
  } catch (error) {
    console.error("Error al crear empleado:", error);
    res.status(500).json({ mensaje: "Error al crear el empleado." });
  }
};

// Controlador para listar todos los empleados
export const listarEmpleados = async (req, res) => {
  try {
    const empleados = await EmpleadoServicio.listarEmpleados();
    res.status(200).json(empleados);
  } catch (error) {
    console.error("Error al obtener la lista de empleados:", error);
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
    console.error("Error al obtener el empleado:", error);
    res.status(500).json({ mensaje: "Error al obtener el empleado." });
  }
};

// Controlador para editar un empleado por su ID
export const editarEmpleado = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, correo, telefono, cargo, pais, password, rol} = req.body;
    const empleado = await EmpleadoServicio.editarEmpleado(
      id,
      nombre,
      correo,
      telefono,
      cargo,
      pais,
      password,
      rol
    );
    res.status(200).json(empleado);
  } catch (error) {
    console.error("Error al editar el empleado:", error);
    res.status(500).json({ mensaje: "Error al editar el empleado." });
  }
};

export const eliminarEmpleadoPorId = async (req, res) => {
  const id = req.params.id;
  try {
    await EmpleadoServicio.eliminarEmpleadoPorId(id);
    res.status(200).json({ mensaje: "Empleado eliminado." });
  } catch (error) {
    console.error("Error al eliminar el empleado:", error);
    res.status(500).json({ mensaje: "Error al eliminar el empleado." });
  }
};
