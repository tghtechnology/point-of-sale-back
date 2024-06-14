"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _client = require("@prisma/client");
var DetalleVentaServicio = _interopRequireWildcard(require("./DetalleVentaServicio"));
var ReciboServicio = _interopRequireWildcard(require("./ReciboServicio"));
var _SendEmail = require("../Utils/SendEmail");
var _helperVenta = require("../helpers/helperVenta");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var prisma = new _client.PrismaClient();

/**
 * Crea una nueva venta, incluyendo detalles, impuestos, descuentos, y genera un recibo.
 * 
 * @param {Array<Object>} detalles - Los detalles de la venta, con información sobre los artículos vendidos.
 * @param {string} tipoPago - El tipo de pago (efectivo, tarjeta, etc.).
 * @param {number|string|null} [impuestoId] - El ID del impuesto aplicado a la venta (opcional).
 * @param {number|string|null} [descuentoId] - El ID del descuento aplicado a la venta (opcional).
 * @param {number|string|null} [clienteId] - El ID del cliente asociado a la venta (opcional).
 * @param {number|string} usuarioId - El ID del usuario que realizó la venta.
 * @param {number} dineroRecibido - El monto de dinero recibido por la venta.
 * @param {number} usuario_id - El ID del usuario para el que se está creando la venta.
 * 
 * @returns {Object} - El objeto representando la venta creada.
 * @throws {Error} - Si ocurre un error durante la creación de la venta, la generación de recibos, o el envío de correos electrónicos.
 */
var CrearVenta = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(detalles, tipoPago, impuestoId, descuentoId, clienteId, usuarioId, dineroRecibido, usuario_id) {
    var usuario, punto, id_punto, id_puntoDeVenta, subtotal, detallesArticulos, _iterator, _step, detalle, _articulo, total, VImpuesto, vDescuento, descuento, impuesto, totalImpuesto, cambio, nuevaVenta, empleado, articulo, id_venta, recibo, usuarioInfo, cuerpo;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
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
          usuario = _context2.sent;
          punto = usuario.id_puntoDeVenta;
          _context2.next = 6;
          return prisma.puntoDeVenta.findFirst({
            where: {
              id: punto
            }
            // select: { id: true }
          });
        case 6:
          id_punto = _context2.sent;
          // Asignar id del punto de venta
          id_puntoDeVenta = id_punto.id;
          subtotal = 0;
          detallesArticulos = [];
          _iterator = _createForOfIteratorHelper(detalles);
          _context2.prev = 11;
          _iterator.s();
        case 13:
          if ((_step = _iterator.n()).done) {
            _context2.next = 22;
            break;
          }
          detalle = _step.value;
          _context2.next = 17;
          return prisma.articulo.findUnique({
            where: {
              id: detalle.articuloId,
              id_puntoDeVenta: id_puntoDeVenta
            }
          });
        case 17:
          _articulo = _context2.sent;
          subtotal += _articulo.precio * detalle.cantidad;
          detallesArticulos.push({
            producto: _articulo.nombre,
            cantidad: detalle.cantidad,
            precioUnitario: _articulo.precio
          });
        case 20:
          _context2.next = 13;
          break;
        case 22:
          _context2.next = 27;
          break;
        case 24:
          _context2.prev = 24;
          _context2.t0 = _context2["catch"](11);
          _iterator.e(_context2.t0);
        case 27:
          _context2.prev = 27;
          _iterator.f();
          return _context2.finish(27);
        case 30:
          total = subtotal;
          VImpuesto = 0;
          vDescuento = 0;
          if (!descuentoId) {
            _context2.next = 39;
            break;
          }
          _context2.next = 36;
          return prisma.descuento.findUnique({
            where: {
              id: parseInt(descuentoId),
              id_puntoDeVenta: id_puntoDeVenta
            }
          });
        case 36:
          descuento = _context2.sent;
          if (descuento.tipo_descuento == "PORCENTAJE") {
            vDescuento = subtotal * descuento.valor_calculado;
            total -= vDescuento;
          }
          if (descuento.tipo_descuento == "MONTO") {
            vDescuento = descuento.valor_calculado;
            total -= vDescuento;
          }
        case 39:
          if (!impuestoId) {
            _context2.next = 45;
            break;
          }
          _context2.next = 42;
          return prisma.impuesto.findUnique({
            where: {
              id: parseInt(impuestoId),
              id_puntoDeVenta: id_puntoDeVenta
            }
          });
        case 42:
          impuesto = _context2.sent;
          if (impuesto.tipo_impuesto == "Anadido_al_precio") {
            totalImpuesto = total * (impuesto.tasa / 100);
            VImpuesto = totalImpuesto;
            total += totalImpuesto;
          }
          if (impuesto.tipo_impuesto == "Incluido_en_el_precio") {
            total = total;
          }
        case 45:
          // Calcular cambio
          cambio = dineroRecibido - total; // Crear la venta en la base de datos
          _context2.next = 48;
          return prisma.venta.create({
            data: _defineProperty(_defineProperty(_defineProperty({
              subtotal: subtotal,
              total: total,
              tipoPago: tipoPago,
              impuestoId: parseInt(impuestoId),
              descuentoId: parseInt(descuentoId),
              clienteId: parseInt(clienteId),
              usuarioId: parseInt(usuarioId),
              dineroRecibido: dineroRecibido,
              VImpuesto: VImpuesto,
              vDescuento: vDescuento
            }, "vDescuento", vDescuento), "cambio", cambio), "id_puntoDeVenta", id_puntoDeVenta)
          });
        case 48:
          nuevaVenta = _context2.sent;
          _context2.next = 51;
          return Promise.all(detalles.map( /*#__PURE__*/function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(detalle) {
              return _regeneratorRuntime().wrap(function _callee$(_context) {
                while (1) switch (_context.prev = _context.next) {
                  case 0:
                    _context.next = 2;
                    return DetalleVentaServicio.CrearDetalle(detalle.cantidad, detalle.articuloId, nuevaVenta.id, usuario_id);
                  case 2:
                  case "end":
                    return _context.stop();
                }
              }, _callee);
            }));
            return function (_x9) {
              return _ref2.apply(this, arguments);
            };
          }()));
        case 51:
          _context2.next = 53;
          return prisma.usuario.findUnique({
            where: {
              id: parseInt(usuarioId),
              id_puntoDeVenta: id_puntoDeVenta
            },
            select: {
              nombre: true
            }
          });
        case 53:
          empleado = _context2.sent;
          _context2.next = 56;
          return prisma.articulo.findMany({
            where: {
              id: detallesArticulos.articuloId,
              id_puntoDeVenta: id_puntoDeVenta
            }
          });
        case 56:
          articulo = _context2.sent;
          id_venta = nuevaVenta.id;
          _context2.next = 60;
          return ReciboServicio.CrearRecibo(usuario_id);
        case 60:
          recibo = _context2.sent;
          if (!clienteId) {
            _context2.next = 68;
            break;
          }
          _context2.next = 64;
          return prisma.cliente.findUnique({
            where: {
              id: parseInt(clienteId),
              id_puntoDeVenta: id_puntoDeVenta
            },
            select: {
              email: true,
              nombre: true
            }
          });
        case 64:
          usuarioInfo = _context2.sent;
          cuerpo = (0, _helperVenta.cuerpoVenta)(usuarioInfo.nombre, detallesArticulos, subtotal, total, VImpuesto, vDescuento); // Enviar el correo electrónico
          _context2.next = 68;
          return (0, _SendEmail.envioCorreo)(usuarioInfo.email, "Venta realizada", cuerpo);
        case 68:
          return _context2.abrupt("return", nuevaVenta);
        case 69:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[11, 24, 27, 30]]);
  }));
  return function CrearVenta(_x, _x2, _x3, _x4, _x5, _x6, _x7, _x8) {
    return _ref.apply(this, arguments);
  };
}();

