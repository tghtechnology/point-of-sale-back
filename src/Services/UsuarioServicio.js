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
module.exports={crearUsuario}