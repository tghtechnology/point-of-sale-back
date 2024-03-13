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
        const newUsuario=await UsuarioServicio.crearUsuario(nombre,email,password,pais);
        res.json(newUsuario);
      } catch (error) {
        console.error(error);
      }
};

/**
 * Controladores de Verificar contraseña, eliminar cuenta temporalmente y permanentemente, restaurar cuenta
 */


//Verificar contraseña antes de eliminar cuenta
export const verificarContrasena = async (req, res) => {
  try {
    const id = req.params.id;
    const { password } = req.body;
    const match = await UsuarioServicio.verificarContrasena(id, password)
    
    if (match == null) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    } 
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

//Eliminar temporalmente durante 1 semana
export const eliminarTemporalmente = async (req, res) => {
  try {
    const id = req.params.id;
    const results = await UsuarioServicio.eliminarTemporalmente(id)

    if (results) {
      res.status(200).json({ mensaje: 'Cuenta eliminada con éxito por un plazo de 1 semana' });
    } else if (results == false){
      res.status(400).json({ mensaje: 'La cuenta ya ha sido eliminada temporalmente' });
    } else if (results === null){
      res.status(404).json({ mensaje: 'Usuario no encontrado' });
    } 
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al eliminar la cuenta temporalmente' });
  }
};

//Restaurar la cuenta dentro de una semana de eliminación temporal
export const restaurarCuenta = async (req, res) => {
  try {
    const id = req.params.id;
    const results = await UsuarioServicio.restaurarCuenta(id)

    if(results) {
      res.status(200).json({ mensaje: 'Cuenta restaurada' });
    } else if (results == false) {
      res.status(400).json({ mensaje: 'La cuenta ya ha sido restaurada' });
    } else if (results == true) {
      es.status(400).json({ mensaje: 'La cuenta ya está vencida' });
    } else if (results == null) {
      res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
    } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al restaurar la cuenta' });
  }
};


//Eliminar cuenta automaticamente luego de pasada la semana
export const eliminarCuentasVencidas = async (req, res) => {
try {
  const id = req.params.id;
  const results = await UsuarioServicio.eliminarCuentasVencidas(id)

  if (results) {
    res.status(200).json({ mensaje: 'La cuenta ha sido eliminada' });
  } else if (results === null){
    res.status(404).json({ mensaje: 'Usuario no encontrado' });
  } 
} catch (error) {
  console.error(error);
}
};

// Programar la tarea para ejecutarse periódicamente
setInterval(eliminarCuentasVencidas, 24 * 60 * 60 * 1000); // Ejecutar cada 24 horas


/** Eliminar cuenta permanentemente */
export const eliminarPermanentemente = async (req, res) => {
  try {
    const id = req.params.id;
    const results = await UsuarioServicio.eliminarPermanentemente(id)

    if (results) {
      res.status(200).json({ mensaje: 'Cuenta eliminada permanentemente' });
    } else if (results === null){
      res.status(404).json({ mensaje: 'Usuario no encontrado' });
    } 
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al eliminar la cuenta permanentemente' });
  }
};