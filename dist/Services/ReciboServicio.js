"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.listarRecibo = exports.Reembolsar = exports.ListarReciboByVenta = exports.ListarReciboById = exports.CrearRecibo = void 0;
var _client = require("@prisma/client");
var _Time = require("../Utils/Time");
var _SendEmail = require("../Utils/SendEmail");
var _helperReembolso = require("../helpers/helperReembolso");
var _DetalleReembolsoServicio = require("./DetalleReembolsoServicio");
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var prisma = new _client.PrismaClient();

/**
 * Genera una referencia única para un recibo.
 * 
 * @param {number} usuario_id - El ID del usuario para el que se está generando la referencia.
 * 
 * @returns {string} - Una referencia única basada en el ID del último recibo encontrado más un valor adicional para hacerla única.
 * 
 * @throws {Error} - Si ocurre un error al obtener el último recibo o al generar la referencia.
 */

var generarRef = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(usuario_id) {
    var id_puntoDeVenta, ultimoRecibo, ultimoIdRecibo, nuevoRef;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return obtenerIdPunto(usuario_id);
        case 3:
          id_puntoDeVenta = _context.sent;
          _context.next = 6;
          return prisma.recibo.findFirst({
            where: {
              id_puntoDeVenta: id_puntoDeVenta
            },
            orderBy: {
              id: "desc"
            }
          });
        case 6:
          ultimoRecibo = _context.sent;
          ultimoIdRecibo = ultimoRecibo ? parseInt(ultimoRecibo.ref.split('-')[1]) : 999;
          nuevoRef = "#".concat(id_puntoDeVenta, "-").concat(ultimoIdRecibo + 1);
          return _context.abrupt("return", nuevoRef);
        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](0);
          console.error("Error al generar el valor de ref:", _context.t0);
          throw _context.t0;
        case 16:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 12]]);
  }));
  return function generarRef(_x) {
    return _ref.apply(this, arguments);
  };
}();

/**
 * Obtiene todos los recibos de la base de datos asociados a un usuario.
 * 
 * @param {number} usuario_id - El ID del usuario para el que se desean obtener los recibos.
 * 
 * @returns {Array<Object>} - Una lista de objetos representando todos los recibos.
 * 
 * @throws {Error} - Si ocurre un error al buscar los recibos.
 */

