"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.restaurarCuenta = exports.listarUsuarios = exports.eliminarTemporalmente = exports.eliminarSesionesActivas = exports.eliminarPermanentemente = exports.eliminarCuentasVencidas = exports.editarUsuarioPorId = exports.crearUsuario = exports.cambiarContraseña = void 0;
var _helperPais = require("../helpers/helperPais");
var _bcrypt = _interopRequireDefault(require("bcrypt"));
var _client = require("@prisma/client");
var _AuthServicio = require("../Services/AuthServicio");
var _helperEmail = require("../helpers/helperEmail");
var _SendEmail = require("../Utils/SendEmail");
var _Time = require("../Utils/Time");
var _PuntoDeVentaServicio = require("./PuntoDeVentaServicio");
var _helperPermanente = require("../helpers/helperPermanente");
var _helperRestaurado = require("../helpers/helperRestaurado");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var prisma = new _client.PrismaClient();

/**
 * Crea un nuevo usuario (propietario) y lo guarda en la base de datos.
 * 
 * @param {string} nombre - El nombre del usuario.
 * @param {string} email - El correo electrónico del usuario.
 * @param {string} password - La contraseña del usuario, que será encriptada.
 * @param {string} pais - El país del usuario. Debe ser válido.
 * @param {string} telefono - El número de teléfono del usuario.
 * @param {string} nombreNegocio - El nombre del negocio del usuario.
 * 
 * @returns {Object} - El objeto representando el usuario creado.
 * @throws {Error} - Si el país no es válido o si ocurre un error durante la creación del usuario.
 */
var crearUsuario = exports.crearUsuario = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(nombre, email, password, pais, telefono, nombreNegocio) {
    var nombrePOS, nombrePropietario, usuariosExistentes, rolAsignado, POS, hashedPassword, todayISO, fecha_creacion, newUsuario;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          nombrePOS = nombreNegocio;
          nombrePropietario = nombre;
          _context.next = 4;
          return prisma.usuario.count();
        case 4:
          usuariosExistentes = _context.sent;
          if (!(usuariosExistentes === 0)) {
            _context.next = 9;
            break;
          }
          rolAsignado = "Admin";
          _context.next = 13;
          break;
        case 9:
          if (!(usuariosExistentes >= 1)) {
            _context.next = 13;
            break;
          }
          rolAsignado = "Propietario";
          _context.next = 13;
          return (0, _PuntoDeVentaServicio.crearPOS)(nombrePOS, nombrePropietario);
        case 13:
          _context.next = 15;
          return prisma.puntoDeVenta.findFirst({
            orderBy: {
              id: 'desc' // Ordenar por ID de forma descendente
            },
            where: {
              nombre: nombreNegocio
            },
            select: {
              id: true
            }
          });
        case 15:
          POS = _context.sent;
          if ((0, _helperPais.validarNombrePais)(pais)) {
            _context.next = 18;
            break;
          }
          throw new Error("País inválido");
        case 18:
          _context.next = 20;
          return _bcrypt["default"].hash(password, 10);
        case 20:
          hashedPassword = _context.sent;
          todayISO = new Date().toISOString();
          fecha_creacion = (0, _Time.getUTCTime)(todayISO);
          _context.next = 25;
          return prisma.usuario.create({
            data: {
              nombre: nombre,
              email: email,
              pais: pais,
              password: hashedPassword,
              nombreNegocio: nombreNegocio,
              rol: rolAsignado,
              telefono: telefono,
              cargo: "Gerente",
              estado: true,
              fecha_creacion: fecha_creacion,
              id_puntoDeVenta: POS ? POS.id : null
            }
          });
        case 25:
          newUsuario = _context.sent;
          return _context.abrupt("return", newUsuario);
        case 27:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function crearUsuario(_x, _x2, _x3, _x4, _x5, _x6) {
    return _ref.apply(this, arguments);
  };
}();
var validarUsuario = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(id, password, token) {
    var sesion, usuario, match;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          if (token) {
            _context2.next = 2;
            break;
          }
          throw new Error("Token no proporcionado");
        case 2:
          _context2.next = 4;
          return prisma.sesion.findFirst({
            where: {
              token: token
            }
          });
        case 4:
          sesion = _context2.sent;
          if (sesion) {
            _context2.next = 7;
            break;
          }
          throw new Error("Debe iniciar sesión");
        case 7:
          _context2.next = 9;
          return prisma.usuario.findUnique({
            where: {
              id: parseInt(id),
              estado: true
            },
            select: {
              password: true
            }
          });
        case 9:
          usuario = _context2.sent;
          if (usuario) {
            _context2.next = 12;
            break;
          }
          throw new Error("Usuario no encontrado");
        case 12:
          _context2.next = 14;
          return _bcrypt["default"].compare(password, usuario.password);
        case 14:
          match = _context2.sent;
          if (match) {
            _context2.next = 17;
            break;
          }
          throw new Error("Contraseña incorrecta");
        case 17:
          return _context2.abrupt("return", usuario);
        case 18:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function validarUsuario(_x7, _x8, _x9) {
    return _ref2.apply(this, arguments);
  };
}();

