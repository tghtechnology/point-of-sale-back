"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _cors = _interopRequireDefault(require("cors"));
var _UsuarioRouter = _interopRequireDefault(require("./Routes/UsuarioRouter"));
var _AuthRouter = _interopRequireDefault(require("./Routes/AuthRouter"));
var _DescuentoRouter = _interopRequireDefault(require("./Routes/DescuentoRouter"));
var _ArticuloRoute = _interopRequireDefault(require("./Routes/ArticuloRoute"));
var _CategoriaRoute = _interopRequireDefault(require("./Routes/CategoriaRoute"));
var _ClienteRouter = _interopRequireDefault(require("./Routes/ClienteRouter"));
var _EmpleadoRouter = _interopRequireDefault(require("./Routes/EmpleadoRouter"));
var _ImpuestoRouter = _interopRequireDefault(require("./Routes/ImpuestoRouter"));
var _DetalleVentaRouter = _interopRequireDefault(require("./Routes/DetalleVentaRouter"));
var _VentaRouter = _interopRequireDefault(require("./Routes/VentaRouter"));
var _PuntoDeVentaRouter = _interopRequireDefault(require("./Routes/PuntoDeVentaRouter"));
var _DetalleReembolsoRoute = _interopRequireDefault(require("./Routes/DetalleReembolsoRoute"));
var _morgan = _interopRequireDefault(require("morgan"));
var _swaggerJsdoc = _interopRequireDefault(require("swagger-jsdoc"));
var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));
var _SwaggerOptions = require("./Utils/SwaggerOptions");
var _passport = _interopRequireDefault(require("passport"));
var _expressFileupload = _interopRequireDefault(require("express-fileupload"));
var _ReciboRouter = _interopRequireDefault(require("./Routes/ReciboRouter"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
//Rutas apis

var specs = (0, _swaggerJsdoc["default"])(_SwaggerOptions.options);
var session = require("express-session");
var app = (0, _express["default"])();
require("./Middleware/passport");
app.use((0, _cors["default"])());
app.use((0, _morgan["default"])("dev"));
app.use(_express["default"].json());
app.use((0, _expressFileupload["default"])({
  useTempFiles: true
}));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));
app.use(_passport["default"].initialize());
app.use(_passport["default"].session());
app.use(_UsuarioRouter["default"]);
app.use(_DescuentoRouter["default"]);
app.use(_ArticuloRoute["default"]);
app.use(_CategoriaRoute["default"]);
app.use(_AuthRouter["default"]);
app.use(_ClienteRouter["default"]);
app.use(_EmpleadoRouter["default"]);
app.use(_ImpuestoRouter["default"]);
app.use(_DetalleVentaRouter["default"]);
app.use(_VentaRouter["default"]);
app.use(_ReciboRouter["default"]);
app.use(_PuntoDeVentaRouter["default"]);
app.use(_DetalleReembolsoRoute["default"]);
app.use('/docs', _swaggerUiExpress["default"].serve, _swaggerUiExpress["default"].setup(specs));
var _default = exports["default"] = app;