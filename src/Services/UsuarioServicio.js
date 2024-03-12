import {connect} from "../database"
import { validarNombrePais } from "../helpers/helperPais";
import bcrypt from "bcrypt"

const crearUsuario = async (nombre, email, password, pais) => {
    // Validación del país
    if (!validarNombrePais(pais)) {
      throw new Error("País inválido");
    }
    // Encriptado de la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);
    // Creación del nuevo usuario en la base de datos
    const connection = await connect();
    const [result] = await connection.execute(
      "INSERT INTO usuarios (nombre, email, password, pais, estado) VALUES (?, ?, ?, ?, ?)",
      [nombre, email, hashedPassword, pais, true]
    );
}; 

//Función para verificar contraseña antes de eliminar
const verificarContrasena = async (id, password) => {
  const connection = await connect();
  
  const passwordFromRequest = password;
  const [results] = await connection.execute("SELECT password FROM usuarios WHERE id = ?", [id]);

  const hashedPasswordFromDatabase = results[0].password;
  const match = await bcrypt.compare(passwordFromRequest, hashedPasswordFromDatabase); //Comparación de contraseña ingresada y de la BD

  return match;
}

//Eliminar temporalmente durante 1 semana
const eliminarTemporalmente = async (id) => {
  const connection = await connect();

  //Verificar la existencia de un registro con la ID ingresada
  const [idResult] = await connection.execute("SELECT id, estado FROM usuarios WHERE id = ?", [id]);
  if (!idResult || idResult.length === 0) {
    return null; 
  }

  //Verificar que la cuenta no esté ya eliminada
  const { estado } = idResult[0];
  if (estado == 0) {
    return false
  }

  const [results] = await connection.execute("UPDATE usuarios SET estado = false, eliminado_temporal_fecha = CURRENT_TIMESTAMP WHERE id = ?", [id]);
  return results;
}

//Función para restaurar una cuenta que ha sido eliminada temporalmente
const restaurarCuenta = async (id) => {
  const connection = await connect();

  //Verificar la existencia de un registro con la ID ingresada
  const [idResult] = await connection.execute("SELECT id, estado FROM usuarios WHERE id = ?", [id]);
  if (!idResult || idResult.length === 0) {
    return null; 
  }

  //Verificar que la cuenta no esté ya restaurada
  const { estado } = idResult[0];
  if (estado == 1) {
    return false
  }

  const fecha = await connection.execute("SELECT eliminado_temporal_fecha FROM usuarios WHERE id = ?", [id])
  const eliminadoTemporalmente = fecha[0].eliminado_temporal_fecha;

  // Verificar si ha pasado más de 1 semana
  const unaSemanaEnMiliseg = 7 * 24 * 60 * 60 * 1000;
  const fechaAhora = new Date();
  const fechaEliminacion = new Date(eliminadoTemporalmente);

  if (fechaAhora - fechaEliminacion > unaSemanaEnMiliseg) {
    return true;
  }

  const [results] = await connection.execute("UPDATE usuarios SET estado = true, eliminado_temporal_fecha = null WHERE id = ?", [id]);
  return results;
}

//Función para eliminar las cuentas vencidas (pasado 1 semana de haber sido eliminados temporalmente)
const eliminarCuentasVencidas = async (id) => {
  const connection = await connect();

  ///Verificar la existencia de un registro con la ID ingresada
  const [idResult] = await connection.execute("SELECT id FROM usuarios WHERE id = ?", [id]);
  if (!idResult || idResult.length === 0) {
    return null; 
  }

  const [results] = await connection.execute("DELETE FROM usuarios WHERE estado = 1 AND eliminado_temporal_fecha <= NOW() - INTERVAL 1 WEEK");
  return results
}

//Función para eliminaruna cuenta permanentemente
const eliminarPermanentemente = async (id) => {
  const connection = await connect();

  //Verificar la existencia de un registro con la ID ingresada
  const [idResult] = await connection.execute("SELECT id FROM usuarios WHERE id = ?", [id]);
  if (!idResult || idResult.length === 0) {
    return null; 
  }

  const [results] = await connection.execute("DELETE FROM usuarios WHERE id = ?", [id]);
  return results
}


module.exports= { crearUsuario,
                  verificarContrasena,
                  eliminarTemporalmente,
                  restaurarCuenta,
                  eliminarCuentasVencidas,
                  eliminarPermanentemente
                }





