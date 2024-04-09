import * as UsuarioServicio from "../Services/UsuarioServicio";
import { obtenerListaPaises } from "../helpers/helperPais";
export const listaPaises = async (req, res) => {
  try {
    // Obtiene la lista de todos los países
    const listaPaises = obtenerListaPaises();
    res.json(listaPaises);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Controlador para crear un nuevo usuario
export const crearUsuario = async (req, res) => {
  try {
    const { nombre, email, password, pais, telefono, cargo } = req.body;
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

//Eliminar temporalmente durante 1 semana
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

//Restaurar la cuenta dentro de una semana de eliminación temporal
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

//Eliminar cuenta automaticamente luego de pasada la semana
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
// Programar la tarea para ejecutarse periódicamente
setInterval(eliminarCuentasVencidas, 24 * 60 * 60 * 1000); // Ejecutar cada 24 horas

/** Eliminar cuenta permanentemente */
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
      return res.status(404).json({ error: "No se encontró el usuario" });
    } else if (error.message === "Contraseña incorrecta") {
      return res.status(404).json({ error: "No coincide la contraseña" });
    } else {
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  }
};