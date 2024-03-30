"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logout = exports.login = exports.enviarCorreoCambioPass = exports.eliminarTokensExpirados = exports.cambiarPassword = void 0;
var _database = require("../database");
var _bcrypt = _interopRequireDefault(require("bcrypt"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _nodemailer = _interopRequireDefault(require("nodemailer"));
var _helperPlantilla = _interopRequireDefault(require("../helpers/helperPlantilla"));
var _client = require("@prisma/client");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var prisma = new _client.PrismaClient();

//Lógica para iniciar sesión
var login = exports.login = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(email, password) {
    var connection, results, usuario, match, existingSessions, token, expiracion, result;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return (0, _database.connect)();
        case 2:
          connection = _context.sent;
          _context.next = 5;
          return prisma.usuario.findMany({
            where: {
              email: email
            }
          });
        case 5:
          results = _context.sent;
          if (!(results.length === 0)) {
            _context.next = 8;
            break;
          }
          throw new Error("Nombre de usuario o contraseña incorrectos");
        case 8:
          usuario = results[0];
          _context.next = 11;
          return _bcrypt["default"].compare(password, usuario.password);
        case 11:
          match = _context.sent;
          if (match) {
            _context.next = 14;
            break;
          }
          throw new Error("Nombre de usuario o contraseña incorrectos");
        case 14:
          _context.next = 16;
          return prisma.sesion.findMany({
            where: {
              usuario_id: usuario.id
            }
          });
        case 16:
          existingSessions = _context.sent;
          if (!(existingSessions.length > 0)) {
            _context.next = 19;
            break;
          }
          throw new Error("Sesión activa encontrada");
        case 19:
          token = _jsonwebtoken["default"].sign({
            id: usuario.id,
            email: usuario.email
          }, "secreto_del_token", {
            expiresIn: "24h"
          });
          expiracion = new Date();
          expiracion.setHours(expiracion.getHours() + 24);
          _context.next = 24;
          return prisma.sesion.create({
            data: {
              usuario_id: usuario.id,
              token: token,
              expiracion: expiracion
            }
          });
        case 24:
          result = _context.sent;
          return _context.abrupt("return", {
            usuario_id: result.usuario_id,
            token: result.token
          });
        case 26:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function login(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var logout = exports.logout = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(token) {
    var decodedToken, usedToken, session;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          // Decodificar token
          decodedToken = _jsonwebtoken["default"].verify(token, "secreto_del_token"); // Comprobar si el token ya ha sido utilizado para cerrar sesión
          _context2.next = 3;
          return prisma.sesion.findFirst({
            where: {
              usuario_id: decodedToken.id,
              token: token
            }
          });
        case 3:
          usedToken = _context2.sent;
          if (!usedToken) {
            _context2.next = 6;
            break;
          }
          throw new Error('Este token ya ha sido utilizado para cerrar sesión.');
        case 6:
          _context2.next = 8;
          return prisma.sesion.deleteMany({
            where: {
              usuario_id: decodedToken.id,
              token: token,
              expiracion: {
                gt: new Date()
              }
            }
          });
        case 8:
          session = _context2.sent;
          if (!(session.count === 0)) {
            _context2.next = 11;
            break;
          }
          throw new Error('No se encontró la sesión para cerrar.');
        case 11:
          _context2.next = 13;
          return prisma.sesion.update({
            where: {
              id: session.sesiones[0].id
            },
            data: {
              usado: true
            }
          });
        case 13:
          return _context2.abrupt("return", {
            message: 'Sesión cerrada correctamente.'
          });
        case 14:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function logout(_x3) {
    return _ref2.apply(this, arguments);
  };
}();

// Función para enviar un correo electrónico al usuario con un enlace para cambiar la contraseña
var enviarCorreoCambioPass = exports.enviarCorreoCambioPass = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(email) {
    var usuario, token, expiracion, resetPasswordLink, transporter;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return prisma.usuario.findUnique({
            where: {
              email: email
            },
            select: {
              id: true,
              nombre: true
            }
          });
        case 2:
          usuario = _context3.sent;
          if (usuario) {
            _context3.next = 5;
            break;
          }
          throw new Error("Correo no encontrado");
        case 5:
          // Generar un token para el cambio de contraseña
          token = _jsonwebtoken["default"].sign({
            usuarioId: usuario.id,
            email: email
          }, "secreto_del_token_para_cambio_password", {
            expiresIn: "1h"
          }); //Creacion de registro en resetTokens
          expiracion = new Date();
          expiracion.setHours(expiracion.getHours() + 1);
          _context3.next = 10;
          return prisma.resetToken.create({
            data: {
              token: token,
              expiracion: expiracion,
              usuario_id: usuario.id
            }
          });
        case 10:
          // Generar el enlace para cambiar la contraseña
          resetPasswordLink = "http://".concat(process.env.URL, "/cambiar?token=").concat(token); // Configurar el transporte de correo electrónico
          transporter = _nodemailer["default"].createTransport({
            service: process.env.EMAIL_SERVICE,
            auth: {
              user: process.env.EMAIL_USER,
              pass: process.env.EMAIL_PASSWORD
            }
          }); // Enviar el correo electrónico con el enlace para cambiar la contraseña
          _context3.next = 14;
          return transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Cambio de Contraseña",
            html: (0, _helperPlantilla["default"])(usuario.nombre, resetPasswordLink)
          });
        case 14:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function enviarCorreoCambioPass(_x4) {
    return _ref3.apply(this, arguments);
  };
}();

// Cambiar la contraseña del usuario a través de un enlace con token
var cambiarPassword = exports.cambiarPassword = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(token, password) {
    var decodedToken, resetToken, usuario, hashedNewPassword, activeSessions;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          if (token) {
            _context4.next = 2;
            break;
          }
          throw new Error("Falta el token");
        case 2:
          // Descodificar el token
          decodedToken = _jsonwebtoken["default"].verify(token, "secreto_del_token_para_cambio_password"); //Verificacion de token
          _context4.next = 5;
          return prisma.resetToken.findFirst({
            where: {
              token: token,
              expiracion: {
                gt: new Date()
              }
            }
          });
        case 5:
          resetToken = _context4.sent;
          if (resetToken) {
            _context4.next = 8;
            break;
          }
          throw new Error("El token no es válido o ha expirado");
        case 8:
          _context4.next = 10;
          return prisma.usuario.findUnique({
            where: {
              id: resetToken.usuario_id
            }
          });
        case 10:
          usuario = _context4.sent;
          if (usuario) {
            _context4.next = 13;
            break;
          }
          throw new Error("Usuario no encontrado");
        case 13:
          _context4.next = 15;
          return _bcrypt["default"].hash(password, 10);
        case 15:
          hashedNewPassword = _context4.sent;
          _context4.next = 18;
          return prisma.usuario.update({
            where: {
              id: resetToken.usuario_id
            },
            data: {
              password: hashedNewPassword
            }
          });
        case 18:
          _context4.next = 20;
          return prisma.resetToken.deleteMany({
            where: {
              usuario_id: resetToken.usuario_id
            }
          });
        case 20:
          _context4.next = 22;
          return prisma.sesion.findMany({
            where: {
              usuario_id: usuario.id,
              expiracion: {
                gt: new Date()
              }
            }
          });
        case 22:
          activeSessions = _context4.sent;
          if (!(activeSessions.length > 0)) {
            _context4.next = 26;
            break;
          }
          _context4.next = 26;
          return logout(activeSessions[0].token);
        case 26:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return function cambiarPassword(_x5, _x6) {
    return _ref4.apply(this, arguments);
  };
}();

// Función para eliminar tokens de sesión expirados y tokens de cambio de contraseña expirados de la base de datos
var eliminarTokensExpirados = exports.eliminarTokensExpirados = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
    var db, eliminarTokenSesion, eliminarTokenPassword;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return (0, _database.connect)();
        case 2:
          db = _context5.sent;
          _context5.next = 5;
          return prisma.resetToken.deleteMany({
            where: {
              expiracion: {
                lt: new Date()
              }
            }
          });
        case 5:
          eliminarTokenSesion = _context5.sent;
          _context5.next = 8;
          return prisma.sesion.deleteMany({
            where: {
              expiracion: {
                lt: new Date()
              }
            }
          });
        case 8:
          eliminarTokenPassword = _context5.sent;
          if (eliminarTokenSesion.affectedRows > 0 || eliminarTokenPassword.affectedRows > 0) {
            console.log("Tokens expirados eliminados correctamente.");
          }
        case 10:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return function eliminarTokensExpirados() {
    return _ref5.apply(this, arguments);
  };
}();