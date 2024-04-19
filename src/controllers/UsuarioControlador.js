import * as UsuarioServicio from "../Services/UsuarioServicio";
import { obtenerListaPaises } from "../helpers/helperPais";

export const listaPaises = async (_req, res) => {
  try {
    const listaPaises = obtenerListaPaises();
    res.json(listaPaises);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const crearUsuario = async (req, res) => {
  try {
    const { nombre, email, password, pais, telefono} = req.body;
    const newUsuario = await UsuarioServicio.crearUsuario(
      nombre,
      email,
      password,
      pais,
      telefono
    );
    res.json(newUsuario);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

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
    console.error("Error al editar el usuario:", error.message);
    res.status(500).json({ mensaje: "Error al editar el usuario." });
  }
};

export const cambiarContraseña = async (req, res) => {
  try {
    const { id } = req.params;
    const { contraseñaActual, nuevaContraseña, verificarContraseña } = req.body;
    const result = await UsuarioServicio.cambiarContraseña(id, contraseñaActual, nuevaContraseña, verificarContraseña);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error al cambiar la contraseña:", error.message);
    res.status(400).json({ error: error.message });
  }
};

export const listarUsuarios = async (_req, res) => {
  try {
    const usuarios = await UsuarioServicio.listarUsuarios();
    res.status(200).json(usuarios);
  } catch (error) {
    console.error("Error al obtener la lista de usuarios:", error.message);
    res.status(500).json({ mensaje: "Error al obtener la lista de usuarios." });
  }
};


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
      .json({ mensaje: "Cuenta eliminada temporalmente con éxito" });
  } catch (error) {
    console.error("Error al eliminar temporalmente la cuenta:", error);
    if (error.message === "Debe iniciar sesión") {
      return res.status(400).json({ error: "Inicie sesión" });
    } else if (error.message === "Token no proporcionado") {
      return res.status(404).json({ error: "Ingrese el token" });
    } else if (error.message === "Usuario no encontrado") {
      return res.status(404).json({ error: "Usuario no encontrado" });
    } else if (error.message === "Contraseña incorrecta") {
      return res.status(404).json({ error: "Contraseña incorrecta" });
    } else if (error.message === "Cuenta eliminada") {
      return res
        .status(401)
        .json({ error: "Esta cuenta ya fue eliminada temporalmente" });
    } else {
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  }
};

export const restaurarCuenta = async (req, res) => {
  try {
    const id = req.params.id;
    const results = await UsuarioServicio.restaurarCuenta(id);

    if (results) {
      res.status(200).json({ mensaje: "Cuenta restaurada" });
    } else {
      res.status(404).json({ mensaje: "La cuenta no existe o no se puede restaurar" });
    }
  } catch (error) {
    console.error("Error al restaurar la cuenta:", error);
    res.status(500).json({ mensaje: "Error al restaurar la cuenta" });
  }
};

export const eliminarCuentasVencidas = async (_req, res) => {
  try {
    const results = await UsuarioServicio.eliminarCuentasVencidas();
    if (results) {
      res.status(200).json({ mensaje: "Cuentas vencidas eliminadas" });
    } else {
      res.status(404).json({ mensaje: "No se encontraron cuentas vencidas" });
    }
  } catch (error) {
    console.error("Error al eliminar cuentas vencidas:", error);
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};

setInterval(eliminarCuentasVencidas, 24 * 60 * 60 * 1000);

export const eliminarPermanentemente = async (req, res) => {
  try {
    const { usuario_id, password, token } = req.body;
    const results = await UsuarioServicio.eliminarPermanentemente(
      usuario_id,
      password,
      token
    );

    if (results) {
      res.status(200).json({ mensaje: "Cuenta eliminada permanentemente" });
    }
  } catch (error) {
    console.error("Error al eliminar permanentemente la cuenta:", error);
    if (error.message === "Debe iniciar sesión") {
      return res
        .status(400)
        .json({ error: "Token no proporcionado o inválido" });
    } else if (error.message === "Usuario no encontrado") {
      return res.status(404).json({ error: "Usuario no encontrado" });
    } else if (error.message === "Contraseña incorrecta") {
      return res.status(404).json({ error: "Contraseña incorrecta" });
    } else {
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  }
};