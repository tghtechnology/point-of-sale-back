import {connect} from "../database";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import nodemailer from "nodemailer"


// Función para enviar un PIN de verificación por correo electrónico
let temporaryPIN = "";
let temporaryEmail = "";

export const enviarPIN = async (req, res) => {
  try {
    // Conexión a la base de datos
    const connection = await connect();

    // Búsqueda del usuario por su correo electrónico en la base de datos
    const [results] = await connection.execute(
      "SELECT * FROM usuarios WHERE email = ?",
      [req.body.email]
    );

    // Verificación de la existencia del usuario
    if (results.length === 0) {
      return res.status(404).json({ error: "¡Email no encontrado!" });
    }
    // Generación de un PIN aleatorio de 6 dígitos
    temporaryPIN = Math.floor(100000 + Math.random() * 900000);

    // Almacenar temporalmente el correo electrónico
    temporaryEmail = req.body.email;

    // Configuración del transporte de correo utilizando nodemailer
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "dominickportella1470@gmail.com",
        pass: "kkewgsmxliotyndk",
      },
    });

    // Configuración del correo electrónico a enviar
    const mailOptions = {
      from: "dominickportella1470@gmail.com",
      to: req.body.email,
      subject: "PIN de Verificación",
      html: getVerificationEmailTemplate(temporaryPIN),
    };

    // Envío del correo electrónico
    await transporter.sendMail(mailOptions);

    // Respuesta con mensaje de éxito
    return res
      .status(200)
      .json({ message: "PIN de verificación enviado correctamente" });
  } catch (error) {
    console.error(error);
    // Restablecer las variables temporales en caso de error
    temporaryPIN = "";
    temporaryEmail = "";
    return res
      .status(500)
      .json({
        error: "Error al enviar el PIN de verificación por correo electrónico",
      });
  }
};


