"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cuerpoReembolso = void 0;
var cuerpoReembolso = exports.cuerpoReembolso = function cuerpoReembolso(nombreUsuario, detallesReembolso, montoReembolsado, valorDescuentoTotal, valorImpuestoTotal) {
  var detallesHTML = detallesReembolso.map(function (detalle) {
    var subtotalArticulo = (detalle.cantidad * detalle.precioUnitario).toFixed(2);
    var precioUnitario = detalle.precioUnitario ? detalle.precioUnitario.toFixed(2) : 'N/A';
    return "\n            <p>Art\xEDculo: ".concat(detalle.nombreArticulo, ": ").concat(detalle.cantidad, " X S/. ").concat(precioUnitario, " = S/. ").concat(subtotalArticulo, "</p>\n        ");
  }).join('');
  var subtotal = detallesReembolso.reduce(function (total, detalle) {
    var subtotalArticulo = detalle.cantidad * detalle.precioUnitario;
    return total + subtotalArticulo;
  }, 0).toFixed(2);
  valorImpuestoTotal = valorImpuestoTotal.toFixed(2);
  valorDescuentoTotal = valorDescuentoTotal.toFixed(2);
  montoReembolsado = montoReembolsado.toFixed(2);
  return "\n    <html>\n    <head>\n        <style>\n            .header { \n                background-color: #FFEEDF; \n                color: #fff; \n                text-align: center; \n                padding: 20px; \n            }\n            .header h1 {\n                font-size: 2.5em;\n                color: white;\n            }\n            .header p {\n                font-size: 1.2em;\n                color: white;\n            }\n            .content { \n                background-color: #FFEEDF; \n                padding: 30px; \n                text-align: justify; \n                border-radius: 8px; \n                box-shadow: 0 0 15px rgba(0, 0, 0, 0.1); \n                color: #333; \n            }\n            .content h2 {\n                font-size: 1.8em;\n                color: black;\n            }\n            .content p { \n                line-height: 1.6; \n                font-size: 16px; \n                margin-bottom: 20px; \n            }\n            .detalles-venta {\n                background-color: white;\n                padding: 10px;\n                border-radius: 8px;\n                margin: 0 auto;\n                max-width: 600px;\n                text-align: left;\n            }\n            .detalles-venta p {\n                margin: 5px 0;\n            }\n            .footer { \n                font-size: 12px; \n                color: #777; \n                text-align: center; \n                padding: 10px; \n                background-color: white;\n            }\n            .footer a {\n                color: #4a86e8;\n            }\n        </style>\n    </head>\n    <body>\n        <div class=\"header\">\n            <p style='text-align: center;'>\n            <img src='https://res.cloudinary.com/dnwzliif9/image/upload/q_auto:best/v1711998930/logo__1_-removebg-preview_2_2_tojv4p.png' alt='Welcome Image' style='max-width: 100%; height: auto; margin-bottom: 20px;' /></p>\n        </div>\n        <div class=\"content\">\n            <h2>Detalles de reembolso</h2>\n            <p>\xA1Hola ".concat(nombreUsuario, "!<br>\n            Aqu\xED est\xE1n los detalles de su reembolso realizado:</p>\n            <div class=\"detalles-venta\">\n                ").concat(detallesHTML, "\n                <p>Subtotal: S/. ").concat(subtotal, "</p>\n                <p>Valor de impuesto total: + S/.").concat(valorImpuestoTotal, "</p>\n                <p>Valor de descuento total: - S/.").concat(valorDescuentoTotal, "</p>\n                <p>Monto reembolsado: S/.").concat(montoReembolsado, "</p>\n            </div>\n            <p>\xA1Esperamos volver a verte pronto! \uD83D\uDC4F</p>\n        </div>\n        <div class=\"footer\">\n            <p>Saludos, <br>The Empresa Team</p>\n            <p>\xA9 2024 Empresa</p>\n        </div>\n    </body>\n    </html>\n    ");
};