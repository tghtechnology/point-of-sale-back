export const enviarCorreoBienvenida = async (
  destinatario,
  nombre,
  email,
  contrasena,
  urlEmpleado
) => {
  const invitacionLink = `${urlEmpleado}`;
  const mensajeCorreo = {
    from: process.env.EMAIL_USER,
    to: destinatario,
    subject: "¡Bienvenido a la empresa!",
    html: `
      <!DOCTYPE html>
      <html lang="es">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Bienvenida</title>
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
              font-family: Arial, sans-serif;
            }
            #panel {
              width: 60%; /* Ancho del panel */
              border: 2px solid #808080; /* Borde del panel */
              padding: 20px; /* Espaciado interno del panel */
              background-color: white;
              text-align: center;
              margin: 0 auto;
            }
            .resetButton {
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
            a.resetButton {
              text-decoration: none;
              color: white;
            }
            .logo {
              width: 200px;
              height: auto;
              margin-bottom: 20px;
            }
            .credentials {
              margin: 20px 0;
            }
          </style>
      </head>
      <body>
          <div id="panel">
              <img src="https://res.cloudinary.com/dzhstkyeu/image/upload/v1712764127/logo_oficial_empresa_uewoz4.png" alt="Logo de la empresa" class="logo">
              <p>Hola ${nombre},</p>
              <p>¡Bienvenido a nuestra empresa! Te damos la bienvenida como nuevo empleado.</p>
              <div class="credentials">
                  <p>Tus credenciales de inicio de sesión son:</p>
                  <p>Correo electrónico: ${email}</p>
                  <p>Contraseña: ${contrasena}</p>
              </div>
              <p>Por favor, asegúrate de mantener seguras tus credenciales de inicio de sesión.</p>
              <a href="${invitacionLink}" class="resetButton">Acceder a tu cuenta</a>
          </div>
      </body>
      </html>
    `,
  };
  return mensajeCorreo;
};