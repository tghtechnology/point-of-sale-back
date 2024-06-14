"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.restaurarCuenta = exports.listarUsuarios = exports.listaPaises = exports.eliminarTemporalmente = exports.eliminarPermanentemente = exports.eliminarCuentasVencidas = exports.editarUsuarioPorId = exports.crearUsuario = exports.cambiarContraseña = void 0;
var UsuarioServicio = _interopRequireWildcard(require("../Services/UsuarioServicio"));
var _helperPais = require("../helpers/helperPais");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
/**
 * Maneja los errores de la solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 * @param {Error} error - El error capturado.
 */
var handleError = function handleError(res, error) {
  console.error("Error:", error.message);
  if (error.message === "Debe iniciar sesión") {
    return res.status(400).json({
      error: "Inicie sesión"
    });
  } else if (error.message === "Token no proporcionado") {
    return res.status(404).json({
      error: "Ingrese token"
    });
  } else if (error.message === "Usuario no encontrado") {
    return res.status(404).json({
      error: "No se encontró el usuario"
    });
  } else if (error.message === "Contraseña incorrecta") {
    return res.status(404).json({
      error: "No coincide la contraseña"
    });
  } else if (error.message === "Cuenta eliminada") {
    return res.status(401).json({
      error: "Esta cuenta ya fue eliminada temporalmente"
    });
  } else {
    return res.status(500).json({
      error: "Error interno del servidor"
    });
  }
};

/**
 * Obtiene la lista de países.
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 * @returns {Object} - La lista de países.
 * @throws {Error} - Devuelve un error si hay un problema al obtener la lista de países.
 */