var listarRecibo = exports.listarRecibo = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(usuario_id) {
    var id_puntoDeVenta, recibos;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return obtenerIdPunto(usuario_id);
        case 2:
          id_puntoDeVenta = _context2.sent;
          _context2.next = 5;
          return prisma.recibo.findMany({
            where: {
              id_puntoDeVenta: id_puntoDeVenta
            }
          });
        case 5:
          recibos = _context2.sent;
          return _context2.abrupt("return", recibos);
        case 7:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function listarRecibo(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

/**
 * Obtiene el nombre de un artículo por su ID.
 * 
 * @param {number} articuloId - El ID del artículo para buscar su nombre.
 * @param {number} usuario_id - El ID del usuario asociado para verificar el acceso al punto de venta.
 * 
 * @returns {string|null} - El nombre del artículo, o null si no se encuentra el artículo.
 * 
 * @throws {Error} - Si ocurre un error al buscar el artículo por su ID.
 */
function obtenerNombreArticulo(_x3, _x4) {
  return _obtenerNombreArticulo.apply(this, arguments);
}
/**
 * Crea un nuevo recibo para la última venta en la base de datos.
 * 
 * @param {number} usuario_id - El ID del usuario para el que se está creando el recibo.
 * 
 * @returns {Object} - El objeto representando el recibo recién creado, incluyendo la referencia generada y detalles relacionados con la venta.
 * 
 * @throws {Error} - Si ocurre un error durante la creación del recibo o al obtener datos relacionados con la venta.
 */
function _obtenerNombreArticulo() {
  _obtenerNombreArticulo = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(articuloId, usuario_id) {
    var id_puntoDeVenta, articulo;
    return _regeneratorRuntime().wrap(function _callee10$(_context11) {
      while (1) switch (_context11.prev = _context11.next) {
        case 0:
          _context11.next = 2;
          return obtenerIdPunto(usuario_id);
        case 2:
          id_puntoDeVenta = _context11.sent;
          _context11.next = 5;
          return prisma.articulo.findUnique({
            where: {
              id: articuloId,
              id_puntoDeVenta: id_puntoDeVenta
            },
            select: {
              nombre: true
            }
          });
        case 5:
          articulo = _context11.sent;
          return _context11.abrupt("return", articulo ? articulo.nombre : null);
        case 7:
        case "end":
          return _context11.stop();
      }
    }, _callee10);
  }));
  return _obtenerNombreArticulo.apply(this, arguments);
}
var CrearRecibo = exports.CrearRecibo = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(usuario_id) {
    var usuario, punto, id_punto, id_puntoDeVenta, lastVenta, id_venta, ref, Rec, detalles, nombresArticulos, detallesFormato, todayISO, fecha_creacion, newRecibo;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
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
          usuario = _context4.sent;
          punto = usuario.id_puntoDeVenta;
          _context4.next = 6;
          return prisma.puntoDeVenta.findFirst({
            where: {
              id: punto
            }
            // select: { id: true }
          });
        case 6:
          id_punto = _context4.sent;
          //Asignar id del punto de venta
          id_puntoDeVenta = id_punto.id;
          _context4.next = 10;
          return prisma.venta.findFirst({
            orderBy: {
              id: "desc"
            }
          });
        case 10:
          lastVenta = _context4.sent;
          id_venta = lastVenta.id;
          _context4.next = 14;
          return generarRef(usuario_id);
        case 14:
          ref = _context4.sent;
          _context4.next = 17;
          return prisma.venta.findFirst({
            where: {
              id: id_venta,
              id_puntoDeVenta: id_puntoDeVenta
            },
            include: {
              usuario: true,
              detalles: true,
              descuento: true,
              impuesto: true,
              cliente: true
            }
          });
        case 17:
          Rec = _context4.sent;
          _context4.next = 20;
          return prisma.detalleVenta.findMany({
            where: {
              ventaId: id_venta,
              id_puntoDeVenta: id_puntoDeVenta
            },
            select: {
              articuloId: true,
              cantidad: true,
              subtotal: true,
              ventaId: true
            }
          });
        case 20:
          detalles = _context4.sent;
          _context4.next = 23;
          return Promise.all(detalles.map( /*#__PURE__*/function () {
            var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(detalle) {
              var articuloId, nombreArticulo;
              return _regeneratorRuntime().wrap(function _callee3$(_context3) {
                while (1) switch (_context3.prev = _context3.next) {
                  case 0:
                    articuloId = detalle.articuloId;
                    _context3.next = 3;
                    return obtenerNombreArticulo(articuloId, usuario_id);
                  case 3:
                    nombreArticulo = _context3.sent;
                    return _context3.abrupt("return", nombreArticulo);
                  case 5:
                  case "end":
                    return _context3.stop();
                }
              }, _callee3);
            }));
            return function (_x6) {
              return _ref4.apply(this, arguments);
            };
          }()));
        case 23:
          nombresArticulos = _context4.sent;
          //Indexar al array de detalles
          detallesFormato = detalles.map(function (detalle, index) {
            var detalleArticulo = {
              nombreArticulo: nombresArticulos[index],
              cantidad: detalle.cantidad,
              subtotal: detalle.subtotal,
              ventaId: detalle.ventaId
            };
            return detalleArticulo;
          }); //Creacion de recibo en la BD
          todayISO = new Date().toISOString();
          fecha_creacion = (0, _Time.getUTCTime)(todayISO);
          _context4.next = 29;
          return prisma.recibo.create({
            data: {
              ref: ref,
              fecha_creacion: fecha_creacion,
              id_venta: id_venta,
              id_puntoDeVenta: id_puntoDeVenta
            }
          });
        case 29:
          newRecibo = _context4.sent;
          return _context4.abrupt("return", newRecibo);
        case 31:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return function CrearRecibo(_x5) {
    return _ref3.apply(this, arguments);
  };
}();

