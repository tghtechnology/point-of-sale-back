// Construir el cuerpo del correo electrónico
export const cuerpoPermanente = (nombreUsuario) => {
    return `
    <html>
    <head>
        <style>
            .header { 
                background-color: #FFEEDF; 
                color: #fff; 
                text-align: center; 
                padding: 20px; 
            }
            .header h1 {
                font-size: 2.5em;
                color: white;
            }
            .header p {
                font-size: 1.2em;
                color: white;
            }
            .content { 
                background-color: #FFEEDF; 
                padding: 30px; 
                text-align: justify; 
                border-radius: 8px; 
                box-shadow: 0 0 15px rgba(0, 0, 0, 0.1); 
                color: #333; 
            }
            .content h2 {
                font-size: 1.8em;
                color: black;
            }
            .content p { 
                line-height: 1.6; 
                font-size: 16px; 
                margin-bottom: 20px; 
            }
            .footer { 
                font-size: 12px; 
                color: #777; 
                text-align: 
                center; padding: 10px; 
                background-color: white;
            }
            .footer a {
                color: #4a86e8;
            }
        </style>
    </head>
    <body>
        <div class="header">
            <p style='text-align: center;'>
            <img src='https://res.cloudinary.com/dnwzliif9/image/upload/q_auto:best/v1711998930/logo__1_-removebg-preview_2_2_tojv4p.png' alt='Welcome Image' style='max-width: 100%; height: auto; margin-bottom: 20px;' /></p>
        </div>
        <div class="content">
            <h2>Cuenta eliminada permanentemente</h2>
            <p>¡Hola ${nombreUsuario}!<br>
            Lamentamos informarte que tu cuenta ha sido eliminada permanentemente. 
            <br>
            Si tienes alguna pregunta o necesitas asistencia, no dudes en ponerte en contacto con nuestro equipo de soporte.
            <br>
            ¡Gracias por tu tiempo con nosotros y te deseamos lo mejor en tus futuros proyectos! 👋</p>
        </div>
        <div class="footer">
            <p>Saludos, <br>The Empresa Team</p>
            <p>© 2024 Empresa</p>
        </div>
    </body>
    </html>
    `;
};