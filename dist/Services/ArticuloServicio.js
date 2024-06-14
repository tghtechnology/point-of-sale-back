"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.modificarArticulo = exports.listarArticulos = exports.listarArticuloPorId = exports.eliminarArticulo = exports.crearArticulo = void 0;
var _client = require("@prisma/client");
var _UsuarioServicio = require("./UsuarioServicio");
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var prisma = new _client.PrismaClient();

/**
 * Crea un nuevo artículo y lo guarda en la base de datos.
 * 
 * @param {string} nombre - El nombre del artículo. No debe estar vacío.
 * @param {string} tipo_venta - El tipo de venta (Peso o Unidad). Debe ser uno de los valores permitidos.
 * @param {number|string} precio - El precio del artículo. Debe ser un número y no estar vacío.
 * @param {string} representacion - Forma de representar el artículo (color o imagen). Debe ser uno de estos valores.
 * @param {string|null} color - El color del artículo. Requerido si la representación es por color.
 * @param {string|null} imagen - La URL de la imagen del artículo. Requerido si la representación es por imagen.
 * @param {number|string|null} id_categoria - El ID de la categoría del artículo. Puede estar vacío ya que un artículo puede pertenecer a ninguna categoría.
 * @param {number} usuario_id - El ID del usuario para el que se está creando el artículo.
 * @returns {Object} - Objeto representando el artículo creado y formateado (muestra solo los datos necesarios).
 * @throws {Error} - Si algún campo es inválido o está vacío.
 */
var crearArticulo = exports.crearArticulo = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(nombre, tipo_venta, precio, representacion, color, imagen, id_categoria, usuario_id) {
    var TiposPermitidos, usuario, id_punto, id_puntoDeVenta, categoria, ref, newArticulo, articuloSincatFormato, articuloFormato;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          if (!(!nombre || nombre.length < 1)) {
            _context.next = 2;
            break;
          }
          throw new Error("Campo nombre vacío");
        case 2:
          if (!(!tipo_venta || tipo_venta.length < 1)) {
            _context.next = 4;
            break;
          }
          throw new Error("Campo tipo_venta vacío");
        case 4:
          if (!(!precio || precio.length < 1)) {
            _context.next = 6;
            break;
          }
          throw new Error("Campo precio vacío");
        case 6:
          //Validación tipo de venta
          TiposPermitidos = ['Peso', 'Unidad'];
          if (TiposPermitidos.includes(tipo_venta)) {
            _context.next = 9;
            break;
          }
          throw new Error("Tipo de venta no válido");
        case 9:
          _context.next = 11;
          return prisma.usuario.findFirst({
            where: {
              id: usuario_id
            },
            select: {
              nombre: true
            }
          });
        case 11:
          usuario = _context.sent;
          _context.next = 14;
          return prisma.puntoDeVenta.findFirst({
            where: {
              estado: true,
              propietario: usuario.nombre
            },
            select: {
              id: true
            }
          });
        case 14:
          id_punto = _context.sent;
          //Asignar id del punto de venta
          id_puntoDeVenta = id_punto.id;
          _context.next = 18;
          return buscarCategoria(id_categoria, usuario_id);
        case 18:
          categoria = _context.sent;
          if (!(representacion !== 'color' && representacion !== 'imagen')) {
            _context.next = 21;
            break;
          }
          throw new Error("Representacion no valida");
        case 21:
          if (!(representacion === 'color')) {
            _context.next = 25;
            break;
          }
          if (Object.keys(colorMapping).includes(color)) {
            _context.next = 24;
            break;
          }
          throw new Error("Color no valido");
        case 24:
          color = colorMapping[color];
        case 25:
          _context.next = 27;
          return generarRef(usuario_id);
        case 27:
          ref = _context.sent;
          _context.next = 30;
          return prisma.articulo.create({
            data: {
              nombre: nombre,
              tipo_venta: tipo_venta,
              precio: Number(precio),
              ref: ref,
              representacion: representacion,
              color: representacion === 'color' ? color : null,
              imagen: representacion === 'imagen' ? imagen : null,
              id_categoria: id_categoria ? parseInt(id_categoria) : null,
              estado: true,
              id_puntoDeVenta: id_puntoDeVenta
            }
          });
        case 30:
          newArticulo = _context.sent;
          if (!(id_categoria == "" || categoria == null)) {
            _context.next = 36;
            break;
          }
          articuloSincatFormato = {
            id: newArticulo.id,
            nombre: newArticulo.nombre,
            tipo_venta: newArticulo.tipo_venta,
            precio: newArticulo.precio,
            ref: newArticulo.ref,
            color: newArticulo.color,
            imagen: newArticulo.imagen,
            categoria: "Sin categoría",
            id_puntoDeVenta: newArticulo.id_puntoDeVenta
          };
          return _context.abrupt("return", articuloSincatFormato);
        case 36:
          articuloFormato = {
            id: newArticulo.id,
            nombre: newArticulo.nombre,
            tipo_venta: newArticulo.tipo_venta,
            precio: Number(newArticulo.precio),
            ref: newArticulo.ref,
            color: newArticulo.color,
            imagen: newArticulo.imagen,
            id_puntoDeVenta: newArticulo.id_puntoDeVenta
          };
          return _context.abrupt("return", articuloFormato);
        case 38:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function crearArticulo(_x, _x2, _x3, _x4, _x5, _x6, _x7, _x8) {
    return _ref.apply(this, arguments);
  };
}();

