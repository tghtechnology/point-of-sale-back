import * as ClienteServicio from "../Services/ClienteServicio"
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
export const crearCliente = async (req, res)=>{
    try {
        const {nombre,email,telefono,direccion, ciudad, region, codigo_postal, pais}=req.body
        const newCliente=await ClienteServicio.crearCliente(nombre,email,telefono,direccion, ciudad, region, codigo_postal, pais) ;
        res.json(newCliente);
      } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al crear el cliente.' });
      }
}
export const listarClientes = async (req, res) => { 
    try {
        const clientes = await ClienteServicio.listarClientes();
        res.status(200).json(clientes);
      } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al obtener la lista de clientes.' });
      }
}
export const obtenerClienteById= async (req, res)=>{
    try {
        const id = req.params.id;
        const cliente=await ClienteServicio.obtenerClienteById(id);
        res.status(200).json(cliente);
      } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al obtener el cliente.' });
      }
}
export const editarCliente=async (req,res) => {
    try {
        const id = req.params.id;
        const {nombre,email,telefono,direccion, ciudad, region,codigo_postal, pais}=req.body
        const cliente=await ClienteServicio.editarCliente(id,nombre,email,telefono,direccion, ciudad, region,codigo_postal, pais);
        res.status(200).json(cliente);
      } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al editar el cliente.' });
      }
}
export const eliminarCliente=async(req,res)=>{
    try {
        const id = req.params.id;
        const cliente=await ClienteServicio.eliminarCliente(id);
        res.status(200).json(cliente);
      } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al eliminar el cliente.' });
      }
}
