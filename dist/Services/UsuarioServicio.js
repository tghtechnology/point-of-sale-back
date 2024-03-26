"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verificarContrasena = exports.restaurarCuenta = exports.eliminarTemporalmente = exports.eliminarPermanentemente = exports.eliminarCuentasVencidas = exports.crearUsuario = void 0;
var _database = require("../database");
var _helperPais = require("../helpers/helperPais");
var _bcrypt = _interopRequireDefault(require("bcrypt"));
var _client = require("@prisma/client");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
//Inicialización de prisma
var prisma = new _client.PrismaClient();
var crearUsuario = exports.crearUsuario = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(nombre, email, password, pais) {
    var hashedPassword, connection, newUsuario;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          if ((0, _helperPais.validarNombrePais)(pais)) {
            _context.next = 2;
            break;
          }
          throw new Error("País inválido");
        case 2:
          _context.next = 4;
          return _bcrypt["default"].hash(password, 10);
        case 4:
          hashedPassword = _context.sent;
          _context.next = 7;
          return (0, _database.connect)();
        case 7:
          connection = _context.sent;
          _context.next = 10;
          return prisma.usuario.create({
            data: {
              nombre: nombre,
              email: email,
              pais: pais,
              password: hashedPassword,
              estado: true
            }
          });
        case 10:
          newUsuario = _context.sent;
          return _context.abrupt("return", newUsuario);
        case 12:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function crearUsuario(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();

//Función para verificar contraseña antes de eliminar
var verificarContrasena = exports.verificarContrasena = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(id, password) {
    var connection, passwordFromRequest, contrasena, hashedPasswordFromDatabase, match;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return (0, _database.connect)();
        case 2:
          connection = _context2.sent;
          passwordFromRequest = password;
          _context2.next = 6;
          return prisma.usuario.findUnique({
            where: {
              id: parseInt(id),
              estado: true
            },
            select: {
              password: true
            }
          });
        case 6:
          contrasena = _context2.sent;
          if (!(contrasena == null)) {
            _context2.next = 9;
            break;
          }
          return _context2.abrupt("return", null);
        case 9:
          hashedPasswordFromDatabase = contrasena.password;
          _context2.next = 12;
          return _bcrypt["default"].compare(passwordFromRequest, hashedPasswordFromDatabase);
        case 12:
          match = _context2.sent;
          return _context2.abrupt("return", match);
        case 14:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function verificarContrasena(_x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

//Eliminar temporalmente durante 1 semana
var eliminarTemporalmente = exports.eliminarTemporalmente = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(id) {
    var connection, idResult, estado, results;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return (0, _database.connect)();
        case 2:
          connection = _context3.sent;
          _context3.next = 5;
          return prisma.usuario.findUnique({
            where: {
              id: parseInt(id)
              //estado: true
            },
            select: {
              id: true,
              estado: true
            }
          });
        case 5:
          idResult = _context3.sent;
          if (!(!idResult || idResult.length === 0)) {
            _context3.next = 8;
            break;
          }
          return _context3.abrupt("return", null);
        case 8:
          //Verificar que la cuenta no esté ya eliminada
          estado = idResult.estado;
          if (!(estado == 0)) {
            _context3.next = 11;
            break;
          }
          return _context3.abrupt("return", false);
        case 11:
          _context3.next = 13;
          return prisma.usuario.update({
            where: {
              id: parseInt(id)
            },
            data: {
              estado: false,
              eliminado_temporal_fecha: {
                set: new Date()
              }
            }
          });
        case 13:
          results = _context3.sent;
          return _context3.abrupt("return", results);
        case 15:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function eliminarTemporalmente(_x7) {
    return _ref3.apply(this, arguments);
  };
}();

//Función para restaurar una cuenta que ha sido eliminada temporalmente
var restaurarCuenta = exports.restaurarCuenta = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(id) {
    var connection, idResult, estado, fecha, eliminadoTemporalmente, unaSemanaEnMiliseg, fechaAhora, fechaEliminacion, results;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return (0, _database.connect)();
        case 2:
          connection = _context4.sent;
          _context4.next = 5;
          return prisma.usuario.findUnique({
            where: {
              id: parseInt(id)
            },
            select: {
              id: true,
              estado: true
            }
          });
        case 5:
          idResult = _context4.sent;
          if (!(!idResult || idResult.length === 0)) {
            _context4.next = 8;
            break;
          }
          return _context4.abrupt("return", null);
        case 8:
          //Verificar que la cuenta no esté ya restaurada
          estado = idResult.estado;
          if (!(estado == 1)) {
            _context4.next = 11;
            break;
          }
          return _context4.abrupt("return", false);
        case 11:
          _context4.next = 13;
          return prisma.usuario.findUnique({
            where: {
              id: parseInt(id)
            },
            select: {
              eliminado_temporal_fecha: true
            }
          });
        case 13:
          fecha = _context4.sent;
          eliminadoTemporalmente = fecha.eliminado_temporal_fecha; // Verificar si ha pasado más de 1 semana
          unaSemanaEnMiliseg = 7 * 24 * 60 * 60 * 1000;
          fechaAhora = new Date();
          fechaEliminacion = new Date(eliminadoTemporalmente);
          if (!(fechaAhora - fechaEliminacion > unaSemanaEnMiliseg)) {
            _context4.next = 20;
            break;
          }
          return _context4.abrupt("return", true);
        case 20:
          _context4.next = 22;
          return prisma.usuario.update({
            where: {
              id: parseInt(id)
            },
            data: {
              estado: true,
              eliminado_temporal_fecha: null
            }
          });
        case 22:
          results = _context4.sent;
          return _context4.abrupt("return", results);
        case 24:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return function restaurarCuenta(_x8) {
    return _ref4.apply(this, arguments);
  };
}();

//Función para eliminar las cuentas vencidas (pasado 1 semana de haber sido eliminados temporalmente)
var eliminarCuentasVencidas = exports.eliminarCuentasVencidas = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(id) {
    var connection, idResult, fechaUnaSemanaAtras, usuarioEliminado, results;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return (0, _database.connect)();
        case 2:
          connection = _context5.sent;
          _context5.next = 5;
          return prisma.usuario.findUnique({
            where: {
              id: parseInt(id)
            },
            select: {
              id: true
            }
          });
        case 5:
          idResult = _context5.sent;
          if (idResult) {
            _context5.next = 8;
            break;
          }
          return _context5.abrupt("return", null);
        case 8:
          fechaUnaSemanaAtras = new Date();
          fechaUnaSemanaAtras.setDate(fechaUnaSemanaAtras.getDate() - 7);
          _context5.next = 12;
          return prisma.usuario.findFirst({
            where: {
              id: parseInt(id),
              estado: false,
              eliminado_temporal_fecha: {
                lte: fechaUnaSemanaAtras
              }
            }
          });
        case 12:
          usuarioEliminado = _context5.sent;
          if (!usuarioEliminado) {
            _context5.next = 20;
            break;
          }
          _context5.next = 16;
          return prisma.usuario["delete"]({
            where: {
              id: parseInt(id)
            }
          });
        case 16:
          results = _context5.sent;
          return _context5.abrupt("return", results);
        case 20:
          return _context5.abrupt("return", false);
        case 21:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return function eliminarCuentasVencidas(_x9) {
    return _ref5.apply(this, arguments);
  };
}();

//Función para eliminaruna cuenta permanentemente
var eliminarPermanentemente = exports.eliminarPermanentemente = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(id) {
    var connection, idResult, estado, results;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return (0, _database.connect)();
        case 2:
          connection = _context6.sent;
          _context6.next = 5;
          return prisma.usuario.findUnique({
            where: {
              id: parseInt(id)
            },
            select: {
              id: true,
              estado: true
            }
          });
        case 5:
          idResult = _context6.sent;
          if (idResult) {
            _context6.next = 8;
            break;
          }
          return _context6.abrupt("return", null);
        case 8:
          //Verificar que la cuenta no esté ya restaurada
          estado = idResult.estado;
          if (!(estado == 0)) {
            _context6.next = 11;
            break;
          }
          return _context6.abrupt("return", false);
        case 11:
          _context6.next = 13;
          return prisma.usuario["delete"]({
            where: {
              id: parseInt(id)
            }
          });
        case 13:
          results = _context6.sent;
          return _context6.abrupt("return", results);
        case 15:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  }));
  return function eliminarPermanentemente(_x10) {
    return _ref6.apply(this, arguments);
  };
}();
module.exports = {
  crearUsuario: crearUsuario,
  verificarContrasena: verificarContrasena,
  eliminarTemporalmente: eliminarTemporalmente,
  restaurarCuenta: restaurarCuenta,
  eliminarCuentasVencidas: eliminarCuentasVencidas,
  eliminarPermanentemente: eliminarPermanentemente
};