/**
 * Realiza un reembolso para la última venta registrada y lo guarda en la base de datos.
 * 
 * @param {number} id - El ID de la venta asociada al recibo original.
 * @param {Array<Object>} detalles - Los detalles del reembolso.
 * @param {number} usuario_id - El ID del usuario que realiza el reembolso.
 * 
 * @returns {Object} - El objeto representando el nuevo recibo, incluyendo la referencia generada y los detalles asociados.
 * 
 * @throws {Error} - Si ocurre un error durante la creación del recibo o al obtener la información de la venta o sus detalles.
 */

var Reembolsar = exports.Reembolsar = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(id, detalles, usuario_id) {
    var id_puntoDeVenta, ref, ventaAsociada, montoReembolsado, valorImpuestoTotal, valorDescuentoTotal, todayISO, fecha_creacion, reciboReembolsado, _iterator, _step, _loop, reembolso, detallesReembolso, clienteInfo, cuerpo;
    return _regeneratorRuntime().wrap(function _callee6$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return obtenerIdPunto(usuario_id);
        case 2:
          id_puntoDeVenta = _context7.sent;
          _context7.next = 5;
          return generarRef(usuario_id);
        case 5:
          ref = _context7.sent;
          _context7.next = 8;
          return prisma.venta.findUnique({
            where: {
              id: id,
              id_puntoDeVenta: id_puntoDeVenta
            },
            include: {
              detalles: true,
              descuento: true,
              impuesto: true,
              cliente: true
            }
          });
        case 8:
          ventaAsociada = _context7.sent;
          if (ventaAsociada) {
            _context7.next = 11;
            break;
          }
          throw new Error('No se encontró la venta asociada al recibo original');
        case 11:
          montoReembolsado = 0;
          valorImpuestoTotal = 0;
          valorDescuentoTotal = 0; // Crear el recibo de reembolso
          todayISO = new Date().toISOString();
          fecha_creacion = (0, _Time.getUTCTime)(todayISO);
          _context7.next = 18;
          return prisma.recibo.create({
            data: {
              ref: ref,
              fecha_creacion: fecha_creacion,
              id_venta: id,
              monto_reembolsado: montoReembolsado,
              valorDescuentoTotal: valorDescuentoTotal,
              valorImpuestoTotal: valorImpuestoTotal,
              id_puntoDeVenta: id_puntoDeVenta
            }
          });
        case 18:
          reciboReembolsado = _context7.sent;
          _iterator = _createForOfIteratorHelper(detalles);
          _context7.prev = 20;
          _loop = /*#__PURE__*/_regeneratorRuntime().mark(function _loop() {
            var detalle, detalleOriginal, cantidadRestanteReembolso, montoArticulo, valor, iValor;
            return _regeneratorRuntime().wrap(function _loop$(_context6) {
              while (1) switch (_context6.prev = _context6.next) {
                case 0:
                  detalle = _step.value;
                  detalleOriginal = ventaAsociada.detalles.find(function (det) {
                    return det.articuloId === detalle.articuloId;
                  });
                  if (detalleOriginal) {
                    _context6.next = 4;
                    break;
                  }
                  throw new Error("No se encontr\xF3 el detalle de la venta original para el art\xEDculo ".concat(detalle.articuloId));
                case 4:
                  cantidadRestanteReembolso = detalleOriginal.cantidad - detalleOriginal.cantidadReembolsadaTotal;
                  if (!(cantidadRestanteReembolso < detalle.cantidad)) {
                    _context6.next = 7;
                    break;
                  }
                  throw new Error("La cantidad a reembolsar para el art\xEDculo ".concat(detalle.articuloId, " excede la cantidad restante"));
                case 7:
                  _context6.next = 9;
                  return prisma.detalleVenta.update({
                    where: {
                      id: detalleOriginal.id
                    },
                    data: {
                      cantidadReembolsadaTotal: detalleOriginal.cantidadReembolsadaTotal + detalle.cantidad
                    }
                  });
                case 9:
                  montoArticulo = detalle.cantidad / detalleOriginal.cantidad * detalleOriginal.subtotal;
                  valor = 0;
                  if (ventaAsociada.descuento) {
                    if (ventaAsociada.descuento.tipo_descuento === 'PORCENTAJE') {
                      valor = montoArticulo * ventaAsociada.descuento.valor_calculado;
                      montoArticulo -= valor;
                      valorDescuentoTotal += valor;
                    } else if (ventaAsociada.descuento.tipo_descuento === 'MONTO') {
                      valor = ventaAsociada.descuento.valor / ventaAsociada.subtotal * montoArticulo;
                      montoArticulo -= valor;
                      valorDescuentoTotal += valor;
                    }
                  }
                  iValor = 0;
                  if (ventaAsociada.impuesto && ventaAsociada.impuesto.tipo_impuesto === 'Anadido_al_precio') {
                    iValor = montoArticulo * (ventaAsociada.impuesto.tasa / 100);
                    montoArticulo += iValor;
                    valorImpuestoTotal += iValor;
                  }
                  detalleOriginal.cantidadReembolsadaTotal += detalle.cantidad;
                  montoReembolsado += montoArticulo;

                  // Crear el detalle de reembolso usando el servicio DetalleReembolsoServicio
                  _context6.next = 18;
                  return (0, _DetalleReembolsoServicio.CrearDetalleReembolso)(detalle.articuloId, reciboReembolsado.id, detalle.cantidad, montoArticulo);
                case 18:
                case "end":
                  return _context6.stop();
              }
            }, _loop);
          });
          _iterator.s();
        case 23:
          if ((_step = _iterator.n()).done) {
            _context7.next = 27;
            break;
          }
          return _context7.delegateYield(_loop(), "t0", 25);
        case 25:
          _context7.next = 23;
          break;
        case 27:
          _context7.next = 32;
          break;
        case 29:
          _context7.prev = 29;
          _context7.t1 = _context7["catch"](20);
          _iterator.e(_context7.t1);
        case 32:
          _context7.prev = 32;
          _iterator.f();
          return _context7.finish(32);
        case 35:
          _context7.next = 37;
          return prisma.recibo.update({
            where: {
              id: reciboReembolsado.id
            },
            data: {
              monto_reembolsado: montoReembolsado,
              valorDescuentoTotal: valorDescuentoTotal,
              valorImpuestoTotal: valorImpuestoTotal
            }
          });
        case 37:
          reembolso = _context7.sent;
          if (!ventaAsociada.cliente) {
            _context7.next = 46;
            break;
          }
          _context7.next = 41;
          return Promise.all(detalles.map( /*#__PURE__*/function () {
            var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(detalle) {
              var nombreArticulo, precioUnitario, precio;
              return _regeneratorRuntime().wrap(function _callee5$(_context5) {
                while (1) switch (_context5.prev = _context5.next) {
                  case 0:
                    _context5.next = 2;
                    return obtenerNombreArticulo(detalle.articuloId, usuario_id);
                  case 2:
                    nombreArticulo = _context5.sent;
                    _context5.next = 5;
                    return prisma.articulo.findUnique({
                      where: {
                        id: detalle.articuloId
                      },
                      select: {
                        precio: true
                      }
                    });
                  case 5:
                    precioUnitario = _context5.sent;
                    precio = precioUnitario ? precioUnitario.precio : null;
                    return _context5.abrupt("return", {
                      nombreArticulo: nombreArticulo,
                      cantidad: detalle.cantidad,
                      precioUnitario: precio
                    });
                  case 8:
                  case "end":
                    return _context5.stop();
                }
              }, _callee5);
            }));
            return function (_x10) {
              return _ref6.apply(this, arguments);
            };
          }()));
        case 41:
          detallesReembolso = _context7.sent;
          clienteInfo = ventaAsociada.cliente;
          cuerpo = (0, _helperReembolso.cuerpoReembolso)(clienteInfo.nombre, detallesReembolso, montoReembolsado, valorDescuentoTotal, valorImpuestoTotal);
          _context7.next = 46;
          return (0, _SendEmail.envioCorreo)(clienteInfo.email, 'Reembolso realizado', cuerpo);
        case 46:
          return _context7.abrupt("return", reembolso);
        case 47:
        case "end":
          return _context7.stop();
      }
    }, _callee6, null, [[20, 29, 32, 35]]);
  }));
  return function Reembolsar(_x7, _x8, _x9) {
    return _ref5.apply(this, arguments);
  };
}();

