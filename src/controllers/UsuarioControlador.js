import {connect} from "../database";
import bcrypt from "bcrypt"
import * as UsuarioServicio from "../Services/UsuarioServicio"
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
//Creacion de usuario con sus requerimientos o validaciones
export const crearUsuario=async (req, res)=>{
    try {
        const {nombre,email,password,pais}=req.body
        const id=await UsuarioServicio.crearUsuario(nombre,email,password,pais);
        // Construcción del objeto de nuevo usuario
        const newUsuario = {
            id: id, 
            nombre: nombre,
            email: email,
            pais: pais,
            estado:true
      };
        res.json(newUsuario);
      } catch (error) {
        console.error(error);
      }
};

/**
 * Funcionalidades de Verificar contraseña, eliminar cuenta temporalmente y permanentemente
 */
//Verificar contraseña antes de eliminar cuenta
export const verificarContrasena = async (req, res) => {
  try {
    const connection = await connect();
    const userId = req.params.id;
    const passwordFromRequest = req.body.password;

    const [results] = await connection.execute("SELECT password FROM usuarios WHERE id = ?", [userId]);

    if (results.length === 0) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    } 

    const hashedPasswordFromDatabase = results[0].password;
    const match = await bcrypt.compare(passwordFromRequest, hashedPasswordFromDatabase);

    if (match) {
      res.status(200).json({ mensaje: 'Contraseña verificada' });
    } else {
      res.status(401).json({ mensaje: 'Contraseña incorrecta' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al verificar la contraseña' });
  }
};

export const eliminarTemporalmente = async (req, res) => {
  try {
    const connection = await connect();
    const userId = req.params.id;

    // Lógica para marcar la cuenta como eliminada temporalmente
    await connection.execute("UPDATE usuarios SET estado = '1', eliminado_temporal_fecha = CURRENT_TIMESTAMP WHERE id = ?", [userId]);

    res.status(200).json({ mensaje: 'Cuenta eliminada temporalmente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al eliminar la cuenta temporalmente.' });
  }
};

//Restaurar la cuenta dentro de una semana de eliminación temporal
export const restaurarCuenta = async (req, res) => {
  try {
    const connection = await connect();
    const userId = req.params.id;

    // Lógica para restaurar la cuenta
    await connection.execute("UPDATE usuarios SET estado = 0 WHERE id = ?", [userId]);

    res.status(200).json({ mensaje: 'Cuenta restaurada' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al restaurar la cuenta' });
  }
};

//Eliminar cuenta automaticamente luego de pasada la semana

export const eliminarCuentasVencidas = async () => {
try {
  const connection = await connect();

  // Lógica para eliminar permanentemente las cuentas después de una semana
  await connection.execute("DELETE FROM usuarios WHERE estado = 1 AND eliminado_temporal_fecha <= NOW() - INTERVAL 1 WEEK");
} catch (error) {
  console.error(error);
}
};

// Programar la tarea para ejecutarse periódicamente (por ejemplo, cada día)
setInterval(eliminarCuentasVencidas, 24 * 60 * 60 * 1000); // Ejecutar cada 24 horas

/** Eliminar cuenta permanentemente */
export const eliminarPermanentemente = async (req, res) => {
  try {
    const connection = await connect();
    const userId = req.params.id;

    // Lógica para eliminar permanentemente la cuenta directamente
    await connection.execute("DELETE FROM usuarios WHERE id = ?", [userId]);

    res.status(200).json({ mensaje: 'Cuenta eliminada permanentemente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al eliminar la cuenta permanentemente' });
  }
};