/**
 * Lista todos los artículos activos
 * 
 * @param {number} usuario_id - El ID del usuario para el que se está listando los artículos.
 * @returns {Array} - Una lista de objetos representando los artículos activos y sus detalles necesarios.
 * Cada objeto contiene la siguiente información:
 *  - {number} id - El ID único del artículo.
 *  - {string} nombre - El nombre del artículo.
 *  - {string} tipo_venta - El tipo de venta (Peso o Unidad).
 *  - {number} precio - El precio del artículo.
 *  - {string} ref - Referencia única para el artículo.
 *  - {string|null} color - El color del artículo (si aplica).
 *  - {string|null} imagen - La URL de la imagen del artículo (si aplica).
 *  - {Object|string} categoria - La información de la categoría a la que pertenece el artículo.
 *     - Si el artículo tiene una categoría, el objeto contiene:
 *        - {number} id - El ID de la categoría.
 *        - {string} nombre - El nombre de la categoría.
 *        - {string} color - El color de la categoría.
 *     - Si el artículo no tiene una categoría o la categoría no está activa, devuelve "Sin categoría".
 * 
 * @throws {Error} - Si ocurre algún error durante la consulta a la base de datos.
 */
var listarArticulos = exports.listarArticulos = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(usuario_id) {
    var id_puntoDeVenta, articulos, articulosFormato;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return obtenerIdPunto(usuario_id);
        case 2:
          id_puntoDeVenta = _context2.sent;
          _context2.next = 5;
          return prisma.articulo.findMany({
            where: {
              estado: true,
              id_puntoDeVenta: id_puntoDeVenta
            },
            include: {
              categoria: true
            }
          });
        case 5:
          articulos = _context2.sent;
          // Mapear los artículos a un formato deseado
          articulosFormato = articulos.map(function (articulo) {
            // Verificar si la categoría está presente y activa
            var categoria = articulo.categoria && articulo.categoria.estado && articulo.categoria.id_puntoDeVenta ? {
              id: articulo.categoria.id,
              nombre: articulo.categoria.nombre,
              color: articulo.categoria.color,
              id_puntoDeVenta: articulo.categoria.id_puntoDeVenta
            } : "Sin categoría";
            return {
              id: articulo.id,
              nombre: articulo.nombre,
              tipo_venta: articulo.tipo_venta,
              precio: articulo.precio,
              ref: articulo.ref,
              color: articulo.color,
              imagen: articulo.imagen,
              categoria: categoria,
              id_puntoDeVenta: articulo.id_puntoDeVenta
            };
          });
          return _context2.abrupt("return", articulosFormato);
        case 8:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function listarArticulos(_x9) {
    return _ref2.apply(this, arguments);
  };
}();