/**
 * Elimina todas las sesiones activas para un usuario específico.
 * 
 * @param {number|string} usuario_id - El ID del usuario para el cual se eliminarán las sesiones activas.
 * 
 * @returns {void}
 * @throws {Error} - Si ocurre un error durante la eliminación de las sesiones.
 */

var eliminarSesionesActivas = exports.eliminarSesionesActivas = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(usuario_id) {
    var activeSessions;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return prisma.sesion.findMany({
            where: {
              usuario_id: usuario_id,
              expiracion: {
                gt: new Date()
              }
            }
          });
        case 2:
          activeSessions = _context3.sent;
          if (!(activeSessions.length > 0)) {
            _context3.next = 6;
            break;
          }
          _context3.next = 6;
          return (0, _AuthServicio.logout)(activeSessions[0].token);
        case 6:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function eliminarSesionesActivas(_x10) {
    return _ref3.apply(this, arguments);
  };
}();

/**
 * Elimina temporalmente un usuario por ID, desactivando su cuenta.
 * 
 * @param {number|string} usuario_id - El ID del usuario a eliminar temporalmente.
 * @param {string} password - La contraseña del usuario para verificación.
 * @param {string} token - El token de sesión para autenticación.
 * 
 * @returns {Object} - El objeto representando el usuario actualizado después de la eliminación temporal.
 * @throws {Error} - Si la cuenta ya está eliminada, si las credenciales no son válidas, o si ocurre un error durante el proceso.
 */

var eliminarTemporalmente = exports.eliminarTemporalmente = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(usuario_id, password, token) {
    var usuarioverificado, usuario, usuarioInfo, cuerpo, todayISO, eliminado_temporal_fecha, results;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return prisma.usuario.findUnique({
            where: {
              id: parseInt(usuario_id),
              estado: false
            }
          });
        case 2:
          usuarioverificado = _context4.sent;
          if (!usuarioverificado) {
            _context4.next = 5;
            break;
          }
          throw new Error("Cuenta eliminada");
        case 5:
          _context4.next = 7;
          return validarUsuario(usuario_id, password, token);
        case 7:
          usuario = _context4.sent;
          _context4.next = 10;
          return prisma.usuario.findUnique({
            where: {
              id: parseInt(usuario_id)
            },
            select: {
              email: true,
              nombre: true
            }
          });
        case 10:
          usuarioInfo = _context4.sent;
          cuerpo = (0, _helperEmail.cuerpoCorreo)(usuarioInfo.nombre);
          _context4.next = 14;
          return (0, _SendEmail.envioCorreo)(usuarioInfo.email, "Cuenta eliminada temporalmente", cuerpo);
        case 14:
          _context4.next = 16;
          return eliminarSesionesActivas(usuario_id);
        case 16:
          todayISO = new Date().toISOString();
          eliminado_temporal_fecha = (0, _Time.getUTCTime)(todayISO);
          _context4.next = 20;
          return prisma.usuario.update({
            where: {
              id: parseInt(usuario_id)
            },
            data: {
              estado: false,
              eliminado_temporal_fecha: eliminado_temporal_fecha
            }
          });
        case 20:
          results = _context4.sent;
          return _context4.abrupt("return", results);
        case 22:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return function eliminarTemporalmente(_x11, _x12, _x13) {
    return _ref4.apply(this, arguments);
  };
}();

