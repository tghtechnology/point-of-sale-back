import { connect } from "../database";

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
    "SELECT id, nombre, color FROM categoria WHERE estado = true"
    );
   return results;
}

const listarCategoriaPorId = async (id) => {
  const connection = await connect();
  const [results] = await connection.execute(
    "SELECT id, nombre, color FROM categoria WHERE id = ? AND estado = true",[id]
  )
  return results;
}

const modificarCategoria = async (id, nombre, color) => {
  const connection = await connect();

  const [results] = await connection.query("UPDATE categoria SET nombre = ?, color = ? WHERE id = ? AND estado = true" ,
  [nombre, color, id])
  return results;
}

const eliminarCategoria = async (id) => {
  const connection = await connect();
  await connection.execute(
    'UPDATE categoria SET estado = false WHERE id = ?',[id]
  );
}


module.exports = { 
  crearCategoria, 
  listarCategorias,
  listarCategoriaPorId,
  modificarCategoria,
  eliminarCategoria
}