/**
 * Obtiene un recibo específico por su ID.
 * 
 * @param {number} id - El ID del recibo a buscar.
 * @param {number} usuario_id - El ID del usuario para verificar el acceso al recibo.
 * 
 * @returns {Object|null} - El objeto representando el recibo, o null si no se encuentra.
 * 
 * @throws {Error} - Si ocurre un error al buscar el recibo por su ID.
 */
var ListarReciboById = exports.ListarReciboById = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(id, usuario_id) {
    var id_puntoDeVenta, recibo;
    return _regeneratorRuntime().wrap(function _callee7$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.next = 2;
          return obtenerIdPunto(usuario_id);
        case 2:
          id_puntoDeVenta = _context8.sent;
          _context8.next = 5;
          return prisma.recibo.findMany({
            where: {
              id: Number(id),
              id_puntoDeVenta: id_puntoDeVenta
            }
          });
        case 5:
          recibo = _context8.sent;
          return _context8.abrupt("return", recibo);
        case 7:
        case "end":
          return _context8.stop();
      }
    }, _callee7);
  }));
  return function ListarReciboById(_x11, _x12) {
    return _ref7.apply(this, arguments);
  };
}();

/**
 * Obtiene los recibos relacionados a una venta específica por el ID de la venta.
 * 
 * @param {number|string} id_venta - El ID de la venta cuyos recibos se desean buscar.
 * @param {number|string} usuario_id - El ID del usuario para verificar el acceso a los recibos.
 * 
 * @returns {Array<Object>} - Una lista de objetos representando los recibos relacionados a la venta.
 * 
 * @throws {Error} - Si ocurre un error al buscar los recibos por el ID de la venta.
 */
