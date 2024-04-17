import * as UsuarioServicio from "../Services/UsuarioServicio";
import { obtenerListaPaises } from "../helpers/helperPais";

export const listaPaises = async (req, res) => {
  try {
    const listaPaises = obtenerListaPaises();
    res.json(listaPaises);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const crearUsuario = async (req, res) => {
  try {
    const { nombre, email, password, pais, telefono, tipoUsuario } = req.body;
    const cargo = tipoUsuario === "Empleado" ? "Empleado" : "Gerente";
    const newUsuario = await UsuarioServicio.crearUsuario(
      nombre,
      email,
      password,
      pais,
      telefono,
      cargo
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
    const { nombre, email, telefono, cargo, pais } = req.body;
    const usuario = await UsuarioServicio.editarUsuarioPorId(
      id,
      nombre,
      email,
      telefono,
      cargo,
      pais
    );
    res.status(200).json(usuario);
  } catch (error) {
    console.error("Error al editar el propietario:", error.message);
    res.status(500).json({ mensaje: "Error al editar el propietario." });
  }
};

export const listarUsuarios = async (_req, res) => {
  try {
    const usuario = await UsuarioServicio.listarUsuarios();
    res.status(200).json(usuario);
  } catch (error) {
    console.error("Error al obtener la lista de propietarios:", error.message);
    res
      .status(500)
      .json({ mensaje: "Error al obtener la lista de propietarios." });
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
      .json({ mensaje: "Cuenta eliminada con éxito por un plazo de 1 semana" });
  } catch (error) {
    console.error("Error al eliminar:", error);
    if (error.message === "Debe iniciar sesión") {
      return res.status(400).json({ error: "Inicie sesion" });
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
  }
};

export const restaurarCuenta = async (req, res) => {
  try {
    const id = req.params.id;
    const results = await UsuarioServicio.restaurarCuenta(id);

    if (results) {
      res.status(200).json({ mensaje: "Cuenta restaurada" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al restaurar la cuenta" });
  }
};

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
    console.error(error);
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
    console.error("Error al eliminar:", error);
    if (error.message === "Debe iniciar sesión") {
      return res
        .status(400)
        .json({ error: "Token no proporcionado o inválido" });
    } else if (error.message === "Usuario no encontrado") {
      return res.status(404).json({ error: "No se encontró el Propietario" });
    } else if (error.message === "Contraseña incorrecta") {
      return res.status(404).json({ error: "No coincide la contraseña" });
    } else {
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  }
};