/**
 * Obtiene la información detallada de un artículo por su ID.
 * 
 * @param {number|string} id - El ID del artículo a buscar.
 * @param {number} usuario_id - El ID del usuario para el que se está listando el artículo por ID.
 * @returns {Object|null} - Devuelve un objeto que representa el artículo con su información detallada, o `null` si el artículo no existe o no está activo.
 * @throws {Error} - Si el ID no es válido o no se puede buscar el artículo.
 * 
 * El objeto devuelto tiene la siguiente estructura:
 * - `id`: El ID del artículo.
 * - `nombre`: El nombre del artículo.
 * - `tipo_venta`: El tipo de venta del artículo (por ejemplo, "Peso" o "Unidad").
 * - `precio`: El precio del artículo.
 * - `ref`: La referencia del artículo.
 * - `color`: El color del artículo, si es representado por color.
 * - `imagen`: La URL de la imagen del artículo, si es representado por imagen.
 * - `categoria`: Un objeto que representa la categoría del artículo o la cadena "Sin categoría" si no tiene categoría. Este objeto incluye:
 *   - `id`: El ID de la categoría.
 *   - `nombre`: El nombre de la categoría.
 *   - `color`: El color de la categoría.
 */

var listarArticuloPorId = exports.listarArticuloPorId = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(id, usuario_id) {
    var id_puntoDeVenta, articulo, categoria, articuloFormato;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return obtenerIdPunto(usuario_id);
        case 2:
          id_puntoDeVenta = _context3.sent;
          _context3.next = 5;
          return prisma.articulo.findUnique({
            where: {
              id: parseInt(id),
              id_puntoDeVenta: id_puntoDeVenta
            },
            include: {
              categoria: true
            }
          });
        case 5:
          articulo = _context3.sent;
          if (articulo) {
            _context3.next = 8;
            break;
          }
          return _context3.abrupt("return", null);
        case 8:
          // Verificar si la categoría está presente y activa
          categoria = articulo.categoria && articulo.categoria.estado && articulo.categoria.id_puntoDeVenta ? {
            id: articulo.categoria.id,
            nombre: articulo.categoria.nombre,
            color: articulo.categoria.color,
            id_puntoDeVenta: articulo.categoria.id_puntoDeVenta
          } : "Sin categoría";
          articuloFormato = {
            id: articulo.id,
            nombre: articulo.nombre,
            tipo_venta: articulo.tipo_venta,
            precio: articulo.precio,
            ref: articulo.ref,
            color: articulo.color,
            imagen: articulo.imagen,
            categoria: categoria,
            id_puntoDeVenta: articulo.id_puntoDeVenta
          };
          return _context3.abrupt("return", articuloFormato);
        case 11:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function listarArticuloPorId(_x10, _x11) {
    return _ref3.apply(this, arguments);
  };
}();

