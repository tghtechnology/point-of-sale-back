import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Función ficticia para obtener la URL temporal
const obtenerURLTemporal = async () => {
  // Aquí iría la lógica para obtener la URL temporal
  return 'https://example.com/temporal-url';
};

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

export const enviarCorreoInvitacion = async (emailDestinatario) => {
  try {
    const urlTemporal = await obtenerURLTemporal();

    const correo = {
      from: process.env.EMAIL_USER,
      to: emailDestinatario,
      subject: '¡Has sido invitado!',
      html: `
      <html>
        <head>
          <style>
            /* Estilos CSS para el correo electrónico */
            body {
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100%;
              margin: 0;
              padding: 0;
              background-color: #f5f5f5;
            }
            #panel {
              width: 60%; /* Ancho del panel */
              border: 2px solid #808080; /* Borde del panel */
              padding: 20px; /* Espaciado interno del panel */
              background-color: white;
              text-align: center;
              margin: 0 auto;
            }
            button {
              background-color: #007bff;
              border: none;
              color: white;
              padding: 10px 20px;
              text-align: center;
              text-decoration: none;
              display: inline-block;
              font-size: 16px;
              margin: 4px 2px;
              border-radius: 5px; /* Added border-radius to make the corners rounded */
              cursor: pointer;
            }
            a {
              text-decoration: none;
              color: white;
            }
          </style>
        </head>
        <body>
          <div id="panel">
            <p>Hola,</p>
            <p>Has sido invitado a unirte a nuestra plataforma.</p>
            <p>Por favor haz clic en el siguiente enlace para aceptar la invitación:</p>
            <a href="${urlTemporal}">
              <button>Aceptar Invitación</button>
            </a>
          </div>
        </body>
      </html>
    `
    };

    const info = await transporter.sendMail(correo);
    console.log('Correo enviado:', info.messageId);

    return info;
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    throw error; // Lanzar el error para manejarlo en otro lugar si es necesario
  }
};

export default enviarCorreoInvitacion;
