export const cuerpoReembolso = (nombreUsuario, detallesReembolso, montoReembolsado, valorDescuentoTotal, valorImpuestoTotal) => {
    const detallesHTML = detallesReembolso.map(detalle => {
        const subtotalArticulo = (detalle.cantidad * detalle.precioUnitario).toFixed(2);
        const precioUnitario = detalle.precioUnitario ? detalle.precioUnitario.toFixed(2) : 'N/A';
        return `
            <p>Artículo: ${detalle.nombreArticulo}: ${detalle.cantidad} X S/. ${precioUnitario} = S/. ${subtotalArticulo}</p>
        `;
    }).join('');
    const subtotal= detallesReembolso.reduce((total, detalle) => {
        const subtotalArticulo = detalle.cantidad * detalle.precioUnitario;
        return total + subtotalArticulo;
    }, 0).toFixed(2);
    valorImpuestoTotal = valorImpuestoTotal.toFixed(2);
    valorDescuentoTotal = valorDescuentoTotal.toFixed(2);
    montoReembolsado = montoReembolsado.toFixed(2);
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
            <h2>Detalles de reembolso</h2>
            <p>¡Hola ${nombreUsuario}!<br>
            Aquí están los detalles de su reembolso realizado:</p>
            <div class="detalles-venta">
                ${detallesHTML}
                <p>Subtotal: S/. ${subtotal}</p>
                <p>Valor de impuesto total: + S/.${valorImpuestoTotal}</p>
                <p>Valor de descuento total: - S/.${valorDescuentoTotal}</p>
                <p>Monto reembolsado: S/.${montoReembolsado}</p>
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
