"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.obtenerArticuloPorId = exports.listarArticulos = exports.eliminarArticulo = exports.crearArticulo = exports.actualizarArticulo = void 0;
var ArticuloServicio = _interopRequireWildcard(require("../Services/ArticuloServicio"));
var _cloudinary = require("../Utils/cloudinary.js");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
/**
 * Crea un nuevo artículo en la tabla articulo.
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 * @param {string} req.body.nombre - El nombre del artículo.
 * @param {string} req.body.tipo_venta - El tipo de venta del artículo.
 * @param {float} req.body.precio - El precio del artículo.
 * @param {string} req.body.color - El color del artículo.
 * @param {number} req.body.id_categoria - El ID de la categoría del artículo.
 * @param {string} req.body.imagen - La URL de la imagen del artículo.
 * @param {number} req.usuario.id - ID del usuario autenticado.
 * @returns {Object} - El nuevo artículo creado.
 * @throws {Error} - Devuelve un error si falta algún campo obligatorio o si hay un problema al crear el artículo.
 */

var crearArticulo = exports.crearArticulo = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var _req$files, usuario_id, _req$body, nombre, tipo_venta, precio, representacion, color, id_categoria, imagen, result, newArticulo;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          usuario_id = req.usuario.id;
          _req$body = req.body, nombre = _req$body.nombre, tipo_venta = _req$body.tipo_venta, precio = _req$body.precio, representacion = _req$body.representacion, color = _req$body.color, id_categoria = _req$body.id_categoria;
          imagen = req.body.imagen; //Subir imagen
          if (!((_req$files = req.files) !== null && _req$files !== void 0 && _req$files.imagen)) {
            _context.next = 9;
            break;
          }
          _context.next = 7;
          return (0, _cloudinary.uploadImage)(req.files.imagen.tempFilePath);
        case 7:
          result = _context.sent;
          imagen = result.secure_url;
        case 9:
          _context.next = 11;
          return ArticuloServicio.crearArticulo(nombre, tipo_venta, precio, representacion, color, imagen, id_categoria, usuario_id);
        case 11:
          newArticulo = _context.sent;
          res.status(201).json(newArticulo);
          _context.next = 51;
          break;
        case 15:
          _context.prev = 15;
          _context.t0 = _context["catch"](0);
          if (!(_context.t0.message === "Campo nombre vacío")) {
            _context.next = 21;
            break;
          }
          return _context.abrupt("return", res.status(400).json({
            error: "El campo nombre no puede estar vacío"
          }));
        case 21:
          if (!(_context.t0.message === "Campo tipo_venta vacío")) {
            _context.next = 25;
            break;
          }
          return _context.abrupt("return", res.status(400).json({
            error: "El campo tipo de venta no puede estar vacío"
          }));
        case 25:
          if (!(_context.t0.message === "Campo precio vacío")) {
            _context.next = 29;
            break;
          }
          return _context.abrupt("return", res.status(400).json({
            error: "El campo precio no puede estar vacío"
          }));
        case 29:
          if (!(_context.t0.message === "Representacion no valida")) {
            _context.next = 33;
            break;
          }
          return _context.abrupt("return", res.status(400).json({
            error: "El campo representacion no es válido"
          }));
        case 33:
          if (!(_context.t0.message === "Precio no es número válido")) {
            _context.next = 37;
            break;
          }
          return _context.abrupt("return", res.status(400).json({
            error: "El campo precio solo puede ser un número"
          }));
        case 37:
          if (!(_context.t0.message === "Tipo de venta no válido")) {
            _context.next = 41;
            break;
          }
          return _context.abrupt("return", res.status(400).json({
            error: "El tipo de venta no es válido"
          }));
        case 41:
          if (!(_context.t0.message === "Categoría inexistente")) {
            _context.next = 45;
            break;
          }
          return _context.abrupt("return", res.status(400).json({
            error: "La categoría no existe"
          }));
        case 45:
          if (!(_context.t0.message === "Color no valido")) {
            _context.next = 49;
            break;
          }
          return _context.abrupt("return", res.status(400).json({
            error: "El color no es válido"
          }));
        case 49:
          console.error(_context.t0);
          res.status(500).json({
            mensaje: 'Error al crear el artículo'
          });
        case 51:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 15]]);
  }));
  return function crearArticulo(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

/**
 * Obtiene una lista de todos los artículos almacenados en la base de datos.
 * @param {Object} req - La solicitud HTTP (no utilizado).
 * @param {Object} res - La respuesta HTTP.
 * @param {number} req.usuario.id - ID del usuario autenticado.
 * @returns {Array<Object>}  - Una lista de todos los artículos.
 * @throws {Error} - Devuelve un error si hay un problema al obtener la lista de artículos de la base de datos.
 */
var listarArticulos = exports.listarArticulos = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var usuario_id, articulos;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          usuario_id = req.usuario.id;
          _context2.next = 4;
          return ArticuloServicio.listarArticulos(usuario_id);
        case 4:
          articulos = _context2.sent;
          res.status(200).json(articulos);
          _context2.next = 12;
          break;
        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2["catch"](0);
          console.error(_context2.t0);
          res.status(500).json({
            mensaje: 'Error al listar el artículo'
          });
        case 12:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 8]]);
  }));
  return function listarArticulos(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

/**
 * Obtiene un artículo de la base de datos por su ID.
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 * @param {number} req.params.id - El ID del artículo a buscar.
 * @param {number} req.usuario.id - ID del usuario autenticado.
 * @returns {Object} - El artículo encontrado.
 * @throws {Error} - Devuelve un error si no se encuentra el artículo con el ID especificado.
 */
var obtenerArticuloPorId = exports.obtenerArticuloPorId = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var id, usuario_id, articulo;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          id = req.params.id;
          usuario_id = req.usuario.id;
          _context3.next = 5;
          return ArticuloServicio.listarArticuloPorId(id, usuario_id);
        case 5:
          articulo = _context3.sent;
          if (!(articulo == null)) {
            _context3.next = 8;
            break;
          }
          return _context3.abrupt("return", res.status(400).json({
            error: "No se encontró el artículo"
          }));
        case 8:
          res.status(200).json(articulo);
          _context3.next = 15;
          break;
        case 11:
          _context3.prev = 11;
          _context3.t0 = _context3["catch"](0);
          console.error(_context3.t0);
          res.status(500).json({
            mensaje: 'Error al listar el artículo'
          });
        case 15:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 11]]);
  }));
  return function obtenerArticuloPorId(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

/**
 * Actualiza un artículo existente en la base de datos.
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 * @param {number} req.params.id - El ID del artículo a actualizar.
 * @param {string} req.body.nombre - El nuevo nombre del artículo.
 * @param {string} req.body.tipo_venta - El nuevo tipo de venta del artículo.
 * @param {float} req.body.precio - El nuevo precio del artículo.
 * @param {string} req.body.color - El nuevo color del artículo.
 * @param {number} req.body.id_categoria - El nuevo ID de la categoría del artículo.
 * @param {string} req.body.imagen - La nueva URL de la imagen del artículo (opcional).
 * @param {number} req.usuario.id - ID del usuario autenticado.
 * @returns {Object} - El artículo actualizado.
 * @throws {Error} - Devuelve un error si hay un problema al actualizar el artículo en la base de datos.
 */
var actualizarArticulo = exports.actualizarArticulo = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var _req$files2, id, usuario_id, _req$body2, nombre, tipo_venta, precio, representacion, color, id_categoria, imagen, ImgId, result, newImagen, articulo;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          id = req.params.id;
          usuario_id = req.usuario.id;
          _req$body2 = req.body, nombre = _req$body2.nombre, tipo_venta = _req$body2.tipo_venta, precio = _req$body2.precio, representacion = _req$body2.representacion, color = _req$body2.color, id_categoria = _req$body2.id_categoria;
          imagen = req.body.imagen; //Quitar imagen
          if (!(imagen !== '')) {
            _context4.next = 11;
            break;
          }
          ImgId = imagen;
          if (!ImgId) {
            _context4.next = 11;
            break;
          }
          _context4.next = 10;
          return (0, _cloudinary.deleteImage)(imagen);
        case 10:
          result = _context4.sent;
        case 11:
          if (!((_req$files2 = req.files) !== null && _req$files2 !== void 0 && _req$files2.imagen)) {
            _context4.next = 16;
            break;
          }
          _context4.next = 14;
          return (0, _cloudinary.uploadImage)(req.files.imagen.tempFilePath);
        case 14:
          newImagen = _context4.sent;
          imagen = newImagen.secure_url;
        case 16:
          _context4.next = 18;
          return ArticuloServicio.modificarArticulo(id, nombre, tipo_venta, precio, representacion, color, imagen, id_categoria, usuario_id);
        case 18:
          articulo = _context4.sent;
          if (!(articulo == null)) {
            _context4.next = 21;
            break;
          }
          return _context4.abrupt("return", res.status(400).json({
            error: "No se encontró el artículo"
          }));
        case 21:
          res.status(200).json(articulo);
          _context4.next = 52;
          break;
        case 24:
          _context4.prev = 24;
          _context4.t0 = _context4["catch"](0);
          if (!(_context4.t0.message === "Campo nombre vacío")) {
            _context4.next = 30;
            break;
          }
          return _context4.abrupt("return", res.status(400).json({
            error: "El campo nombre no puede estar vacío"
          }));
        case 30:
          if (!(_context4.t0.message === "Campo tipo_venta  vacío")) {
            _context4.next = 34;
            break;
          }
          return _context4.abrupt("return", res.status(400).json({
            error: "El campo tipo de venta no puede estar vacío"
          }));
        case 34:
          if (!(_context4.t0.message === "Campo precio vacío")) {
            _context4.next = 38;
            break;
          }
          return _context4.abrupt("return", res.status(400).json({
            error: "El campo precio no puede estar vacío"
          }));
        case 38:
          if (!(_context4.t0.message === "Campo representacion vacío")) {
            _context4.next = 42;
            break;
          }
          return _context4.abrupt("return", res.status(400).json({
            error: "El campo representacion no puede estar vacío"
          }));
        case 42:
          if (!(_context4.t0.message === "Precio no es un número válido")) {
            _context4.next = 46;
            break;
          }
          return _context4.abrupt("return", res.status(400).json({
            error: "El campo precio solo puede ser un número"
          }));
        case 46:
          if (!(_context4.t0.message === "Tipo de venta no válido")) {
            _context4.next = 50;
            break;
          }
          return _context4.abrupt("return", res.status(400).json({
            error: "El tipo de venta no es válido"
          }));
        case 50:
          console.error(_context4.t0);
          res.status(500).json({
            mensaje: 'Error al editar el artículo'
          });
        case 52:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 24]]);
  }));
  return function actualizarArticulo(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

/**
 * Elimina un artículo de la base de datos por su ID.
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 * @param {number} req.params.id - El ID del artículo a eliminar.
 * @param {number} req.usuario.id - ID del usuario autenticado.
 * @returns {Object} - Un mensaje de confirmación de que el artículo fue eliminado correctamente.
 * @throws {Error} - Devuelve un error si no se encuentra el artículo con el ID especificado o si hay un problema al eliminarlo.
 */
var eliminarArticulo = exports.eliminarArticulo = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    var id, usuario_id, articulo;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          id = req.params.id;
          usuario_id = req.usuario.id;
          _context5.next = 5;
          return ArticuloServicio.eliminarArticulo(id, usuario_id);
        case 5:
          articulo = _context5.sent;
          res.status(200).json({
            message: 'Artículo eliminado correctamente'
          });
          _context5.next = 13;
          break;
        case 9:
          _context5.prev = 9;
          _context5.t0 = _context5["catch"](0);
          console.error(_context5.t0);
          res.status(500).json({
            mensaje: 'Error al crear el artículo'
          });
        case 13:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 9]]);
  }));
  return function eliminarArticulo(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();