/**
 * Modifica un artículo existente por su ID y devuelve el artículo modificado.
 * 
 * @param {number|string} id - El ID del artículo a modificar.
 * @param {string} nombre - El nuevo nombre para el artículo. No debe estar vacío.
 * @param {string} tipo_venta - El nuevo tipo de venta para el artículo. Debe ser "Peso" o "Unidad".
 * @param {number|string} precio - El nuevo precio del artículo. No debe estar vacío.
 * @param {string|null} color - El nuevo color del artículo. Puede ser `null` si no es necesario.
 * @param {string|null} imagen - La nueva URL de la imagen del artículo. Puede ser `null` si no es necesario.
 * @param {number|string|null} id_categoria - El nuevo ID de la categoría para el artículo. Puede ser `null` si el artículo no tiene categoría.
 * @param {number} usuario_id - El ID del usuario para el que se está modificando el artículo.
 * 
 * @returns {Object|null} - Devuelve un objeto representando el artículo modificado, o `null` si el artículo con el ID dado no existe o no está activo.
 * 
 * @throws {Error} - Si el nombre, tipo_venta, o precio están vacíos, o si el tipo_venta no es válido.
 * 
 * El objeto devuelto tiene la siguiente estructura:
 * - `id`: El ID del artículo.
 * - `nombre`: El nuevo nombre del artículo.
 * - `tipo_venta`: El nuevo tipo de venta del artículo.
 * - `precio`: El nuevo precio del artículo.
 * - `ref`: La referencia del artículo.
 * - `color`: El nuevo color del artículo.
 * - `imagen`: La nueva URL de la imagen del artículo.
 * - `categoria`: La nueva categoría del artículo. Puede ser un objeto con:
 *   - `id`: El ID de la categoría.
 *   - `nombre`: El nombre de la categoría.
 *   - `color`: El color de la categoría.
 */
var modificarArticulo = exports.modificarArticulo = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(id, nombre, tipo_venta, precio, representacion, color, imagen, id_categoria, usuario_id) {
    var TiposPermitidos, id_puntoDeVenta, articuloExistente, categoria, articulo, articuloFormato;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          if (!(!nombre || nombre.length < 1)) {
            _context4.next = 2;
            break;
          }
          throw new Error("Campo nombre vacío");
        case 2:
          if (!(!tipo_venta || tipo_venta.length < 1)) {
            _context4.next = 4;
            break;
          }
          throw new Error("Campo tipo_venta vacío");
        case 4:
          if (!(!precio || precio.length < 1)) {
            _context4.next = 6;
            break;
          }
          throw new Error("Campo precio vacío");
        case 6:
          // Validación tipo de venta
          TiposPermitidos = ['Peso', 'Unidad'];
          if (TiposPermitidos.includes(tipo_venta)) {
            _context4.next = 9;
            break;
          }
          throw new Error("Tipo de venta no válido");
        case 9:
          _context4.next = 11;
          return obtenerIdPunto(usuario_id);
        case 11:
          id_puntoDeVenta = _context4.sent;
          _context4.next = 14;
          return prisma.articulo.findFirst({
            where: {
              id: parseInt(id),
              estado: true,
              id_puntoDeVenta: id_puntoDeVenta
            }
          });
        case 14:
          articuloExistente = _context4.sent;
          if (articuloExistente) {
            _context4.next = 17;
            break;
          }
          throw new Error("Artículo no encontrado");
        case 17:
          if (!(representacion !== 'color' && representacion !== 'imagen')) {
            _context4.next = 19;
            break;
          }
          throw new Error("Representación no válida");
        case 19:
          if (!(representacion === 'color')) {
            _context4.next = 23;
            break;
          }
          if (Object.keys(colorMapping).includes(color)) {
            _context4.next = 22;
            break;
          }
          throw new Error("Color no válido");
        case 22:
          color = colorMapping[color];
        case 23:
          // Si id_categoria está presente, verificar si la categoría existe
          categoria = null;
          if (!(id_categoria && id_categoria !== "")) {
            _context4.next = 28;
            break;
          }
          _context4.next = 27;
          return buscarCategoria(id_categoria, usuario_id);
        case 27:
          categoria = _context4.sent;
        case 28:
          _context4.next = 30;
          return prisma.articulo.update({
            where: {
              id: parseInt(id)
            },
            data: {
              nombre: nombre,
              tipo_venta: tipo_venta,
              precio: Number(precio),
              representacion: representacion,
              color: representacion === 'color' ? color : null,
              imagen: representacion === 'imagen' ? imagen : null,
              id_categoria: id_categoria ? parseInt(id_categoria) : null
            }
          });
        case 30:
          articulo = _context4.sent;
          articuloFormato = {
            id: articulo.id,
            nombre: articulo.nombre,
            tipo_venta: articulo.tipo_venta,
            precio: Number(articulo.precio),
            ref: articulo.ref,
            representacion: articulo.representacion,
            color: articulo.color,
            imagen: articulo.imagen,
            categoria: categoria ? {
              id: categoria.id,
              nombre: categoria.nombre,
              color: categoria.color,
              id_puntoDeVenta: categoria.id_puntoDeVenta
            } : "Sin categoría",
            id_puntoDeVenta: articulo.id_puntoDeVenta
          };
          return _context4.abrupt("return", articuloFormato);
        case 33:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return function modificarArticulo(_x12, _x13, _x14, _x15, _x16, _x17, _x18, _x19, _x20) {
    return _ref4.apply(this, arguments);
  };
}();

