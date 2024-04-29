import * as UsuarioServicio from "../Services/UsuarioServicio";
import { obtenerListaPaises } from "../helpers/helperPais";

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

// Listar Paises
export const listaPaises = async (_req, res) => {
  try {
    const listaPaises = obtenerListaPaises();
    res.json(listaPaises);
  } catch (error) {
    handleError(res, error);
  }
};

// Crear Propietario
export const crearUsuario = async (req, res) => {
  try {
    const { nombre, email, password, pais, telefono } = req.body;
    const newUsuario = await UsuarioServicio.crearUsuario(
      nombre,
      email,
      password,
      pais,
      telefono
    );
    res.json(newUsuario);
  } catch (error) {
    handleError(res, error);
  }
};

// Editar Propietario por ID
export const editarUsuarioPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, email, telefono, pais } = req.body;
    const usuario = await UsuarioServicio.editarUsuarioPorId(
      id,
      nombre,
      email,
      telefono,
      pais
    );
    res.status(200).json(usuario);
  } catch (error) {
    handleError(res, error);
  }
};

// Cambiar Contraseña
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

// Listar Propietarios
export const listarUsuarios = async (_req, res) => {
  try {
    const usuarios = await UsuarioServicio.listarUsuarios();
    res.status(200).json(usuarios);
  } catch (error) {
    handleError(res, error);
  }
};

// Eliminar Temporalmente la cuenta
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

// Restaurar Cuenta
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

// Eliminar Cuentas Vencidas
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

// Eliminar Permanentemente la cuenta
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