var listaPaises = exports.listaPaises = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var _listaPaises;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          try {
            _listaPaises = (0, _helperPais.obtenerListaPaises)();
            res.json(_listaPaises);
          } catch (error) {
            handleError(res, error);
          }
        case 1:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function listaPaises(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

/**
 * Crea un nuevo propietario.
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 * @param {string} req.body.nombre - El nombre del usuario.
 * @param {string} req.body.email - El correo electrónico del usuario.
 * @param {string} req.body.password - La contraseña del usuario.
 * @param {string} req.body.pais - El país del usuario.
 * @param {string} req.body.telefono - El número de teléfono del usuario.
 * @param {string} req.body.nombreNegocio - El nombre del negocio del usuario.
 * @returns {Object} - El nuevo usuario creado.
 * @throws {Error} - Devuelve un error si hay un problema al crear el usuario.
 */
var crearUsuario = exports.crearUsuario = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var _req$body, nombre, email, password, pais, telefono, nombreNegocio, newUsuario;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _req$body = req.body, nombre = _req$body.nombre, email = _req$body.email, password = _req$body.password, pais = _req$body.pais, telefono = _req$body.telefono, nombreNegocio = _req$body.nombreNegocio;
          _context2.next = 4;
          return UsuarioServicio.crearUsuario(nombre, email, password, pais, telefono, nombreNegocio);
        case 4:
          newUsuario = _context2.sent;
          res.json(newUsuario);
          _context2.next = 11;
          break;
        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2["catch"](0);
          handleError(res, _context2.t0);
        case 11:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 8]]);
  }));
  return function crearUsuario(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

/**
 * Edita los datos de un propietario por su ID.
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 * @param {number} req.params.id - El ID del usuario.
 * @param {string} req.body.nombre - El nuevo nombre del usuario.
 * @param {string} req.body.email - El nuevo correo electrónico del usuario.
 * @param {string} req.body.telefono - El nuevo número de teléfono del usuario.
 * @param {string} req.body.pais - El nuevo país del usuario.
 * @returns {Object} - Los datos del usuario actualizados.
 * @throws {Error} - Devuelve un error si hay un problema al editar los datos del usuario.
 */
var editarUsuarioPorId = exports.editarUsuarioPorId = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var id, _req$body2, nombre, email, telefono, pais, usuario;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          id = req.params.id;
          _req$body2 = req.body, nombre = _req$body2.nombre, email = _req$body2.email, telefono = _req$body2.telefono, pais = _req$body2.pais;
          _context3.next = 5;
          return UsuarioServicio.editarUsuarioPorId(id, nombre, email, telefono, pais);
        case 5:
          usuario = _context3.sent;
          res.status(200).json(usuario);
          _context3.next = 12;
          break;
        case 9:
          _context3.prev = 9;
          _context3.t0 = _context3["catch"](0);
          handleError(res, _context3.t0);
        case 12:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 9]]);
  }));
  return function editarUsuarioPorId(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

/**
 * Cambia la contraseña de un propietario.
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 * @param {number} req.params.id - El ID del propietario.
 * @param {string} req.body.contraseñaActual - La contraseña actual del propietario.
 * @param {string} req.body.nuevaContraseña - La nueva contraseña del propietario.
 * @param {string} req.body.verificarContraseña - La confirmación de la nueva contraseña del usuario.
 * @returns {Object} - Un mensaje indicando que la contraseña ha sido cambiada exitosamente.
 * @throws {Error} - Devuelve un error si hay un problema al cambiar la contraseña del usuario.
 */
var cambiarContraseña = exports.cambiarContraseña = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var id, _req$body3, contraseñaActual, nuevaContraseña, verificarContraseña, result;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          id = req.params.id;
          _req$body3 = req.body, contraseñaActual = _req$body3.contraseñaActual, nuevaContraseña = _req$body3.nuevaContraseña, verificarContraseña = _req$body3.verificarContraseña;
          _context4.next = 5;
          return UsuarioServicio.cambiarContraseña(id, contraseñaActual, nuevaContraseña, verificarContraseña);
        case 5:
          result = _context4.sent;
          res.status(200).json(result);
          _context4.next = 12;
          break;
        case 9:
          _context4.prev = 9;
          _context4.t0 = _context4["catch"](0);
          handleError(res, _context4.t0);
        case 12:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 9]]);
  }));
  return function cambiarContraseña(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

/**
 * Obtiene la lista de propietarios.
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 * @returns {Array<Object>}  - La lista de propietarios.
 * @throws {Error} - Devuelve un error si hay un problema al obtener la lista de usuarios.
 */
var listarUsuarios = exports.listarUsuarios = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    var usuarios;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return UsuarioServicio.listarUsuarios();
        case 3:
          usuarios = _context5.sent;
          res.status(200).json(usuarios);
          _context5.next = 10;
          break;
        case 7:
          _context5.prev = 7;
          _context5.t0 = _context5["catch"](0);
          handleError(res, _context5.t0);
        case 10:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 7]]);
  }));
  return function listarUsuarios(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

/**
 * Elimina temporalmente la cuenta de un usuario.
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 * @param {number} req.body.usuario_id - El ID del usuario.
 * @param {string} req.body.password - La contraseña del usuario.
 * @param {string} req.body.token - El token del usuario.
 * @returns {Object} - Un mensaje indicando que la cuenta ha sido eliminada temporalmente.
 * @throws {Error} - Devuelve un error si hay un problema al eliminar temporalmente la cuenta del usuario.
 */
var eliminarTemporalmente = exports.eliminarTemporalmente = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
    var _req$body4, usuario_id, password, token, results;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _req$body4 = req.body, usuario_id = _req$body4.usuario_id, password = _req$body4.password, token = _req$body4.token;
          _context6.next = 4;
          return UsuarioServicio.eliminarTemporalmente(usuario_id, password, token);
        case 4:
          results = _context6.sent;
          res.status(200).json({
            mensaje: "Cuenta eliminada con éxito por un plazo de 1 semana"
          });
          _context6.next = 11;
          break;
        case 8:
          _context6.prev = 8;
          _context6.t0 = _context6["catch"](0);
          handleError(res, _context6.t0);
        case 11:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 8]]);
  }));
  return function eliminarTemporalmente(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

/**
 * Restaura la cuenta de un usuario.
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 * @param {number} req.params.id - El ID del usuario.
 * @returns {Object} - Un mensaje indicando que la cuenta ha sido restaurada.
 * @throws {Error} - Devuelve un error si hay un problema al restaurar la cuenta del usuario.
 */
var restaurarCuenta = exports.restaurarCuenta = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(req, res) {
    var id, results;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          id = req.params.id;
          _context7.next = 4;
          return UsuarioServicio.restaurarCuenta(id);
        case 4:
          results = _context7.sent;
          if (results) {
            res.status(200).json({
              mensaje: "Cuenta restaurada"
            });
          }
          _context7.next = 11;
          break;
        case 8:
          _context7.prev = 8;
          _context7.t0 = _context7["catch"](0);
          handleError(res, _context7.t0);
        case 11:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[0, 8]]);
  }));
  return function restaurarCuenta(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();

/**
 * Elimina las cuentas de usuario que han expirado.
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 * @param {number} req.params.id - El ID del usuario.
 * @returns {Object} - Un mensaje indicando que la cuenta ha sido eliminada o que no está vencida.
 * @throws {Error} - Devuelve un error si hay un problema al eliminar las cuentas vencidas del usuario.
 */
var eliminarCuentasVencidas = exports.eliminarCuentasVencidas = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(req, res) {
    var id, results;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          id = req.params.id;
          _context8.next = 4;
          return UsuarioServicio.eliminarCuentasVencidas(id);
        case 4:
          results = _context8.sent;
          if (results) {
            res.status(200).json({
              mensaje: "La cuenta ha sido eliminada"
            });
          } else if (results == false) {
            res.status(400).json({
              mensaje: "La cuenta no está vencida"
            });
          } else if (!results) {
            res.status(404).json({
              mensaje: "Usuario no encontrado"
            });
          }
          _context8.next = 11;
          break;
        case 8:
          _context8.prev = 8;
          _context8.t0 = _context8["catch"](0);
          handleError(res, _context8.t0);
        case 11:
        case "end":
          return _context8.stop();
      }
    }, _callee8, null, [[0, 8]]);
  }));
  return function eliminarCuentasVencidas(_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}();

