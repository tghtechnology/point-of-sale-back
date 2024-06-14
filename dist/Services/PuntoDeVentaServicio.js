"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reestablecerPos = exports.listarPosEliminadosPorId = exports.listarPosEliminados = exports.listarPOSPorId = exports.listarPOS = exports.eliminarPOS = exports.crearPOS = void 0;
var _client = require("@prisma/client");
var _Time = require("../Utils/Time");
var _UsuarioServicio = require("./UsuarioServicio");
var _ActualizarRegsByPos = require("../Middleware/ActualizarRegsByPos");
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var prisma = new _client.PrismaClient();

/**
 * Crea un nuevo punto de venta en la base de datos.
 * 
 * @param {string} nombre - El nombre del punto de venta.
 * @param {string} propietario - El nombre del propietario del punto de venta.
 * @returns {Object} - Retorna un objeto con la información del nuevo punto de venta creado.
 * @throws {Error} - Si ocurre un error al crear el punto de venta.
 */
var crearPOS = exports.crearPOS = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(nombre, propietario) {
    var nombrePOS, nombrePropietario, todayISO, fecha_creacion, newPos;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          nombrePOS = nombre;
          nombrePropietario = propietario;
          todayISO = new Date().toISOString();
          fecha_creacion = (0, _Time.getUTCTime)(todayISO);
          _context.next = 6;
          return prisma.puntoDeVenta.create({
            data: {
              nombre: nombrePOS,
              propietario: nombrePropietario,
              estado: true,
              fecha_creacion: fecha_creacion
            }
          });
        case 6:
          newPos = _context.sent;
          return _context.abrupt("return", newPos);
        case 8:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function crearPOS(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

/**
 * Obtiene una lista de todos los puntos de venta activos en la base de datos.
 * 
 * @returns {Array<Object>} - Retorna un array de objetos con la información de los puntos de venta activos.
 * @throws {Error} - Si ocurre un error al obtener la lista de puntos de venta.
 */

var listarPOS = exports.listarPOS = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
    var pos;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return prisma.puntoDeVenta.findMany({
            where: {
              estado: true
            }
          });
        case 2:
          pos = _context2.sent;
          return _context2.abrupt("return", pos);
        case 4:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function listarPOS() {
    return _ref2.apply(this, arguments);
  };
}();

/**
 * Obtiene un punto de venta por su ID.
 * 
 * @param {Number} id - El ID del punto de venta.
 * @returns {Object} - Retorna un objeto con la información del punto de venta si existe, de lo contrario, retorna null.
 */
var listarPOSPorId = exports.listarPOSPorId = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(id) {
    var pos;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return prisma.puntoDeVenta.findUnique({
            where: {
              id: parseInt(id),
              estado: true
            }
          });
        case 2:
          pos = _context3.sent;
          return _context3.abrupt("return", pos);
        case 4:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function listarPOSPorId(_x3) {
    return _ref3.apply(this, arguments);
  };
}();

/**
 * Elimina un punto de venta de la base de datos.
 * 
 * @param {Number} id - El ID del punto de venta a eliminar.
 * @returns {Object} - Retorna un objeto con la información del punto de venta eliminado.
 * @throws {Error} - Si ocurre un error al eliminar el punto de venta.
 */
var eliminarPOS = exports.eliminarPOS = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(id) {
    var pos, usuarioId, cerrarSesionProp, eliminarPropietario, eliminarEmpleados;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return prisma.puntoDeVenta.update({
            where: {
              id: parseInt(id),
              estado: true
            },
            data: {
              estado: false
            },
            select: {
              propietario: true
            }
          });
        case 2:
          pos = _context4.sent;
          _context4.next = 5;
          return prisma.usuario.findFirst({
            where: {
              nombre: pos.propietario,
              estado: true
            },
            select: {
              id: true
            }
          });
        case 5:
          usuarioId = _context4.sent;
          _context4.next = 8;
          return eliminarSesionesActivasEmpleados(id);
        case 8:
          cerrarSesionProp = (0, _UsuarioServicio.eliminarSesionesActivas)(usuarioId.id);
          _context4.next = 11;
          return prisma.usuario.update({
            where: {
              id: usuarioId.id,
              estado: true
            },
            data: {
              estado: false
            }
          });
        case 11:
          eliminarPropietario = _context4.sent;
          _context4.next = 14;
          return prisma.usuario.updateMany({
            where: {
              id_puntoDeVenta: parseInt(id),
              estado: true
            },
            data: {
              estado: false
            }
          });
        case 14:
          eliminarEmpleados = _context4.sent;
          _context4.next = 17;
          return (0, _ActualizarRegsByPos.desactivarRegistros)(parseInt(id));
        case 17:
          return _context4.abrupt("return", pos);
        case 18:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return function eliminarPOS(_x4) {
    return _ref4.apply(this, arguments);
  };
}();

/**
 * Restablece un punto de venta previamente eliminado.
 * 
 * @param {Number} id - El ID del punto de venta a restablecer.
 * @returns {Object} - Retorna un objeto con la información del punto de venta restablecido.
 * @throws {Error} - Si ocurre un error al restablecer el punto de venta.
 */
var reestablecerPos = exports.reestablecerPos = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(id) {
    var pos, usuarioId, reactivarPropietario, reactivarEmpleados;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return prisma.puntoDeVenta.update({
            where: {
              id: parseInt(id),
              estado: false
            },
            data: {
              estado: true
            },
            select: {
              propietario: true
            }
          });
        case 2:
          pos = _context5.sent;
          _context5.next = 5;
          return prisma.usuario.findFirst({
            where: {
              nombre: pos.propietario,
              estado: false
            },
            select: {
              id: true
            }
          });
        case 5:
          usuarioId = _context5.sent;
          _context5.next = 8;
          return prisma.usuario.update({
            where: {
              id: usuarioId.id,
              estado: false
            },
            data: {
              estado: true
            }
          });
        case 8:
          reactivarPropietario = _context5.sent;
          _context5.next = 11;
          return prisma.usuario.updateMany({
            where: {
              id_puntoDeVenta: parseInt(id),
              estado: false
            },
            data: {
              estado: true
            }
          });
        case 11:
          reactivarEmpleados = _context5.sent;
          _context5.next = 14;
          return (0, _ActualizarRegsByPos.reactivarRegistros)(parseInt(id));
        case 14:
          return _context5.abrupt("return", pos);
        case 15:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return function reestablecerPos(_x5) {
    return _ref5.apply(this, arguments);
  };
}();

/**
 * Obtiene una lista de todos los puntos de venta eliminados en la base de datos.
 * 
 * @returns {Array<Object>} - Retorna un array de objetos con la información de los puntos de venta eliminados.
 * @throws {Error} - Si ocurre un error al obtener la lista de puntos de venta eliminados.
 */
var listarPosEliminados = exports.listarPosEliminados = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6() {
    var pos;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return prisma.puntoDeVenta.findMany({
            where: {
              estado: false
            }
          });
        case 2:
          pos = _context6.sent;
          return _context6.abrupt("return", pos);
        case 4:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  }));
  return function listarPosEliminados() {
    return _ref6.apply(this, arguments);
  };
}();

