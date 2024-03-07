import {connect} from "../database"
const crearUsuario=async (nombre,email,hashedPassword,pais)=>{
const [results] = await connection.execute(
    "INSERT INTO usuarios(nombre, email, password, pais,estado) VALUES (?, ?,?,?,?)",
    [nombre, email, hashedPassword, pais,true]
  );
}
module.exports={crearUsuario}