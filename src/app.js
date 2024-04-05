import express from "express";
import cors from "cors";
import morgan from "morgan";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerui from "swagger-ui-express";
import { options } from "./Utils/SwaggerOptions";

import routerUsuario from "./Routes/UsuarioRouter";
import routerAuth from "./Routes/AuthRouter";
import routerDescuento from "./Routes/DescuentoRouter";
import routerArticulo from "./Routes/ArticuloRoute";
import routerCategoria from "./Routes/CategoriaRoute";
import routerCliente from "./Routes/ClienteRouter";
import routerEmpleado from "./Routes/EmpleadoRouter";
import router from "./Routes/ImpuestoRouter";

// Configuración de Swagger
const specs = swaggerJSDoc(options);

// Crear la aplicación Express
const app = express();

// Middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Rutas
app.use(routerUsuario);
app.use(routerDescuento);
app.use(routerArticulo);
app.use(routerCategoria);
app.use(routerAuth);
app.use(routerCliente);
app.use(routerEmpleado);
app.use(router);

// Documentación Swagger
app.use('/docs', swaggerui.serve, swaggerui.setup(specs));

// Exportar la aplicación
export default app;
