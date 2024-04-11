export const cuerpoVenta = (nombreUsuario, detallesVenta, subtotal, total) => {
    const detallesHTML = detallesVenta.map(detalle => {
        const subtotalItem = (detalle.cantidad * detalle.precioUnitario).toFixed(2);
        return `
            <p>${detalle.producto}: ${detalle.cantidad} x S/.${detalle.precioUnitario.toFixed(2)} = S/.${subtotalItem}</p>
        `;
    }).join('');

    // Convertir subtotal y total a dos decimales
    subtotal = subtotal.toFixed(2);
    total = total.toFixed(2);
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
            .detalles-venta {
                background-color: white;
                padding: 10px;
                border-radius: 8px;
                margin: 0 auto;
                max-width: 600px;
                text-align: left;
            }
            .detalles-venta p {
                margin: 5px 0;
            }
            .footer { 
                font-size: 12px; 
                color: #777; 
                text-align: center; 
                padding: 10px; 
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
            <h2>Detalles de la venta</h2>
            <p>¡Hola ${nombreUsuario}!<br>
            Aquí están los detalles de tu última compra:</p>
            <div class="detalles-venta">
                ${detallesHTML}
                <p>Subtotal: S/.${subtotal}</p>
                <p>Total: S/.${total}</p>
            </div>
            <p>¡Esperamos volver a verte pronto! 👏</p>
        </div>
        <div class="footer">
            <p>Saludos, <br>The Empresa Team</p>
            <p>© 2024 Empresa</p>
        </div>
    </body>
    </html>
    `;
};
