import nodemailer from "nodemailer";
/**
 * Envía un correo electrónico utilizando el servicio de nodemailer.
 *
 * @param {string} email - Dirección de correo electrónico del destinatario.
 * @param {string} asunto - Asunto del correo electrónico.
 * @param {string} cuerpo - Cuerpo del correo electrónico en formato HTML.
 * @returns {void}
 *
 * @description Esta función utiliza nodemailer para enviar un correo electrónico utilizando la configuración proporcionada en las variables de entorno.
 * Configura un transporte de correo utilizando el servicio de correo electrónico, el nombre de usuario y la contraseña proporcionados en las variables de entorno.
 * Luego, envía un correo electrónico al destinatario especificado con el asunto y el cuerpo proporcionados.
 **/
export const envioCorreo = async (email, asunto, cuerpo) => {
  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: asunto,
    html: cuerpo,
  });
};