/**
 * Elimina permanentemente un usuario por su ID, removiéndolo de la base de datos.
 * 
 * @param {number|string} usuario_id - El ID del usuario a eliminar permanentemente.
 * @param {string} password - La contraseña del usuario para verificación.
 * @param {string} token - El token de sesión para autenticación.
 * 
 * @returns {Object} - El objeto representando el usuario eliminado.
 * @throws {Error} - Si las credenciales no son válidas, si ocurre un error durante la eliminación, o si no se encuentra el usuario.
 */

var eliminarPermanentemente = exports.eliminarPermanentemente = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(usuario_id, password, token) {
    var usuario, usuarioInfo, cuerpo, results;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return validarUsuario(usuario_id, password, token);
        case 2:
          usuario = _context5.sent;
          _context5.next = 5;
          return eliminarSesionesActivas(usuario_id);
        case 5:
          _context5.next = 7;
          return prisma.usuario.findUnique({
            where: {
              id: parseInt(usuario_id)
            },
            select: {
              email: true,
              nombre: true
            }
          });
        case 7:
          usuarioInfo = _context5.sent;
          cuerpo = (0, _helperPermanente.cuerpoPermanente)(usuarioInfo.nombre);
          _context5.next = 11;
          return (0, _SendEmail.envioCorreo)(usuarioInfo.email, "Cuenta eliminada permanente", cuerpo);
        case 11:
          _context5.next = 13;
          return prisma.usuario.update({
            where: {
              id: parseInt(usuario_id)
            },
            data: {
              estado: false
            }
          });
        case 13:
          results = _context5.sent;
          return _context5.abrupt("return", results);
        case 15:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return function eliminarPermanentemente(_x14, _x15, _x16) {
    return _ref5.apply(this, arguments);
  };
}();

/**
 * Elimina las cuentas que fueron desactivadas hace más de una semana.
 * 
 * @param {number|string} id - El ID de la cuenta a verificar para eliminación.
 * 
 * @returns {boolean} - Verdadero si al menos una cuenta fue eliminada, falso si no se eliminó ninguna.
 * @throws {Error} - Si ocurre un error durante la eliminación de las cuentas vencidas.
 */

var eliminarCuentasVencidas = exports.eliminarCuentasVencidas = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(id) {
    var fechaUnaSemanaAtras, results;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          fechaUnaSemanaAtras = new Date();
          fechaUnaSemanaAtras.setDate(fechaUnaSemanaAtras.getDate() - 7);
          _context6.next = 4;
          return prisma.usuario.deleteMany({
            where: {
              id: parseInt(id),
              estado: false,
              eliminado_temporal_fecha: {
                lte: fechaUnaSemanaAtras
              }
            }
          });
        case 4:
          results = _context6.sent;
          return _context6.abrupt("return", results.count > 0);
        case 6:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  }));
  return function eliminarCuentasVencidas(_x17) {
    return _ref6.apply(this, arguments);
  };
}();

/**
 * Restaura una cuenta eliminada temporalmente si se encuentra dentro del período de gracia de una semana y si la fecha de eliminación temporal no es nula.
 * 
 * @param {number|string} id - El ID del usuario a restaurar.
 * 
 * @returns {boolean} - Verdadero si la cuenta fue restaurada, falso si el período de gracia ya pasó, la cuenta no tiene fecha de eliminación temporal o la cuenta no puede ser restaurada.
 * @throws {Error} - Si ocurre un error durante la restauración de la cuenta.
 */

