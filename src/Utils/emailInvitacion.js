export const enviarCorreoBienvenida = async (
  destinatario,
  nombre,
  email,
  contrasena,
) => {
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
              <p>Hola ${nombre},</p>
              <p>¡Bienvenido a nuestra empresa! Te damos la bienvenida como nuevo empleado.</p>
              <p>Tus credenciales de inicio de sesión son:</p>
              <p>Correo electrónico: ${email}</p>
              <p>Contraseña: ${contrasena}</p>
              <p>Por favor, asegúrate de mantener seguras tus credenciales de inicio de sesión.</p>
              <p>¡Gracias!</p>
              <button id="resetButton">Acceder a tu cuenta</button>
          </div>
      </body>
      </html>
    `,
  };

  return mensajeCorreo;
};
