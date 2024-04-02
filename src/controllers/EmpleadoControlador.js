import * as EmpleadoServicio from "../Services/EmpleadoServicio";

export const crearEmpleado = async (req, res) => {
  try {
    const { nombre, correo, telefono, cargo } = req.body;
    const nuevoEmpleado = await EmpleadoServicio.crearEmpleado(
      nombre,
      correo,
      telefono,
      cargo
    );
    res.json(nuevoEmpleado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al crear el empleado" });
  }
};

export const editarEmpleado = async (req, res) => {
  try {
    const { id } = req.params;
    const {nombre, correo, telefono, cargo} = req.body;
    const empleadoActualizado = await EmpleadoServicio.editarEmpleado(id,nombre, correo, telefono, cargo);
    res.json(empleadoActualizado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al editar el empleado" });
  }
};

export const listarEmpleados = async (req, res) => {
  try {
    const empleados = await EmpleadoServicio.listarEmpleados();
    res.json(empleados);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al obtener la lista de empleados" });
  }
};

export const listarEmpleadoPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const empleado = await EmpleadoServicio.listarEmpleadoPorId(id);
    if (empleado) {
      res.json(empleado);
    } else {
      res.status(404).json({ mensaje: "Empleado no encontrado" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al obtener el empleado" });
  }
};

export const eliminarEmpleadoPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const resultado = await EmpleadoServicio.eliminarEmpleadoPorId(id);
    if (resultado) {
      res.json({ mensaje: "Empleado eliminado correctamente" });
    } else {
      res.status(404).json({ mensaje: "Empleado no encontrado" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al eliminar el empleado" });
  }
};