/**
 * Elimina (desactiva) un artículo existente cambiando su estado a 'false'.
 *
 * @param {number|string} id - El ID del artículo a eliminar. Debe ser un valor numérico.
 * @param {number} usuario_id - El ID del usuario para el que se está eliminando el artículo.
 * 
 * @returns {Object|null} - El objeto del artículo actualizado con el estado cambiado a 'false', o `null` si no se encuentra un artículo con el ID dado.
 * @throws {Error} - Si el ID no es válido o no se puede desactivar el artículo.
 *
 * Este método no elimina físicamente el artículo de la base de datos, sino que cambia su estado para indicar que ha sido eliminado.
 */
var eliminarArticulo = exports.eliminarArticulo = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(id, usuario_id) {
    var id_puntoDeVenta, articuloExistente, articulo;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return obtenerIdPunto(usuario_id);
        case 2:
          id_puntoDeVenta = _context5.sent;
          _context5.next = 5;
          return prisma.articulo.findFirst({
            where: {
              id: parseInt(id),
              estado: true,
              id_puntoDeVenta: id_puntoDeVenta
            }
          });
        case 5:
          articuloExistente = _context5.sent;
          if (articuloExistente) {
            _context5.next = 8;
            break;
          }
          return _context5.abrupt("return", null);
        case 8:
          _context5.next = 10;
          return prisma.articulo.update({
            where: {
              id: parseInt(id)
            },
            data: {
              estado: false
            }
          });
        case 10:
          articulo = _context5.sent;
        case 11:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return function eliminarArticulo(_x21, _x22) {
    return _ref5.apply(this, arguments);
  };
}();

/**
 * Busca una categoría por su ID y devuelve sus detalles.
 *
 * @param {number|string} id_categoria - El ID de la categoría a buscar. Debe ser un valor numérico.
 * @param {number} usuario_id - El ID del usuario para el que se está buscando la categoria.
 * 
 * @returns {Object|null} - Un objeto que contiene los detalles de la categoría encontrada (ID, nombre, color) o `null` si el ID de la categoría es una cadena vacía.
 * @throws {Error} - Si la categoría con el ID especificado no existe o si el estado de la categoría es `false`.
 * 
 * Este método busca una categoría activa por su ID. Si la categoría está inactiva o no existe, lanza un error.
 */
var buscarCategoria = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(id_categoria, usuario_id) {
    var id_puntoDeVenta, categoriaExistente;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return obtenerIdPunto(usuario_id);
        case 2:
          id_puntoDeVenta = _context6.sent;
          if (!(id_categoria === "")) {
            _context6.next = 5;
            break;
          }
          return _context6.abrupt("return", null);
        case 5:
          _context6.next = 7;
          return prisma.categoria.findUnique({
            where: {
              id: parseInt(id_categoria),
              estado: true,
              id_puntoDeVenta: id_puntoDeVenta
            }
          });
        case 7:
          categoriaExistente = _context6.sent;
          if (categoriaExistente) {
            _context6.next = 10;
            break;
          }
          throw new Error("Categoría inexistente");
        case 10:
          return _context6.abrupt("return", categoriaExistente);
        case 11:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  }));
  return function buscarCategoria(_x23, _x24) {
    return _ref6.apply(this, arguments);
  };
}();