/**
 * Obtiene un punto de venta eliminado por su ID.
 * 
 * @param {Number} id - El ID del punto de venta eliminado.
 * @returns {Object} - Retorna un objeto con la información del punto de venta eliminado si existe, de lo contrario, retorna null.
 */
var listarPosEliminadosPorId = exports.listarPosEliminadosPorId = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(id) {
    var pos;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return prisma.puntoDeVenta.findUnique({
            where: {
              id: parseInt(id),
              estado: false
            }
          });
        case 2:
          pos = _context7.sent;
          return _context7.abrupt("return", pos);
        case 4:
        case "end":
          return _context7.stop();
      }
    }, _callee7);
  }));
  return function listarPosEliminadosPorId(_x6) {
    return _ref7.apply(this, arguments);
  };
}();

/**
 * Elimina las sesiones activas de los empleados asociados a un punto de venta.
 * 
 * @param {Number} id_puntoDeVenta - El ID del punto de venta.
 * @returns {Promise<void>}
 */
var eliminarSesionesActivasEmpleados = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(id_puntoDeVenta) {
    var activeSessions;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.next = 2;
          return prisma.sesion.findMany({
            where: {
              id_puntoDeVenta: parseInt(id_puntoDeVenta),
              expiracion: {
                gt: new Date()
              }
            }
          });
        case 2:
          activeSessions = _context8.sent;
          if (!(activeSessions.length > 0)) {
            _context8.next = 6;
            break;
          }
          _context8.next = 6;
          return logout(activeSessions[0].token);
        case 6:
        case "end":
          return _context8.stop();
      }
    }, _callee8);
  }));
  return function eliminarSesionesActivasEmpleados(_x7) {
    return _ref8.apply(this, arguments);
  };
}();