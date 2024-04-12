// Plantilla de correo electrónico para el cambio de contraseña
const getVerificationEmailTemplate = (nombreUsuario, resetPasswordLink) => {
  return `
  <!DOCTYPE html>
  <html lang="es">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Restablecer Contraseña</title>
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
          <p>Hola ${nombreUsuario},</p>
          <p>Para cambiar tu contraseña, haz clic en el siguiente botón:</p>
          <button id="resetButton"><a style="color: white;" href="${resetPasswordLink}">Restablecer Contraseña</a></button>
      </div>
  </body>
  </html>
  `;
};

export default getVerificationEmailTemplate;