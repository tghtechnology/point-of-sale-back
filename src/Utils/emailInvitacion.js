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