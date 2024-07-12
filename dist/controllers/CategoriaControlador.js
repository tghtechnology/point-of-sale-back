"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.obtenerCategoriaPorId = exports.listarCategorias = exports.eliminarCategoria = exports.crearCategoria = exports.actualizarCategoria = void 0;
var CategoriaServicio = _interopRequireWildcard(require("../Services/CategoriaServicio"));
var _CategoryValidation = require("../Utils/Validations/CategoryValidation");
var _zod = require("zod");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
/**
 * Crea una nueva categoría.
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 * @param {string} req.body.nombre - El nombre de la categoría.
 * @param {string} req.body.color - El color de la categoría.
 * @param {number} req.usuario.id - ID del usuario autenticado.
 * @returns {Object} - La nueva categoría creada.
 * @throws {Error} - Devuelve un error si hay un problema al crear la categoría en la base de datos.
 */
var crearCategoria = exports.crearCategoria = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var usuario_id, dv, newCategoria, errores;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          usuario_id = req.usuario.id;
          dv = _CategoryValidation.createCategorySchema.parse(req.body);
          _context.next = 5;
          return CategoriaServicio.crearCategoria(dv.nombre, dv.color, usuario_id);
        case 5:
          newCategoria = _context.sent;
          res.status(201).json(newCategoria);
          _context.next = 16;
          break;
        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](0);
          if (!(_context.t0 instanceof _zod.z.ZodError)) {
            _context.next = 14;
            break;
          }
          errores = _context.t0.errors.map(function (err) {
            return {
              path: err.path[0],
              message: err.message
            };
          });
          return _context.abrupt("return", res.status(400).json(errores));
        case 14:
          console.error(_context.t0);
          res.status(500).json({
            error: 'Ocurrió un error al crear la categoría'
          });
        case 16:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 9]]);
  }));
  return function crearCategoria(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

/**
 * Obtiene una lista de todas las categorías almacenadas en la base de datos.
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 * @param {number} req.usuario.id - ID del usuario autenticado.
 * @returns {Array<Object>}  - Una lista de todas las categorías.
 * @throws {Error} - Devuelve un error si hay un problema al obtener la lista de categorías de la base de datos.
 */
var listarCategorias = exports.listarCategorias = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var usuario_id, categorias;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          usuario_id = req.usuario.id;
          _context2.next = 4;
          return CategoriaServicio.listarCategorias(usuario_id);
        case 4:
          categorias = _context2.sent;
          res.status(200).json(categorias);
          _context2.next = 12;
          break;
        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2["catch"](0);
          console.error(_context2.t0);
          res.status(500).json({
            mensaje: 'Error al crear la categoría'
          });
        case 12:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 8]]);
  }));
  return function listarCategorias(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

/**
 * Obtiene una categoría por su ID.
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 * @param {number} req.params.id - El ID de la categoría.
 * @param {number} req.usuario.id - ID del usuario autenticado.
 * @returns {Object} - La categoría encontrada.
 * @throws {Error} - Devuelve un error si el ID de la categoría está vacío o si hay un problema al buscar la categoría en la base de datos.
 */
var obtenerCategoriaPorId = exports.obtenerCategoriaPorId = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var dv, usuario_id, categoria, errores;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          dv = _CategoryValidation.idSchema.parse(req.params);
          usuario_id = req.usuario.id;
          _context3.next = 5;
          return CategoriaServicio.listarCategoriaPorId(dv.id, usuario_id);
        case 5:
          categoria = _context3.sent;
          if (!(categoria == null)) {
            _context3.next = 8;
            break;
          }
          return _context3.abrupt("return", res.status(400).json({
            error: "No se encontró la categoria"
          }));
        case 8:
          res.status(200).json(categoria);
          _context3.next = 18;
          break;
        case 11:
          _context3.prev = 11;
          _context3.t0 = _context3["catch"](0);
          if (!(_context3.t0 instanceof _zod.z.ZodError)) {
            _context3.next = 16;
            break;
          }
          errores = _context3.t0.errors.map(function (err) {
            return {
              path: err.path[0],
              message: err.message
            };
          });
          return _context3.abrupt("return", res.status(400).json({
            errores: errores
          }));
        case 16:
          console.error(_context3.t0);
          res.status(500).json({
            error: 'Error al obtener la categoría'
          });
        case 18:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 11]]);
  }));
  return function obtenerCategoriaPorId(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

/**
 * Actualiza una categoría existente en la base de datos.
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 * @param {number} req.params.id - El ID de la categoría a actualizar.
 * @param {string} req.body.nombre - El nuevo nombre de la categoría.
 * @param {string} req.body.color - El nuevo color de la categoría.
 * @param {number} req.usuario.id - ID del usuario autenticado.
 * @returns {Object} - La categoría actualizada.
 * @throws {Error} - Devuelve un error si el ID de la categoría está vacío, si el nombre o el color de la categoría están vacíos, si la categoría ya existe o si hay un problema al actualizar la categoría.
 */
var actualizarCategoria = exports.actualizarCategoria = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var usuario_id, dv, categoria, errores;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          usuario_id = req.usuario.id;
          dv = _CategoryValidation.editCategorySchema.parse({
            id: req.params.id,
            nombre: req.body.nombre,
            color: req.body.color
          });
          _context4.next = 5;
          return CategoriaServicio.modificarCategoria(dv.id, dv.nombre, dv.color, usuario_id);
        case 5:
          categoria = _context4.sent;
          if (!(categoria == null)) {
            _context4.next = 8;
            break;
          }
          return _context4.abrupt("return", res.status(400).json({
            error: "No se encontró la categoria"
          }));
        case 8:
          res.status(200).json(categoria);
          _context4.next = 18;
          break;
        case 11:
          _context4.prev = 11;
          _context4.t0 = _context4["catch"](0);
          if (!(_context4.t0 instanceof _zod.z.ZodError)) {
            _context4.next = 16;
            break;
          }
          errores = _context4.t0.errors.map(function (err) {
            return {
              path: err.path[0],
              message: err.message
            };
          });
          return _context4.abrupt("return", res.status(400).json({
            errores: errores
          }));
        case 16:
          console.error(_context4.t0);
          res.status(500).json({
            mensaje: 'Error al editar la categoría'
          });
        case 18:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 11]]);
  }));
  return function actualizarCategoria(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

/**
 * Elimina una categoría por su ID.
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 * @param {number} req.params.id - El ID de la categoría a eliminar.
 * @param {number} req.usuario.id - ID del usuario autenticado.
 * @returns {Object} - Un mensaje de confirmación de que la categoría se ha eliminado correctamente.
 * @throws {Error} - Devuelve un error si el ID de la categoría está vacío o si hay un problema al eliminar la categoría.
 */
var eliminarCategoria = exports.eliminarCategoria = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    var dv, usuario_id, categoria, errores;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          dv = _CategoryValidation.idSchema.parse(req.params);
          usuario_id = req.usuario.id;
          _context5.next = 5;
          return CategoriaServicio.eliminarCategoria(dv.id, usuario_id);
        case 5:
          categoria = _context5.sent;
          if (!(categoria == null)) {
            _context5.next = 8;
            break;
          }
          return _context5.abrupt("return", res.status(400).json({
            error: "No se encontró la categoria"
          }));
        case 8:
          res.status(200).json({
            message: 'Categoría eliminada correctamente'
          });
          _context5.next = 18;
          break;
        case 11:
          _context5.prev = 11;
          _context5.t0 = _context5["catch"](0);
          if (!(_context5.t0 instanceof _zod.z.ZodError)) {
            _context5.next = 16;
            break;
          }
          errores = _context5.t0.errors.map(function (err) {
            return {
              path: err.path[0],
              message: err.message
            };
          });
          return _context5.abrupt("return", res.status(400).json({
            errores: errores
          }));
        case 16:
          console.error(_context5.t0);
          res.status(500).json({
            mensaje: 'Error al editar la categoría'
          });
        case 18:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 11]]);
  }));
  return function eliminarCategoria(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();