import express from "express";
import cors from "cors";
//Rutas apis
import routerUsuario from "./Routes/UsuarioRouter";
import routerAuth from "./Routes/AuthRouter";
import routerDescuento from "./Routes/DescuentoRouter"
import routerArticulo from "./Routes/ArticuloRoute"
import routerCategoria from "./Routes/CategoriaRoute"
import routerCliente from "./Routes/ClienteRouter"
import routerEmpleado from "./Routes/EmpleadoRouter"
import routerImpuesto from "./Routes/ImpuestoRouter"
import routerDetalleVenta from "./Routes/DetalleVentaRouter"
import routerVenta from "./Routes/VentaRouter";

import swaggerJSDoc from "swagger-jsdoc";
import swaggerui from "swagger-ui-express";
import { options } from "./Utils/SwaggerOptions";
import passport from "passport";
import fileUpload from 'express-fileupload'

const specs = swaggerJSDoc(options);
const session = require("express-session");
const app = express();
require("./Middleware/passport");

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : './tmp'
}))

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(routerUsuario);
app.use(routerDescuento);
app.use(routerArticulo);
app.use(routerCategoria);
app.use(routerAuth);
app.use(routerCliente);
app.use(routerEmpleado);
app.use(routerImpuesto);
app.use(routerDetalleVenta)
app.use(routerVenta)

app.use('/docs',swaggerui.serve,swaggerui.setup(specs));
export default app