/**
 * Obtiene todas las ventas registradas en la base de datos.
 * 
 * @param {number} usuario_id - El ID del usuario para el que se está listando las ventas.
 * 
 * @returns {Array<Object>} - Una lista de objetos representando todas las ventas.
 * @throws {Error} - Si ocurre un error al buscar las ventas.
 */

var ListarVentas = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(usuario_id) {
    var id_puntoDeVenta, ventas;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return obtenerIdPunto(usuario_id);
        case 2:
          id_puntoDeVenta = _context3.sent;
          _context3.next = 5;
          return prisma.venta.findMany({
            where: {
              puntoDeVenta: {
                id: id_puntoDeVenta
              }
            }
          });
        case 5:
          ventas = _context3.sent;
          return _context3.abrupt("return", ventas);
        case 7:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function ListarVentas(_x10) {
    return _ref3.apply(this, arguments);
  };
}();

/**
 * Obtiene una venta por su ID.
 * 
 * @param {number|string} id - El ID de la venta a buscar.
 * @param {number} usuario_id - El ID del usuario para el que se está listando la venta por ID.
 * 
 * @returns {Object|null} - El objeto representando la venta encontrada, o null si no se encuentra.
 * @throws {Error} - Si el ID no es válido o si ocurre un error durante la búsqueda de la venta.
 */

var ObtenerVentaPorId = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(id, usuario_id) {
    var id_puntoDeVenta, venta;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return obtenerIdPunto(usuario_id);
        case 2:
          id_puntoDeVenta = _context4.sent;
          _context4.next = 5;
          return prisma.venta.findUnique({
            where: {
              id: Number(id),
              puntoDeVenta: {
                id: id_puntoDeVenta
              }
            }
          });
        case 5:
          venta = _context4.sent;
          return _context4.abrupt("return", venta);
        case 7:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return function ObtenerVentaPorId(_x11, _x12) {
    return _ref4.apply(this, arguments);
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
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(usuario_id) {
    var usuario, punto, usuarioExistente;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return prisma.usuario.findFirst({
            where: {
              id: usuario_id
            },
            select: {
              id_puntoDeVenta: true
            }
          });
        case 2:
          usuario = _context5.sent;
          punto = usuario.id_puntoDeVenta;
          _context5.next = 6;
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
          usuarioExistente = _context5.sent;
          if (usuarioExistente) {
            _context5.next = 9;
            break;
          }
          throw new Error("Usuario no encontrado");
        case 9:
          return _context5.abrupt("return", usuarioExistente.id_puntoDeVenta);
        case 10:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return function obtenerIdPunto(_x13) {
    return _ref5.apply(this, arguments);
  };
}();
module.exports = {
  CrearVenta: CrearVenta,
  ListarVentas: ListarVentas,
  ObtenerVentaPorId: ObtenerVentaPorId
};