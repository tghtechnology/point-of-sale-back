import { connect } from "../database";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import getVerificationEmailTemplate from "../helpers/helperPlantilla";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

//Lógica para iniciar sesión
export const login = async (email, password) => {
    const connection = await connect();
    const results = await prisma.usuario.findMany({
      where: {
        email: email
      },
    })
    if (results.length === 0) {
      throw new Error("Nombre de usuario o contraseña incorrectos");
    }

    const usuario = results[0];

    const match = await bcrypt.compare(password, usuario.password);
    if (!match) {
      throw new Error("Nombre de usuario o contraseña incorrectos");
    }
    //Verificar si existe una sesión activa 
    const existingSessions = await prisma.sesion.findMany({
      where: {
        usuario_id: usuario.id
      },
    })
    if (existingSessions.length > 0) {
      throw new Error("Sesión activa encontrada");
    }
    
    const token = jwt.sign(
      { id: usuario.id, email: usuario.email },
      "secreto_del_token",
      { expiresIn: "24h" }
    );

    const expiracion = new Date();
    expiracion.setHours(expiracion.getHours() + 24);
    await prisma.sesion.create({
      data: {
        usuario_id: usuario.id,
        token: token,
        expiracion: expiracion
      }
    })
    return token
};

//Lógica para cerrar sesión
export const logout = async (token) => {
    const decodedToken = jwt.verify(token, "secreto_del_token"); // Decodifica el token para obtener el ID de usuario
    // Conexión a la base de datos
    const connection = await connect(); // Establece una conexión a la base de datos

    // Eliminación del token de sesión del usuario
    await prisma.sesion.deleteMany({
      where: {
        usuario_id: decodedToken.id,
        token: token,
      },
    });
};

// Función para enviar un correo electrónico al usuario con un enlace para cambiar la contraseña
export const enviarCorreoCambioPass = async (email) => {
    // Verificar si el correo electrónico existe en la base de datos
    const usuario=await prisma.usuario.findUnique({
      where: {
        email:email,
      },
      select:{
        id:true,
        nombre:true
      }
    });
    if(!usuario){
      throw new Error("Correo no encontrado");
    }
    // Generar un token para el cambio de contraseña
    const token = jwt.sign(
      { usuarioId: usuario.id, email },
      "secreto_del_token_para_cambio_password",
      { expiresIn: "1h" }
    );

    //Creacion de registro en resetTokens
    const expiracion = new Date();
    expiracion.setHours(expiracion.getHours() + 1);
    await prisma.resetToken.create({
      data: {
        token: token,
        expiracion: expiracion, 
        usuario_id: usuario.id,
      },
    });

    // Generar el enlace para cambiar la contraseña
    const resetPasswordLink = `http://${process.env.URL}/cambiarPassword?token=${token}`;
 
    // Configurar el transporte de correo electrónico
    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Enviar el correo electrónico con el enlace para cambiar la contraseña
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Cambio de Contraseña",
      html: getVerificationEmailTemplate(usuario.nombre, resetPasswordLink),
    });
    // Si todo está bien, no enviamos ningún mensaje de éxito al cliente
    return;
};

// Función para cambiar la contraseña del usuario a través de un enlace con token
export const cambiarPassword = async (token, password) => {
  try {
    // Verificar si el token está vacío
    if (!token) {
      throw new Error("Falta el token");
    }

    // Verificar si la nueva contraseña cumple con los requisitos mínimos
    if (password.length < 8) {
      throw new Error("La nueva contraseña debe tener al menos 8 caracteres");
    }

    // Descodificar el token
    const decodedToken = jwt.verify(
      token,
      "secreto_del_token_para_cambio_password"
    );

    // Buscar al usuario en la base de datos
    const usuario = await prisma.usuario.findUnique({
      where: {
        email: decodedToken.email,
      },
    });

    // Verificar si el usuario existe
    if(!usuario){
      throw new Error("Correo no encontrado");
    }

    // Encriptar la nueva contraseña
    const hashedNewPassword = await bcrypt.hash(password, 10);

    // Actualizar la contraseña del usuario en la base de datos
    const actualizarPass = await prisma.usuario.update({
      where: {
        email: decodedToken.email,
      },
      data: {
        password: hashedNewPassword,
      },
    });

     // Verificar si el usuario tiene una sesión activa
     const activeSessions = await prisma.sesion.findMany({
      where: {
        usuario_id: usuario.id,
       expiracion: {
          gt: new Date(),
        },
      },
    });

    // Si el usuario tiene una sesión activa, cerrarla
    if (activeSessions.length > 0) {
      await logout(activeSessions[0].token);
    }


    // Retornar un mensaje de éxito
    return "¡Contraseña actualizada exitosamente!";
  } catch (error) {
    console.error("Error al cambiar la contraseña:", error);
    throw new Error(
      "Ocurrió un error. Por favor, inténtelo de nuevo más tarde"
    );
  }
};

// Función para eliminar tokens de sesión expirados y tokens de cambio de contraseña expirados de la base de datos
export const eliminarTokensExpirados = async () => {
  try {
    // Conectar a la base de datos

    // Eliminar tokens de sesión expirados
    const eliminarTokenSesion = await prisma.resetToken.deleteMany({
      where: {
        expiracion: {
          lt: new Date(),
        },
      },
    });

    // Eliminar tokens de cambio de contraseña expirados
    const eliminarTokenPassword = await prisma.sesion.deleteMany({
      where: {
        expiracion: {
          lt: new Date(),
        },
      },
    });

    // Verificar si se eliminaron tokens
    if (
      eliminarTokenSesion.affectedRows > 0 ||
      eliminarTokenPassword.affectedRows > 0
    ) {
      console.log("Tokens expirados eliminados correctamente.");
    }
  } catch (error) {
    console.error("Error al eliminar tokens expirados:", error);
    throw new Error(
      "Ocurrió un error. Por favor, inténtelo de nuevo más tarde"
    );
  }
};



