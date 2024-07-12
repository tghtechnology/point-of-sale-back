"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _client = require("@prisma/client");
var _DescuentoControlador = require("../controllers/DescuentoControlador");
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var prisma = new _client.PrismaClient();

/**
 * Crea un nuevo detalle de venta y lo guarda en la base de datos.
 * 
 * @param {number} cantidad - La cantidad de artículos vendidos.
 * @param {number|string} articuloId - El ID del artículo vendido.
 * @param {number|string} ventaId - El ID de la venta a la que pertenece el detalle.
 * @param {number} usuario_id - El ID del usuario para el que se está creando el detalle.
 * 
 * @returns {Object} - El objeto representando el nuevo detalle de venta creado, incluyendo el subtotal calculado.
 * @throws {Error} - Si el ID del artículo no es válido o si ocurre un error al crear el detalle.
 */

var CrearDetalle = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(cantidad, articuloId, ventaId, usuario_id) {
    var usuario, punto, id_punto, id_puntoDeVenta, info, subtotal, newDetalle;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return prisma.usuario.findFirst({
            where: {
              id: usuario_id
            },
            select: {
              nombre: true,
              id_puntoDeVenta: true
            }
          });
        case 2:
          usuario = _context.sent;
          punto = usuario.id_puntoDeVenta;
          _context.next = 6;
          return prisma.puntoDeVenta.findFirst({
            where: {
              id: punto
            }
            // select: { id: true }
          });
        case 6:
          id_punto = _context.sent;
          //Asignar id del punto de venta
          id_puntoDeVenta = id_punto.id;
          _context.next = 10;
          return prisma.articulo.findUnique({
            where: {
              id: articuloId,
              estado: true,
              id_puntoDeVenta: id_puntoDeVenta
            }
          });
        case 10:
          info = _context.sent;
          subtotal = info.precio * cantidad;
          _context.next = 14;
          return prisma.detalleVenta.create({
            data: {
              cantidad: cantidad,
              subtotal: subtotal,
              articuloId: articuloId,
              ventaId: ventaId,
              id_puntoDeVenta: id_puntoDeVenta
            }
          });
        case 14:
          newDetalle = _context.sent;
          return _context.abrupt("return", newDetalle);
        case 16:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function CrearDetalle(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();

/**
 * Obtiene todos los detalles de venta de la base de datos.
 * 
 * @param {number} usuario_id - El ID del usuario para el que se está listando los detalles de venta.
 * 
 * @returns {Array<Object>} - Una lista de objetos representando todos los detalles de venta.
 * @throws {Error} - Si ocurre un error al recuperar los detalles.
 */

var ListarDetalles = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(usuario_id) {
    var id_puntoDeVenta, detalles;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return obtenerIdPunto(usuario_id);
        case 2:
          id_puntoDeVenta = _context2.sent;
          _context2.next = 5;
          return prisma.detalleVenta.findMany({
            where: {
              id_puntoDeVenta: id_puntoDeVenta
            }
          });
        case 5:
          detalles = _context2.sent;
          return _context2.abrupt("return", detalles);
        case 7:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function ListarDetalles(_x5) {
    return _ref2.apply(this, arguments);
  };
}();

/**
 * Obtiene los detalles de venta asociados a un ID de venta específico.
 * 
 * @param {number|string} ventaId - El ID de la venta para la cual se quieren obtener los detalles.
 * @param {number} usuario_id - El ID del usuario para el que se está listando el detalle por ID.
 * 
 * @returns {Object|null} - El objeto representando los detalles de venta encontrados o null si no se encuentra ninguno.
 * @throws {Error} - Si el ID de la venta no es válido o si ocurre un error al buscar los detalles.
 */

var ListarDetallesByVenta = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(ventaId, usuario_id) {
    var id_puntoDeVenta, detallesByVenta;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return obtenerIdPunto(usuario_id);
        case 2:
          id_puntoDeVenta = _context3.sent;
          _context3.next = 5;
          return prisma.detalleVenta.findMany({
            where: {
              ventaId: Number(ventaId),
              id_puntoDeVenta: id_puntoDeVenta
            }
          });
        case 5:
          detallesByVenta = _context3.sent;
          return _context3.abrupt("return", detallesByVenta);
        case 7:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function ListarDetallesByVenta(_x6, _x7) {
    return _ref3.apply(this, arguments);
  };
}();

/**
 * Obtiene el ID del punto de venta asociado a un usuario.
 *
 * @param {number|string} usuario_id - El ID del usuario para el que se quiere obtener el ID del punto de venta.
 * @returns {number} - El ID del punto de venta asociado al usuario.
 * @throws {Error} - Si no se encuentra el usuario o no está asociado a un punto de venta.
 */
var obtenerIdPunto = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(usuario_id) {
    var usuario, punto, usuarioExistente;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return prisma.usuario.findFirst({
            where: {
              id: usuario_id
            },
            select: {
              id_puntoDeVenta: true
            }
          });
        case 2:
          usuario = _context4.sent;
          punto = usuario.id_puntoDeVenta;
          _context4.next = 6;
          return prisma.usuario.findFirst({
            where: {
              id: usuario_id,
              id_puntoDeVenta: punto
            },
            select: {
              id_puntoDeVenta: true
            }
          });
        case 6:
          usuarioExistente = _context4.sent;
          if (usuarioExistente) {
            _context4.next = 9;
            break;
          }
          throw new Error("Usuario no encontrado");
        case 9:
          return _context4.abrupt("return", usuarioExistente.id_puntoDeVenta);
        case 10:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return function obtenerIdPunto(_x8) {
    return _ref4.apply(this, arguments);
  };
}();

/**
 * Obtiene un detalle de venta específico por su ID.
 * 
 * @param {number|string} id - El ID del detalle de venta a buscar.
 * 
 * @returns {Object|null} - El objeto representando el detalle de venta encontrado o null si no se encuentra.
 * @throws {Error} - Si el ID del detalle no es válido o si ocurre un error al buscar el detalle.
 */
var DetalleById = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(id) {
    var detalle;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return prisma.detalleVenta.findUnique({
            where: {
              id: Number(id)
            }
          });
        case 2:
          detalle = _context5.sent;
          return _context5.abrupt("return", detalle);
        case 4:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return function DetalleById(_x9) {
    return _ref5.apply(this, arguments);
  };
}();
module.exports = {
  CrearDetalle: CrearDetalle,
  ListarDetalles: ListarDetalles,
  ListarDetallesByVenta: ListarDetallesByVenta,
  DetalleById: DetalleById
};