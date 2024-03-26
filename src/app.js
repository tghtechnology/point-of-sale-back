import express from "express";
import cors from "cors";
import routerUsuario from "./Routes/UsuarioRouter";
import routerAuth from "./Routes/AuthRouter";
import routerDescuento from "./Routes/DescuentoRouter";
import routerArticulo from "./Routes/ArticuloRoute";
import routerCategoria from "./Routes/CategoriaRoute";
import morgan from "morgan";

import swaggerJSDoc from "swagger-jsdoc";
import swaggerui from "swagger-ui-express";
import { options } from "./Utils/SwaggerOptions";

const specs = swaggerJSDoc(options);
const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use(routerUsuario);
app.use(routerDescuento);
app.use(routerArticulo);
app.use(routerCategoria);
app.use(routerAuth);

app.use("/docs", swaggerui.serve, swaggerui.setup(specs));
export default app;
