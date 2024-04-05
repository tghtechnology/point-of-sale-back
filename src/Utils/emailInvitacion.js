import nodemailer from "nodemailer";

export const enviarCorreoBienvenida = async (
  destinatario,
  nombre,
  correo,
  contrasena
) => {
  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mensajeCorreo = {
    from: process.env.EMAIL_USER,
    to: destinatario,
    subject: "¡Bienvenido a la empresa!",
    html: `
      <p>Hola ${nombre},</p>
      <p>¡Bienvenido a nuestra empresa! Te damos la bienvenida como nuevo empleado.</p>
      <p>Tus credenciales de inicio de sesión son:</p>
      <p>Correo electrónico: ${correo}</p>
      <p>Contraseña: ${contrasena}</p>
      <p>Por favor, asegúrate de mantener seguras tus credenciales de inicio de sesión.</p>
      <p>¡Gracias!</p>
    `,
  };

  await transporter.sendMail(mensajeCorreo);
};
