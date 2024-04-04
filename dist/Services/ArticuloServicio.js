"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.crearArticulo = void 0;
var _client = require("@prisma/client");
var CategoriaServicio = _interopRequireWildcard(require("../Services/CategoriaServicio"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var prisma = new _client.PrismaClient();

//Crear un nuevo artículo
var crearArticulo = exports.crearArticulo = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(nombre, tipo_venta, precio, coste, ref, representacion, nombre_categoria, categoriaNueva) {
    var text_id, articulo, categoria, categoriaFormato, articuloFormato;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          text_id = stringTransform(nombre); //Se crea el nuevo artículo
          _context.next = 3;
          return prisma.articulo.create({
            data: {
              text_id: text_id,
              nombre: nombre,
              tipo_venta: tipo_venta,
              precio: precio,
              coste: coste,
              ref: ref,
              representacion: representacion,
              nombre_categoria: nombre_categoria,
              estado: true
            }
          });
        case 3:
          articulo = _context.sent;
          _context.next = 6;
          return prisma.categoria.findUnique({
            where: {
              text_id: nombre_categoria
            },
            select: {
              text_id: text_id,
              nombre: true,
              color: true
            }
          });
        case 6:
          categoria = _context.sent;
          categoriaFormato = {
            text_id: text_id,
            nombre: categoria.nombre,
            color: categoria.color
          };
          articuloFormato = {
            text_id: text_id,
            nombre: articulo.nombre,
            tipo_venta: articulo.tipo_venta,
            precio: articulo.precio,
            coste: articulo.coste,
            ref: articulo.ref,
            representacion: articulo.representacion,
            categoria: categoriaFormato
          };
          console.log(articuloFormato);
          return _context.abrupt("return", articuloFormato);
        case 11:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function crearArticulo(_x, _x2, _x3, _x4, _x5, _x6, _x7, _x8) {
    return _ref.apply(this, arguments);
  };
}();

//Listar todos los artículosS
var listarArticulos = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
    var articulos, articulosFormato;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return prisma.articulo.findMany({
            where: {
              estado: true
            },
            include: {
              //Incluye la información de categoría
              categoria: true
            }
          });
        case 2:
          articulos = _context2.sent;
          articulosFormato = articulos.map(function (articulo) {
            var categoria = articulo.categoria;
            var categoriaFormateada = {
              text_id: categoria.text_id,
              nombre: categoria.nombre,
              color: categoria.color
            };
            return {
              text_id: articulo.text_id,
              nombre: articulo.nombre,
              tipo_venta: articulo.tipo_venta,
              precio: articulo.precio,
              coste: articulo.coste,
              ref: articulo.ref,
              representacion: articulo.representacion,
              categoria: categoriaFormateada
            };
          });
          return _context2.abrupt("return", articulosFormato);
        case 5:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function listarArticulos() {
    return _ref2.apply(this, arguments);
  };
}();

//Listar un artículo con id
var listarArticuloPorId = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(text_id) {
    var articulo, categoria, categoriaFormateada, articuloFormato;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return prisma.articulo.findUnique({
            where: {
              text_id: text_id,
              estado: true
            },
            include: {
              //Incluye la información de categoría
              categoria: {
                select: {
                  text_id: true,
                  nombre: true,
                  color: true
                }
              }
            }
          });
        case 2:
          articulo = _context3.sent;
          if (!(articulo == null)) {
            _context3.next = 5;
            break;
          }
          return _context3.abrupt("return", false);
        case 5:
          categoria = articulo.categoria;
          categoriaFormateada = {
            text_id: text_id,
            nombre: categoria.nombre,
            color: categoria.color
          }; //Formato del JSON de la respuesta
          articuloFormato = {
            text_id: text_id,
            nombre: articulo.nombre,
            tipo_venta: articulo.tipo_venta,
            precio: articulo.precio,
            coste: articulo.coste,
            ref: articulo.ref,
            representacion: articulo.representacion,
            categoria: categoriaFormateada
          };
          return _context3.abrupt("return", articuloFormato);
        case 9:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function listarArticuloPorId(_x9) {
    return _ref3.apply(this, arguments);
  };
}();

//Modificar un artículo
var modificarArticulo = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(text_id, nombre, tipo_venta, precio, coste, ref, representacion, nombre_categoria, color_categoria, categoriaNueva) {
    var articuloExistente, nuevoArticulo, categoria, categoriaFormato, articuloModificadoFormato;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return prisma.articulo.findUnique({
            where: {
              text_id: text_id
            }
          });
        case 2:
          articuloExistente = _context4.sent;
          if (articuloExistente) {
            _context4.next = 5;
            break;
          }
          return _context4.abrupt("return", null);
        case 5:
          _context4.next = 7;
          return prisma.articulo.update({
            where: {
              text_id: text_id,
              estado: true
            },
            data: {
              text_id: text_id = stringTransform(nombre),
              nombre: nombre,
              tipo_venta: tipo_venta,
              precio: precio,
              coste: coste,
              ref: ref,
              representacion: representacion,
              nombre_categoria: nombre_categoria,
              estado: true
            }
          });
        case 7:
          nuevoArticulo = _context4.sent;
          _context4.next = 10;
          return prisma.categoria.findUnique({
            where: {
              text_id: nombre_categoria
            },
            select: {
              text_id: text_id,
              nombre: true,
              color: true
            }
          });
        case 10:
          categoria = _context4.sent;
          categoriaFormato = {
            text_id: text_id,
            nombre: categoria.nombre,
            color: categoria.color
          };
          articuloModificadoFormato = {
            text_id: nuevoArticulo.text_id,
            nombre: nuevoArticulo.nombre,
            tipo_venta: nuevoArticulo.tipo_venta,
            precio: nuevoArticulo.precio,
            coste: nuevoArticulo.coste,
            ref: nuevoArticulo.ref,
            representacion: nuevoArticulo.representacion,
            categoria: categoriaFormato
          };
          return _context4.abrupt("return", articuloModificadoFormato);
        case 14:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return function modificarArticulo(_x10, _x11, _x12, _x13, _x14, _x15, _x16, _x17, _x18, _x19) {
    return _ref4.apply(this, arguments);
  };
}();

//Eliminar un artículo
var eliminarArticulo = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(text_id) {
    var articulo;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return prisma.articulo["delete"]({
            where: {
              text_id: text_id,
              estado: true
            }
          });
        case 2:
          articulo = _context5.sent;
          return _context5.abrupt("return", articulo);
        case 4:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return function eliminarArticulo(_x20) {
    return _ref5.apply(this, arguments);
  };
}();

//Función para obtener los datos de categoría por nombre
var obtenerCategoria = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(nombre_categoria) {
    var categoria;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          categoria = prisma.categoria.findUnique({
            where: {
              nombre: nombre_categoria
            },
            select: {
              id: true,
              nombre: true,
              color: true
            }
          });
          return _context6.abrupt("return", categoria);
        case 2:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  }));
  return function obtenerCategoria(_x21) {
    return _ref6.apply(this, arguments);
  };
}();
function stringTransform(nombre) {
  nombre = nombre.toLowerCase().replace(/\s+/g, "_").replace(/[^\w\s]/g, "");
  return nombre;
}
module.exports = {
  crearArticulo: crearArticulo,
  listarArticulos: listarArticulos,
  listarArticuloPorId: listarArticuloPorId,
  modificarArticulo: modificarArticulo,
  eliminarArticulo: eliminarArticulo
};