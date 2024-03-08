import { connect } from "../database";
import Categoria from "../Models/Categoria";

const crearCategoria = async (nombre, color) => {
  const connection = await connect();
  const [results] = await connection.execute(
    "INSERT INTO categoria (nombre, color, estado) VALUES (?, ?, true)",
    [nombre, color]
  ); 
 
  return results; 
}
const listarCategorias = async ()=>{
  const connection = await connect();
   const [results] = await connection.execute(
    "SELECT * FROM categoria WHERE estado = true"
    );
   return results;
}


module.exports = { crearCategoria, listarCategorias}

