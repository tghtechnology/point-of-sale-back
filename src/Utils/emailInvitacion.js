/**
 * Envía un correo electrónico de bienvenida a un nuevo empleado.
 *
 * @param {string} destinatario - Dirección de correo electrónico del destinatario.
 * @param {string} nombre - Nombre del nuevo empleado.
 * @param {string} email - Correo electrónico del nuevo empleado.
 * @param {string} contrasena - Contraseña generada para el nuevo empleado.
 * @param {string} urlEmpleado - URL de la página de inicio de sesión del empleado.
 * @returns {Object} - Objeto de mensaje de correo electrónico configurado.
 *
 * @description Esta función envía un correo electrónico de bienvenida a un nuevo empleado de la empresa.
 * El correo electrónico contiene un mensaje de bienvenida personalizado, las credenciales de inicio de sesión del empleado (correo electrónico y contraseña)
 * y un enlace para acceder a su cuenta.
 * Se utiliza una plantilla HTML para el cuerpo del correo electrónico, que incluye el nombre del empleado, sus credenciales y el enlace de acceso.
 * El remitente del correo electrónico es configurado con la dirección de correo electrónico del servidor.
 * Devuelve un objeto de mensaje de correo electrónico configurado listo para ser enviado.
 **/
export const enviarCorreoBienvenida = async (destinatario, nombre, email, contrasena, urlEmpleado) => {
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