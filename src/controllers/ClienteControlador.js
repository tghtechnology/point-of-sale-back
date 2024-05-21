import * as ClienteServicio from "../Services/ClienteServicio"
import { crearUsuario } from "../Services/UsuarioServicio";
import { obtenerListaPaises } from "../helpers/helperPais";

/**
 * Obtiene una lista de todos los países.
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 * @returns {Object} - La lista de todos los países.
 * @throws {Error} - Devuelve un error si hay un problema al obtener la lista de países.
 */
export const listaPaises = async (req, res) => {
  try {
    const listaPaises = obtenerListaPaises();
    res.json(listaPaises);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Crea un nuevo cliente.
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 * @param {string} req.body.nombre - El nombre del cliente.
 * @param {string} req.body.email - El correo electrónico del cliente.
 * @param {string} req.body.telefono - El número de teléfono del cliente.
 * @param {string} req.body.direccion - La dirección del cliente.
 * @param {string} req.body.ciudad - La ciudad del cliente.
 * @param {string} req.body.region - La región del cliente.
 * @param {string} req.body.pais - El país del cliente.
 * @returns {Object} - El nuevo cliente creado.
 * @throws {Error} - Devuelve un error si hay un problema al crear el cliente.
 */
export const crearCliente = async (req, res)=>{
    try {
      const usuario_id = req.usuario.id;
        const {nombre,email,telefono,direccion, ciudad, region, pais}=req.body
        const newCliente=await ClienteServicio.crearCliente(nombre,email,telefono,direccion, ciudad, region, pais, usuario_id) ;
        res.json(newCliente);
      } catch (error) {
        console.error(error);
        if (error.message=="País inválido") {
          return res.status(400).json({ message: error.message });
        } if (error.message=="El correo electrónico ya está en uso") {
          return res.status(400).json({ message: error.message });
        } else {
          return res.status(500).json({ mensaje: 'Error interno del servidor '});
        }
      }
};

/**
 * Obtiene la lista de todos los clientes.
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 * @returns {Object} - La lista de todos los clientes.
 * @throws {Error} - Devuelve un error si hay un problema al obtener la lista de clientes.
 */
export const listarClientes = async (req, res) => { 
    try {
      const usuario_id = req.usuario.id;
        const clientes = await ClienteServicio.listarClientes(usuario_id);
        res.status(200).json(clientes);
      } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al obtener la lista de clientes.' });
      }
}

/**
 * Obtiene un cliente por su ID.
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 * @param {number} req.params.id - El ID del cliente.
 * @returns {Object} - El cliente encontrado.
 * @throws {Error} - Devuelve un error si hay un problema al obtener el cliente.
 */
export const obtenerClienteById= async (req, res)=>{
    try {
        const id = req.params.id;
        const usuario_id = req.usuario.id;
        const cliente=await ClienteServicio.obtenerClienteById(id, usuario_id);
        if (!cliente) {
          res.status(404).json({ mensaje: 'Cliente no encontrado' });
        } else {
          res.status(200).json(cliente);
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al obtener el cliente.' });
      }
}

/**
 * Edita un cliente existente.
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 * @param {number} req.params.id - El ID del cliente a editar.
 * @param {string} req.body.nombre - El nuevo nombre del cliente.
 * @param {string} req.body.email - El nuevo correo electrónico del cliente.
 * @param {string} req.body.telefono - El nuevo número de teléfono del cliente.
 * @param {string} req.body.direccion - La nueva dirección del cliente.
 * @param {string} req.body.ciudad - La nueva ciudad del cliente.
 * @param {string} req.body.region - La nueva región del cliente.
 * @param {string} req.body.pais - El nuevo país del cliente.
 * @returns {Object} - El cliente actualizado.
 * @throws {Error} - Devuelve un error si hay un problema al editar el cliente.
 */
export const editarCliente=async (req,res) => {
    try {
        const id = req.params.id;
        const usuario_id = req.usuario.id;
        const {nombre,email,telefono,direccion, ciudad, region, pais}=req.body
        const cliente=await ClienteServicio.editarCliente(id,nombre,email,telefono,direccion, ciudad, region, pais, usuario_id);
          res.status(200).json(cliente);
      } catch (error) {
        console.error(error);
        if (error.message=="País inválido") {
          return res.status(400).json({ message: error.message });
        } if (error.message=="El correo electrónico ya está en uso") {
          return res.status(400).json({ message: error.message });
        } if (error.message=="Cliente no encontrado") {
          return res.status(400).json({ message: error.message });
        } else {
          return res.status(500).json({ mensaje: 'Error interno del servidor '});
        }
      }
}

/**
 * Elimina un cliente por su ID.
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 * @param {number} req.params.id - El ID del cliente a eliminar.
 * @returns {Object} - Un mensaje de confirmación de que el cliente se ha eliminado correctamente.
 * @throws {Error} - Devuelve un error si hay un problema al eliminar el cliente.
 */
export const eliminarCliente=async(req,res)=>{
    try {
        const id = req.params.id;
        const usuario_id = req.usuario.id;
        const cliente=await ClienteServicio.eliminarCliente(id, usuario_id);
          res.status(200).json({ mensaje: 'Cliente eliminado correctamente' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al eliminar el cliente.' });
      }
}
