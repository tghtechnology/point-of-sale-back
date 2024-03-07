import {connect} from "../database";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

//Importacion de la libreria i18n-iso-countries
const paises = require("i18n-iso-countries");

//Solicitud del archivo que contiene los paises en español
paises.registerLocale(require("i18n-iso-countries/langs/es.json"))

//Lista de los nombres de todos los paises del mundo en español
export const listaPaises=async(req,res)=>{
    const listaPaises=Object.values(paises.getNames('es', {select: "official"}))
    res.json(listaPaises)
}

//Validacion si el pais existe segun a la lista
function validarNombrePais(pais) {
    const lista = paises.getNames('es');
    return Object.values(lista).includes(pais);
  }

//Creacion de usuario con sus requerimientos o validaciones
export const crearUsuario=async (req, res)=>{
    try {
        const connection = await connect();
        //Contraseña debe tener minimo numero de caracteres
        if (req.body.password.length < 8) {
          return res.status(400).json({ error: "La contraseña debe tener al menos 8 caracteres" });
      }
      //Encriptado de contraseña
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const pais=req.body.pais
        //Validacion con el pais ingresado
        if(!validarNombrePais(pais)){
            return res.status(400).json({ error: "Pais inválido" });
        }
        const [results] = await connection.execute(
          "INSERT INTO usuarios(nombre, email, password, pais,estado) VALUES (?, ?,?,?,?)",
          [req.body.nombre, req.body.email, hashedPassword, pais,true]
        );
          
        // Construcción del objeto de nuevo usuario
        const newUsuario = {
            id: results.insertId, 
            nombre: req.body.nombre,
            email: req.body.email,
            pais: pais,
            password: hashedPassword,
            estado:true
      };
        res.json(newUsuario);
      } catch (error) {
        console.error(error);
      }
};
// Middleware para verificar token de sesión
export const verificarSesion = async (req, res, next) => {
  const token = req.headers.authorization; // Obtiene el token de autorización del encabezado de la solicitud

  if (!token) {
    // Si no hay token proporcionado en el encabezado
    return res.status(401).json({ error: "Token no proporcionado" }); // Devuelve un error de "Token no proporcionado"
  }

  try {
    const decoded = jwt.verify(token, "secreto_del_token"); // Verifica y decodifica el token usando el secreto "secreto_del_token"
    req.usuarioId = decoded.id; // Asigna el ID del usuario decodificado a req.usuarioId
    next(); // Llama a la siguiente función en la cadena de middleware
  } catch (error) {
    return res.status(401).json({ error: "Token inválido" }); // Si hay un error en la verificación del token, devuelve un error de "Token inválido"
  }
};

// Función para autenticar a un usuario
export const login = async (req, res) => {
  try {
    // Conexión a la base de datos
    const connection = await connect(); // Establece una conexión a la base de datos

    // Búsqueda del usuario por su correo electrónico en la base de datos
    const [results] = await connection.execute(
      "SELECT * FROM usuarios WHERE email = ?", // Consulta SQL para buscar un usuario por su correo electrónico
      [req.body.email] // Valor del correo electrónico a buscar en la consulta SQL
    );

    // Verificación de la existencia del usuario
    if (results.length === 0) {
      // Si no se encuentra ningún usuario con el correo electrónico proporcionado
      return res
        .status(401)
        .json({ error: "Nombre de usuario o contraseña incorrectos" }); // Devuelve un error de "Nombre de usuario o contraseña incorrectos"
    }

    // Obtención de los datos del usuario
    const usuario = results[0]; // Obtiene el primer resultado de la consulta como el usuario encontrado

    // Verificación de la contraseña
    const match = await bcrypt.compare(req.body.password, usuario.password); // Compara la contraseña proporcionada con la contraseña hasheada almacenada en la base de datos
    if (!match) {
      // Si las contraseñas no coinciden
      return res
        .status(401)
        .json({ error: "Nombre de usuario o contraseña incorrectos" }); // Devuelve un error de "Nombre de usuario o contraseña incorrectos"
    }

    // Verificar si el usuario ya tiene una sesión activa
    const [existingSessions] = await connection.execute(
      "SELECT * FROM sesiones WHERE usuario_id = ?", // Consulta SQL para verificar si hay sesiones activas para el usuario
      [usuario.id] // ID del usuario a buscar en la consulta SQL
    );

    if (existingSessions.length > 0) {
      // Si ya existe al menos una sesión activa para el usuario
      return res
        .status(400)
        .json({ error: "Ya hay una sesión activa para este usuario" }); // Devuelve un error de "Ya hay una sesión activa para este usuario"
    }

    // Generación de token de sesión utilizando JWT con tiempo de expiración de 24 horas
    const token = jwt.sign(
      { id: usuario.id, email: usuario.email },
      "secreto_del_token",
      { expiresIn: "24h" }
    ); 

    // Almacenamiento del token en la base de datos
    await connection.execute(
      "INSERT INTO sesiones (usuario_id, token, expiracion) VALUES (?, ?, DATE_ADD(NOW(), INTERVAL 24 HOUR))", // Consulta SQL para insertar el token de sesión en la base de datos con el tiempo de expiración
      [usuario.id, token] // Valores a insertar en la consulta SQL
    );

    // Respuesta con el token de sesión
    return res.json({ token }); // Devuelve el token de sesión en la respuesta
  } catch (error) {
    console.error(error); // Manejo de errores
    return res.status(500).json({ error: "Error del servidor" }); // Devuelve un error de "Error del servidor" en caso de error
  }
};


// Función para cerrar sesión manualmente
export const logout = async (req, res) => {
  try {
    // Extracción del token de autorización del encabezado de la solicitud
    const token = req.headers.authorization.split(" ")[1]; // Obtiene el token de autorización del encabezado y lo divide para obtener solo el token

    // Decodificación del token para obtener el ID de usuario
    const decodedToken = jwt.verify(token, "secreto_del_token"); // Decodifica el token para obtener el ID de usuario

    // Conexión a la base de datos
    const connection = await connect(); // Establece una conexión a la base de datos

    // Eliminación del token de sesión del usuario
    await connection.execute(
      "DELETE FROM sesiones WHERE usuario_id = ? AND token = ?", // Consulta SQL para eliminar el token de sesión de la base de datos
      [decodedToken.id, token] // Valores a utilizar en la consulta SQL
    );

    // Respuesta con mensaje de éxito
    return res.json({ message: "Sesión cerrada exitosamente" }); // Devuelve un mensaje de éxito en la respuesta
  } catch (error) {
    console.error(error); // Manejo de errores
    return res.status(500).json({ error: "Error del servidor" }); // Devuelve un error de "Error del servidor" en caso de error
  }
};