let PINVerificado
// Función para verificar el PIN de verificación
export const verificarPIN = async (req, res) => {
  try {
    const { pin } = req.body;

    // Verificación del PIN
    if (!temporaryEmail || pin !== temporaryPIN) {
      return res.status(400).json({ error: "PIN incorrecto o no se ha solicitado un PIN previamente" });
    }

    // Establecimiento de estado para indicar que el PIN se ha verificado correctamente
    PINVerificado = true;

    // Respuesta con mensaje de éxito
    return res.status(200).json({ message: "PIN verificado correctamente" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error al verificar el PIN" });
  }
};

// Función para cambiar la contraseña del usuario
export const cambiarPassword = async (req, res) => {
  try {
    // Verificación de si el PIN se ha verificado correctamente
    if (!PINVerificado) {
      return res.status(400).json({ error: "Debes verificar el PIN primero" });
    }
    //Valida que la nueva contraseña tenga minimo 8 caracteres
    if (req.body.newPassword.length < 8) {
      return res.status(400).json({ error: "La nueva contraseña debe tener al menos 8 caracteres" });
    }

    // Conexión a la base de datos
    const connection = await connect();

    // Búsqueda del usuario por su correo electrónico en la base de datos
    const [results] = await connection.execute(
      "SELECT * FROM usuarios WHERE email = ?",
      [temporaryEmail]
    );

    // Verificación de la existencia del usuario
    if (results.length === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const usuario = results[0];

    // Hashing de la nueva contraseña
    const hashedNewPassword = await bcrypt.hash(req.body.newPassword, 10);

    // Actualización de la contraseña en la base de datos
    await connection.execute(
      "UPDATE usuarios SET password = ? WHERE email = ?",
      [hashedNewPassword, temporaryEmail]
    );

    // Eliminar todos los tokens de sesión asociados con el usuario
    await connection.execute(
      "DELETE FROM sesiones WHERE usuario_id = ?",
      [usuario.id]
    );

    // Reinicio de las variables temporales después de cambiar la contraseña exitosamente
    temporaryEmail = undefined;
    PINVerificado = false;

    // Respuesta con mensaje de éxito
    return res.status(200).json({ message: "¡Contraseña actualizada exitosamente! Se ha cerrado la sesión." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error del servidor" });
  }
};

// Función para obtener la plantilla de correo electrónico de verificación con el PIN
const getVerificationEmailTemplate = (pin) => {
  return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>PIN de Verificación</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f8f9fa;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 600px;
          margin: 20px auto;
          padding: 20px;
          background-color: #ffffff;
          border-radius: 10px;
          box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
        }
        .header {
          text-align: center;
          margin-bottom: 20px;
        }
        .header img {
          width: 150px; /* Tamaño deseado para el logo */
        }
        .header h1 {
          color: #007bff;
          font-size: 24px;
          margin: 0;
        }
        .pin-container {
          background-color: #f8f9fa;
          padding: 20px;
          border-radius: 5px;
          text-align: center;
          margin-bottom: 20px;
        }
        .pin {
          font-size: 36px;
          font-weight: bold;
          color: #007bff;
          margin: 0;
          padding: 0;
          cursor: pointer;
          border: 2px solid #007bff;
          border-radius: 5px;
          padding: 10px 20px;
          transition: transform 0.3s ease, background-color 0.3s ease, color 0.3s ease;
        }
        .pin:hover {
          transform: scale(1.05);
          background-color: #007bff;
          color: #ffffff;
        }
        .footer {
          margin-top: 20px;
          color: #6c757d;
          font-size: 14px;
          text-align: center;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <img src="https://res.cloudinary.com/dnwzliif9/image/upload/c_fill,w_350,h_350,g_auto,e_improve,e_sharpen/v1709059272/logo_ehpejv.png"> <!-- Reemplaza "URL_DEL_LOGO" con la URL de tu logo -->
          <h1>PIN de Verificación</h1>
        </div>
        <p>Estimado/a,</p>
        <p>Has solicitado un PIN de verificación para completar un proceso de autenticación. A continuación, encontrarás tu PIN de verificación:</p>
        <div class="pin-container">
          <div class="pin">${pin}</div>
        </div>
        <p>Por favor, utiliza este PIN para continuar con el proceso de verificación. Este PIN es válido por un tiempo limitado.</p>
        <p>Gracias,</p>
        <p>Tu Equipo de Soporte</p>
        <p class="footer">Este es un correo electrónico automático. Por favor, no respondas a este mensaje.</p>
      </div>
    </body>
    </html>  
  `;
};
// Función para eliminar tokens de sesión expirados de la base de datos
const eliminarTokensExpirados = async () => {
  try {
    const connection = await connect(); // Establece una conexión a la base de datos
    const result=await connection.execute("DELETE FROM sesiones WHERE expiracion < NOW()"); // Elimina los tokens de sesión expirados de la base de datos
    if (result[0].affectedRows > 0) {
      console.log("Tokens expirados eliminados correctamente.");
    } else {
      console.log("No se encontraron tokens expirados para eliminar.");
    }
  } catch (error) {
    console.error("Error al eliminar tokens expirados:", error);
  }
};

// Llamada inicial para eliminar tokens de sesión expirados
eliminarTokensExpirados();

// Programación de la ejecución periódica para eliminar tokens de sesión expirados cada 24 horas
const horasEnMilisegundos = 24 * 60 * 60 * 1000; // 24 horas en milisegundos
setInterval(eliminarTokensExpirados, horasEnMilisegundos); // Ejecuta la función eliminarTokensExpirados cada 24 horas


/**
 * Funcionalidades de Verificar contraseña, eliminar cuenta temporalmente y permanentemente
 */


//Verificar contraseña antes de eliminar cuenta
export const verificarContrasena = async (req, res) => {
  try {
    const connection = await connect();
    const userId = req.params.id;
    const passwordFromRequest = req.body.password;

    const [results] = await connection.execute("SELECT password FROM usuarios WHERE id = ?", [userId]);

    if (results.length === 0) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    const hashedPasswordFromDatabase = results[0].password;
    const match = await bcrypt.compare(passwordFromRequest, hashedPasswordFromDatabase);

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

export const eliminarTemporalmente = async (req, res) => {
  try {
    const connection = await connect();
    const userId = req.params.id;

    // Lógica para marcar la cuenta como eliminada temporalmente
    await connection.execute("UPDATE usuarios SET estado = '1', eliminado_temporal_fecha = CURRENT_TIMESTAMP WHERE id = ?", [userId]);

    res.status(200).json({ mensaje: 'Cuenta eliminada temporalmente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al eliminar la cuenta temporalmente.' });
  }
};

//Restaurar la cuenta dentro de una semana de eliminación temporal
export const restaurarCuenta = async (req, res) => {
  try {
    const connection = await connect();
    const userId = req.params.id;

    // Lógica para restaurar la cuenta
    await connection.execute("UPDATE usuarios SET estado = 0 WHERE id = ?", [userId]);

    res.status(200).json({ mensaje: 'Cuenta restaurada' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al restaurar la cuenta' });
  }
};

//Eliminar cuenta automaticamente luego de pasada la semana

export const eliminarCuentasVencidas = async () => {
try {
  const connection = await connect();

  // Lógica para eliminar permanentemente las cuentas después de una semana
  await connection.execute("DELETE FROM usuarios WHERE estado = 1 AND eliminado_temporal_fecha <= NOW() - INTERVAL 1 WEEK");
} catch (error) {
  console.error(error);
}
};

// Programar la tarea para ejecutarse periódicamente (por ejemplo, cada día)
setInterval(eliminarCuentasVencidas, 24 * 60 * 60 * 1000); // Ejecutar cada 24 horas

/** Eliminar cuenta permanentemente */
export const eliminarPermanentemente = async (req, res) => {
  try {
    const connection = await connect();
    const userId = req.params.id;

    // Lógica para eliminar permanentemente la cuenta directamente
    await connection.execute("DELETE FROM usuarios WHERE id = ?", [userId]);

    res.status(200).json({ mensaje: 'Cuenta eliminada permanentemente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al eliminar la cuenta permanentemente' });
  }
};