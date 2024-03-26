import * as EmpleadoServicio from '../Services/EmpleadoServicio'

// Controlador para crear un nuevo empleado
export const crearEmpleado = async (req, res) => {
  try {
    const { nombre, correo, telefono, estado, cargo } = req.body;
    const nuevoEmpleado = await EmpleadoServicio.crearEmpleado(
      nombre,
      correo,
      telefono,
      estado,
      cargo
    );
    res.status(201).json(nuevoEmpleado);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el empleado" });
  }
};

// Controlador para editar un empleado
export const editarEmpleado = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, correo, telefono, estado, cargo } = req.body;
    const empleadoEditado = await EmpleadoServicio.editarEmpleado(
      id,
      nombre,
      correo,
      telefono,
      estado,
      cargo
    );
    if (empleadoEditado) {
      res.status(200).json(empleadoEditado);
    } else {
      res.status(404).json({ error: "Empleado no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al editar el empleado" });
  }
};

// Controlador para obtener una lista de todos los empleados
export const listarEmpleados = async (req, res) => {
  try {
    const empleados = await EmpleadoServicio.listarEmpleados();
    res.status(200).json(empleados);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener la lista de empleados" });
  }
};

// Controlador para obtener un empleado por su ID
export const listarEmpleadoPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const empleado = await EmpleadoServicio.listarEmpleadoPorId(id);
    if (empleado) {
      res.status(200).json(empleado);
    } else {
      res.status(404).json({ error: "Empleado no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el empleado" });
  }
};

// Controlador para actualizar un empleado por su ID
export const actualizarEmpleadoPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, correo, telefono, estado, cargo } = req.body;
    const empleadoActualizado = await EmpleadoServicio.actualizarEmpleadoPorId(id, {
      nombre,
      correo,
      telefono,
      estado,
      cargo,
    });
    if (empleadoActualizado) {
      res.status(200).json(empleadoActualizado);
    } else {
      res.status(404).json({ error: "Empleado no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el empleado" });
  }
};

// Controlador para eliminar un empleado por su ID
export const eliminarEmpleadoPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const empleadoEliminado = await EmpleadoServicio.eliminarEmpleadoPorId(id);
    if (empleadoEliminado) {
      res.status(200).json(empleadoEliminado);
    } else {
      res.status(404).json({ error: "Empleado no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el empleado" });
  }
};