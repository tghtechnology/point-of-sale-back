"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _cors = _interopRequireDefault(require("cors"));
var _morgan = _interopRequireDefault(require("morgan"));
var _swaggerJsdoc = _interopRequireDefault(require("swagger-jsdoc"));
var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));
var _SwaggerOptions = require("./Utils/SwaggerOptions");
var _UsuarioRouter = _interopRequireDefault(require("./Routes/UsuarioRouter"));
var _EmpleadoRouter = _interopRequireDefault(require("./Routes/EmpleadoRouter"));
var _AuthRouter = _interopRequireDefault(require("./Routes/AuthRouter"));
var _DescuentoRouter = _interopRequireDefault(require("./Routes/DescuentoRouter"));
var _ArticuloRoute = _interopRequireDefault(require("./Routes/ArticuloRoute"));
var _CategoriaRoute = _interopRequireDefault(require("./Routes/CategoriaRoute"));
var _InvitacionRouter = _interopRequireDefault(require("./Routes/InvitacionRouter"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var specs = (0, _swaggerJsdoc["default"])(_SwaggerOptions.options);
var app = (0, _express["default"])();
app.use((0, _cors["default"])());
app.use((0, _morgan["default"])("dev"));
app.use(_express["default"].json());
app.use(_UsuarioRouter["default"]);
app.use(_EmpleadoRouter["default"]);
app.use(_DescuentoRouter["default"]);
app.use(_ArticuloRoute["default"]);
app.use(_CategoriaRoute["default"]);
app.use(_AuthRouter["default"]);
app.use(_InvitacionRouter["default"]);
app.use("/docs", _swaggerUiExpress["default"].serve, _swaggerUiExpress["default"].setup(specs));
var _default = exports["default"] = app;