var restaurarCuenta = exports.restaurarCuenta = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(id) {
    var usuario, unaSemanaEnMiliseg, fechaEliminacion, usuarioInfo, cuerpo;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return prisma.usuario.findUnique({
            where: {
              id: parseInt(id)
            },
            select: {
              eliminado_temporal_fecha: true
            }
          });
        case 2:
          usuario = _context7.sent;
          if (!(usuario.eliminado_temporal_fecha !== null)) {
            _context7.next = 19;
            break;
          }
          unaSemanaEnMiliseg = 7 * 24 * 60 * 60 * 1000;
          fechaEliminacion = new Date(usuario.eliminado_temporal_fecha);
          if (!(Date.now() - fechaEliminacion <= unaSemanaEnMiliseg)) {
            _context7.next = 18;
            break;
          }
          _context7.next = 9;
          return prisma.usuario.update({
            where: {
              id: parseInt(id)
            },
            data: {
              estado: true,
              eliminado_temporal_fecha: null
            }
          });
        case 9:
          _context7.next = 11;
          return prisma.usuario.findUnique({
            where: {
              id: parseInt(id)
            },
            select: {
              email: true,
              nombre: true
            }
          });
        case 11:
          usuarioInfo = _context7.sent;
          cuerpo = (0, _helperRestaurado.cuerpoRestaurado)(usuarioInfo.nombre);
          _context7.next = 15;
          return (0, _SendEmail.envioCorreo)(usuarioInfo.email, "Cuenta restaurada", cuerpo);
        case 15:
          return _context7.abrupt("return", true);
        case 18:
          return _context7.abrupt("return", false);
        case 19:
        case "end":
          return _context7.stop();
      }
    }, _callee7);
  }));
  return function restaurarCuenta(_x18) {
    return _ref7.apply(this, arguments);
  };
}();

/**
 * Busca un usuario por su ID en la base de datos.
 *
 * @param {string} id - El ID del usuario a buscar.
 * @returns {Promise<Object>} - Los datos del usuario encontrado.
 *
 * @throws {Error} - Si no se encuentra ningún usuario con el ID proporcionado.
 *
 * @description Esta función busca un usuario en la base de datos utilizando su ID y devuelve sus datos.
 **/
var buscarUsuarioPorId = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(id) {
    var usuario;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.next = 2;
          return prisma.usuario.findUnique({
            where: {
              id: parseInt(id)
            }
          });
        case 2:
          usuario = _context8.sent;
          if (usuario) {
            _context8.next = 5;
            break;
          }
          throw new Error("No se encontr\xF3 ning\xFAn usuario con el ID ".concat(id));
        case 5:
          return _context8.abrupt("return", usuario);
        case 6:
        case "end":
          return _context8.stop();
      }
    }, _callee8);
  }));
  return function buscarUsuarioPorId(_x19) {
    return _ref8.apply(this, arguments);
  };
}();

/**
 * Valida la contraseña de un usuario.
 *
 * @param {Object} usuario - Los datos del usuario.
 * @param {string} contraseña - La contraseña a validar.
 *
 * @throws {Error} - Si la contraseña proporcionada no coincide con la contraseña del usuario.
 *
 * @description Esta función valida la contraseña proporcionada comparándola con la contraseña almacenada del usuario.
 **/
var validarContraseña = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(usuario, contraseña) {
    var match;
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          _context9.next = 2;
          return _bcrypt["default"].compare(contraseña, usuario.password);
        case 2:
          match = _context9.sent;
          if (match) {
            _context9.next = 5;
            break;
          }
          throw new Error("Contraseña incorrecta");
        case 5:
        case "end":
          return _context9.stop();
      }
    }, _callee9);
  }));
  return function validarContraseña(_x20, _x21) {
    return _ref9.apply(this, arguments);
  };
}();

/**
 * Edita los datos de un usuario en la base de datos.
 *
 * @param {string} id - El ID del usuario a editar.
 * @param {string} nombre - El nuevo nombre del usuario.
 * @param {string} email - El nuevo correo electrónico del usuario.
 * @param {string} telefono - El nuevo número de teléfono del usuario.
 * @param {string} pais - El nuevo país del usuario.
 * @returns {Promise<Object>} - Los datos del usuario actualizado.
 *
 * @throws {Error} - Si el país proporcionado es inválido.
 * @throws {Error} - Si no se encuentra ningún usuario con el ID proporcionado.
 *
 * @description Esta función edita los datos de un usuario en la base de datos utilizando su ID y los nuevos datos proporcionados.
 **/
