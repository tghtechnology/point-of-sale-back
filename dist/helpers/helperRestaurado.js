"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cuerpoRestaurado = void 0;
var cuerpoRestaurado = exports.cuerpoRestaurado = function cuerpoRestaurado(nombreUsuario) {
  return "\n    <html>\n    <head>\n        <style>\n            .header { \n                background-color: #FFEEDF; \n                color: #fff; \n                text-align: center; \n                padding: 20px; \n            }\n            .header h1 {\n                font-size: 2.5em;\n                color: white;\n            }\n            .header p {\n                font-size: 1.2em;\n                color: white;\n            }\n            .content { \n                background-color: #FFEEDF; \n                padding: 30px; \n                text-align: justify; \n                border-radius: 8px; \n                box-shadow: 0 0 15px rgba(0, 0, 0, 0.1); \n                color: #333; \n            }\n            .content h2 {\n                font-size: 1.8em;\n                color: black;\n            }\n            .content p { \n                line-height: 1.6; \n                font-size: 16px; \n                margin-bottom: 20px; \n            }\n            .footer { \n                font-size: 12px; \n                color: #777; \n                text-align: \n                center; padding: 10px; \n                background-color: white;\n            }\n            .footer a {\n                color: #4a86e8;\n            }\n        </style>\n    </head>\n    <body>\n        <div class=\"header\">\n            <p style='text-align: center;'>\n            <img src='https://res.cloudinary.com/dnwzliif9/image/upload/q_auto:best/v1711998930/logo__1_-removebg-preview_2_2_tojv4p.png' alt='Welcome Image' style='max-width: 100%; height: auto; margin-bottom: 20px;' /></p>\n        </div>\n        <div class=\"content\">\n            <h2>Cuenta restaurada con \xE9xito</h2>\n            <p>\xA1Hola ".concat(nombreUsuario, "!<br>\n            Nos complace informarte que tu cuenta ha sido restaurada con \xE9xito. \n            <br>\n            Ahora puedes acceder a todos los servicios y funcionalidades como antes. Si tienes alguna pregunta o necesitas asistencia, no dudes en ponerte en contacto con nuestro equipo de soporte.\n            <br>\n            \xA1Gracias por tu paciencia y bienvenido de nuevo! \uD83C\uDF89</p>\n        </div>\n        <div class=\"footer\">\n            <p>Saludos, <br>The Empresa Team</p>\n            <p>\xA9 2024 Empresa</p>\n        </div>\n    </body>\n    </html>\n    ");
};