var ListarReciboByVenta = exports.ListarReciboByVenta = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(id_venta, usuario_id) {
    var id_puntoDeVenta, recibos;
    return _regeneratorRuntime().wrap(function _callee8$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          _context9.next = 2;
          return obtenerIdPunto(usuario_id);
        case 2:
          id_puntoDeVenta = _context9.sent;
          _context9.next = 5;
          return prisma.recibo.findMany({
            where: {
              id_venta: Number(id_venta),
              id_puntoDeVenta: id_puntoDeVenta
            }
          });
        case 5:
          recibos = _context9.sent;
          return _context9.abrupt("return", recibos);
        case 7:
        case "end":
          return _context9.stop();
      }
    }, _callee8);
  }));
  return function ListarReciboByVenta(_x13, _x14) {
    return _ref8.apply(this, arguments);
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
  var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(usuario_id) {
    var usuario, punto, usuarioExistente;
    return _regeneratorRuntime().wrap(function _callee9$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          _context10.next = 2;
          return prisma.usuario.findFirst({
            where: {
              id: usuario_id
            },
            select: {
              id_puntoDeVenta: true
            }
          });
        case 2:
          usuario = _context10.sent;
          punto = usuario.id_puntoDeVenta;
          _context10.next = 6;
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
          usuarioExistente = _context10.sent;
          if (usuarioExistente) {
            _context10.next = 9;
            break;
          }
          throw new Error("Usuario no encontrado");
        case 9:
          return _context10.abrupt("return", usuarioExistente.id_puntoDeVenta);
        case 10:
        case "end":
          return _context10.stop();
      }
    }, _callee9);
  }));
  return function obtenerIdPunto(_x15) {
    return _ref9.apply(this, arguments);
  };
}();