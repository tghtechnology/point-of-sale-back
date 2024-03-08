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
    "SELECT * FROM categoria WHERE estado = true", [id]
    );
   return results;
}

const listarCategoriaPorId = async () => {
  const connection = await connect();
  const [results] = await connection.execute(
    "SELECT * FROM categoria WHERE id = ?",
  )
  return results;
}

const modificarCategoria = async (id, nombre, color, estado) => {
  const connection = await connect();

  await connection.query("UPDATE categoria SET nombre = ?, color = ? WHERE id = ? AND estado = true" ,
  [nombre, color, estado, id])
  return true;
}

const eliminarCategoria = async (id) => {
  const connection = await connect();
  await connection.execute(
    'UPDATE descuento SET estado = false WHERE id = ?',[id]
  );
}


module.exports = { 
  crearCategoria, 
  listarCategorias,
  listarCategoriaPorId,
  modificarCategoria,
  eliminarCategoria
}