var editarUsuarioPorId = exports.editarUsuarioPorId = /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(id, nombre, email, telefono, pais) {
    var usuarioExistente, updatedUsuario, nombrePropietario;
    return _regeneratorRuntime().wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          if ((0, _helperPais.validarNombrePais)(pais)) {
            _context10.next = 2;
            break;
          }
          throw new Error("País inválido");
        case 2:
          _context10.next = 4;
          return buscarUsuarioPorId(id);
        case 4:
          usuarioExistente = _context10.sent;
          _context10.next = 7;
          return prisma.usuario.update({
            where: {
              id: usuarioExistente.id
            },
            data: {
              nombre: nombre,
              email: email,
              telefono: telefono,
              pais: pais,
              fecha_modificacion: (0, _Time.getUTCTime)(new Date().toISOString())
            }
          });
        case 7:
          updatedUsuario = _context10.sent;
          if (!(usuarioExistente.rol == "Propietario")) {
            _context10.next = 12;
            break;
          }
          _context10.next = 11;
          return prisma.puntoDeVenta.update({
            where: {
              id: usuarioExistente.id_puntoDeVenta
            },
            data: {
              propietario: updatedUsuario.nombre
            }
          });
        case 11:
          nombrePropietario = _context10.sent;
        case 12:
          return _context10.abrupt("return", updatedUsuario);
        case 13:
        case "end":
          return _context10.stop();
      }
    }, _callee10);
  }));
  return function editarUsuarioPorId(_x22, _x23, _x24, _x25, _x26) {
    return _ref10.apply(this, arguments);
  };
}();

/**
 * Lista todos los usuarios activos en la base de datos.
 *
 * @returns {Promise<Array>} - Un arreglo que contiene los datos de todos los usuarios activos.
 *
 * @description Esta función busca y devuelve todos los usuarios activos en la base de datos.
 **/
var listarUsuarios = exports.listarUsuarios = /*#__PURE__*/function () {
  var _ref11 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11() {
    return _regeneratorRuntime().wrap(function _callee11$(_context11) {
      while (1) switch (_context11.prev = _context11.next) {
        case 0:
          _context11.next = 2;
          return prisma.usuario.findMany({
            where: {
              estado: true,
              rol: "Propietario"
            }
          });
        case 2:
          return _context11.abrupt("return", _context11.sent);
        case 3:
        case "end":
          return _context11.stop();
      }
    }, _callee11);
  }));
  return function listarUsuarios() {
    return _ref11.apply(this, arguments);
  };
}();

/**
 * Cambia la contraseña de un usuario.
 *
 * @param {string} id - El ID del usuario cuya contraseña se va a cambiar.
 * @param {string} contraseñaActual - La contraseña actual del usuario.
 * @param {string} nuevaContraseña - La nueva contraseña del usuario.
 * @param {string} verificarContraseña - La confirmación de la nueva contraseña.
 * @returns {Promise<Object>} - Un objeto que indica que la contraseña ha sido actualizada correctamente.
 *
 * @throws {Error} - Si la contraseña actual no es válida.
 * @throws {Error} - Si la nueva contraseña y la verificación no coinciden.
 *
 * @description Esta función cambia la contraseña de un usuario utilizando su ID y las nuevas contraseñas proporcionadas.
 **/
var cambiarContraseña = exports.cambiarContraseña = /*#__PURE__*/function () {
  var _ref12 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee12(id, contraseñaActual, nuevaContraseña, verificarContraseña) {
    var usuario, hashedNuevaContraseña;
    return _regeneratorRuntime().wrap(function _callee12$(_context12) {
      while (1) switch (_context12.prev = _context12.next) {
        case 0:
          _context12.next = 2;
          return buscarUsuarioPorId(id);
        case 2:
          usuario = _context12.sent;
          _context12.next = 5;
          return validarContraseña(usuario, contraseñaActual);
        case 5:
          if (!(nuevaContraseña !== verificarContraseña)) {
            _context12.next = 7;
            break;
          }
          throw new Error("La nueva contraseña y la verificación no coinciden");
        case 7:
          _context12.next = 9;
          return _bcrypt["default"].hash(nuevaContraseña, 10);
        case 9:
          hashedNuevaContraseña = _context12.sent;
          _context12.next = 12;
          return prisma.usuario.update({
            where: {
              id: usuario.id
            },
            data: {
              password: hashedNuevaContraseña
            }
          });
        case 12:
          return _context12.abrupt("return", {
            message: "Contraseña actualizada correctamente"
          });
        case 13:
        case "end":
          return _context12.stop();
      }
    }, _callee12);
  }));
  return function cambiarContraseña(_x27, _x28, _x29, _x30) {
    return _ref12.apply(this, arguments);
  };
}();