/**
 * Genera un nuevo valor de referencia para un artículo basado en el último ID de venta.
 *
 * La referencia se genera tomando el último ID de venta conocido y agregando 1000 a este.
 * El formato final es "#1-{nuevo_id}", donde "nuevo_id" es el último ID de venta más 1000.
 *
 * @param {number} usuario_id - El ID del usuario para el que se está generando la referencia.
 * @returns {string} - La nueva referencia generada.
 * @throws {Error} - Si hay un problema al obtener el último ID de venta o al generar la referencia.
 */

var generarRef = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(usuario_id) {
    var id_puntoDeVenta, ultimoArticulo, ultimoArticuloID, nuevoRef;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _context7.next = 3;
          return obtenerIdPunto(usuario_id);
        case 3:
          id_puntoDeVenta = _context7.sent;
          _context7.next = 6;
          return prisma.articulo.findFirst({
            where: {
              id_puntoDeVenta: id_puntoDeVenta
            },
            orderBy: {
              id: "desc"
            }
          });
        case 6:
          ultimoArticulo = _context7.sent;
          ultimoArticuloID = ultimoArticulo ? parseInt(ultimoArticulo.ref.split('-')[1]) : 999;
          nuevoRef = "#".concat(id_puntoDeVenta, "-").concat(ultimoArticuloID + 1);
          return _context7.abrupt("return", nuevoRef);
        case 12:
          _context7.prev = 12;
          _context7.t0 = _context7["catch"](0);
          console.error("Error al generar el valor de ref:", _context7.t0);
          throw _context7.t0;
        case 16:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[0, 12]]);
  }));
  return function generarRef(_x25) {
    return _ref7.apply(this, arguments);
  };
}();

//Mapeo de colores de hexadecimal a string
var colorMapping = {
  '#FF0000': 'Rojo',
  '#00FF00': 'Verde_limon',
  '#0000FF': 'Azul',
  '#FFFF00': 'Amarillo',
  '#00FFFF': 'Turquesa',
  '#FF00FF': 'Fucsia',
  '#C0C0C0': 'Gris_claro',
  '#808080': 'Gris_oscuro'
};
// Mapeo inverso de nombres de colores a hexadecimal
var nameToHexMapping = {
  'Rojo': '#FF0000',
  'Verde_limon': '#00FF00',
  'Azul': '#0000FF',
  'Amarillo': '#FFFF00',
  'Turquesa': '#00FFFF',
  'Fucsia': '#FF00FF',
  'Gris_claro': '#C0C0C0',
  'Gris_oscuro': '#808080'
};

/**
 * Obtiene el ID del punto de venta asociado a un usuario.
 *
 * @param {number|string} usuario_id - El ID del usuario para el que se quiere obtener el ID del punto de venta.
 * @returns {number} - El ID del punto de venta asociado al usuario.
 * @throws {Error} - Si no se encuentra el usuario o no está asociado a un punto de venta.
 */
var obtenerIdPunto = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(usuario_id) {
    var usuario, punto, usuarioExistente;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.next = 2;
          return prisma.usuario.findFirst({
            where: {
              id: usuario_id
            },
            select: {
              id_puntoDeVenta: true
            }
          });
        case 2:
          usuario = _context8.sent;
          punto = usuario.id_puntoDeVenta;
          _context8.next = 6;
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
          usuarioExistente = _context8.sent;
          if (usuarioExistente) {
            _context8.next = 9;
            break;
          }
          throw new Error("Usuario no encontrado");
        case 9:
          return _context8.abrupt("return", usuarioExistente.id_puntoDeVenta);
        case 10:
        case "end":
          return _context8.stop();
      }
    }, _callee8);
  }));
  return function obtenerIdPunto(_x26) {
    return _ref8.apply(this, arguments);
  };
}();