/**
 * Elimina permanentemente la cuenta de un usuario.
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 * @param {number} req.body.usuario_id - El ID del usuario.
 * @param {string} req.body.password - La contraseña del usuario.
 * @param {string} req.body.token - El token del usuario.
 * @returns {Object} - Un mensaje indicando que la cuenta ha sido eliminada permanentemente.
 * @throws {Error} - Devuelve un error si hay un problema al eliminar permanentemente la cuenta del usuario.
 */
var eliminarPermanentemente = exports.eliminarPermanentemente = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(req, res) {
    var _req$body5, usuario_id, password, token, results;
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          _req$body5 = req.body, usuario_id = _req$body5.usuario_id, password = _req$body5.password, token = _req$body5.token;
          _context9.next = 4;
          return UsuarioServicio.eliminarPermanentemente(usuario_id, password, token);
        case 4:
          results = _context9.sent;
          if (results) {
            res.status(200).json({
              mensaje: "Cuenta eliminada permanentemente"
            });
          }
          _context9.next = 11;
          break;
        case 8:
          _context9.prev = 8;
          _context9.t0 = _context9["catch"](0);
          handleError(res, _context9.t0);
        case 11:
        case "end":
          return _context9.stop();
      }
    }, _callee9, null, [[0, 8]]);
  }));
  return function eliminarPermanentemente(_x17, _x18) {
    return _ref9.apply(this, arguments);
  };
}();

// Programar la tarea para ejecutarse periódicamente
setInterval(eliminarCuentasVencidas, 24 * 60 * 60 * 1000); // Ejecutar cada 24 horas