export const enviarCorreoBienvenida = async (
  destinatario,
  nombre,
  correo,
  contrasena
) => {
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

  return mensajeCorreo;
};