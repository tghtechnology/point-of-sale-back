import { connect } from "../database";



 



//Eliminar empleado
export const eliminarEmpleado = async (req, res) => {
    try {
      const connection = await connect();
      const { id } = req.params;
  
      await connection.execute("UPDATE empleados SET estado = false WHERE id = ?", [id]);
  
      res.status(200).json({ mensaje: 'Empleado eliminado con éxito.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Error al eliminar el empleado.' });
    }
  };