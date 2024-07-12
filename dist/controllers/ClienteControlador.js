"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.obtenerClienteById = exports.listarClientes = exports.listaPaises = exports.eliminarCliente = exports.editarCliente = exports.crearCliente = void 0;
var ClienteServicio = _interopRequireWildcard(require("../Services/ClienteServicio"));
var _UsuarioServicio = require("../Services/UsuarioServicio");
var _helperPais = require("../helpers/helperPais");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
/**
 * Obtiene una lista de todos los países.
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 * @returns {Array<Object>}  - La lista de todos los países.
 * @throws {Error} - Devuelve un error si hay un problema al obtener la lista de países.
 */
var listaPaises = exports.listaPaises = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var _listaPaises;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          try {
            _listaPaises = (0, _helperPais.obtenerListaPaises)();
            res.json(_listaPaises);
          } catch (error) {
            res.status(500).json({
              error: error.message
            });
          }
        case 1:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function listaPaises(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

/**
 * Crea un nuevo cliente.
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 * @param {string} req.body.nombre - El nombre del cliente.
 * @param {string} req.body.email - El correo electrónico del cliente.
 * @param {string} req.body.telefono - El número de teléfono del cliente.
 * @param {string} req.body.direccion - La dirección del cliente.
 * @param {string} req.body.ciudad - La ciudad del cliente.
 * @param {string} req.body.region - La región del cliente.
 * @param {string} req.body.pais - El país del cliente.
 * @param {number} req.usuario.id - ID del usuario autenticado.
 * @returns {Object} - El nuevo cliente creado.
 * @throws {Error} - Devuelve un error si hay un problema al crear el cliente.
 */
var crearCliente = exports.crearCliente = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var usuario_id, _req$body, nombre, email, telefono, direccion, ciudad, region, pais, newCliente;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          usuario_id = req.usuario.id;
          _req$body = req.body, nombre = _req$body.nombre, email = _req$body.email, telefono = _req$body.telefono, direccion = _req$body.direccion, ciudad = _req$body.ciudad, region = _req$body.region, pais = _req$body.pais;
          _context2.next = 5;
          return ClienteServicio.crearCliente(nombre, email, telefono, direccion, ciudad, region, pais, usuario_id);
        case 5:
          newCliente = _context2.sent;
          res.json(newCliente);
          _context2.next = 19;
          break;
        case 9:
          _context2.prev = 9;
          _context2.t0 = _context2["catch"](0);
          console.error(_context2.t0);
          if (!(_context2.t0.message == "País inválido")) {
            _context2.next = 14;
            break;
          }
          return _context2.abrupt("return", res.status(400).json({
            message: _context2.t0.message
          }));
        case 14:
          if (!(_context2.t0.message == "El correo electrónico ya está en uso")) {
            _context2.next = 18;
            break;
          }
          return _context2.abrupt("return", res.status(400).json({
            message: _context2.t0.message
          }));
        case 18:
          return _context2.abrupt("return", res.status(500).json({
            mensaje: 'Error interno del servidor '
          }));
        case 19:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 9]]);
  }));
  return function crearCliente(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

/**
 * Obtiene la lista de todos los clientes.
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 * @param {number} req.usuario.id - ID del usuario autenticado.
 * @returns {Array<Object>}  - La lista de todos los clientes.
 * @throws {Error} - Devuelve un error si hay un problema al obtener la lista de clientes.
 */
var listarClientes = exports.listarClientes = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var usuario_id, clientes;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          usuario_id = req.usuario.id;
          _context3.next = 4;
          return ClienteServicio.listarClientes(usuario_id);
        case 4:
          clientes = _context3.sent;
          res.status(200).json(clientes);
          _context3.next = 12;
          break;
        case 8:
          _context3.prev = 8;
          _context3.t0 = _context3["catch"](0);
          console.error(_context3.t0);
          res.status(500).json({
            mensaje: 'Error al obtener la lista de clientes.'
          });
        case 12:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 8]]);
  }));
  return function listarClientes(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

/**
 * Obtiene un cliente por su ID.
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 * @param {number} req.params.id - El ID del cliente.
 * @param {number} req.usuario.id - ID del usuario autenticado.
 * @returns {Object} - El cliente encontrado.
 * @throws {Error} - Devuelve un error si hay un problema al obtener el cliente.
 */
var obtenerClienteById = exports.obtenerClienteById = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var id, usuario_id, cliente;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          id = req.params.id;
          usuario_id = req.usuario.id;
          _context4.next = 5;
          return ClienteServicio.obtenerClienteById(id, usuario_id);
        case 5:
          cliente = _context4.sent;
          if (!cliente) {
            res.status(404).json({
              mensaje: 'Cliente no encontrado'
            });
          } else {
            res.status(200).json(cliente);
          }
          _context4.next = 13;
          break;
        case 9:
          _context4.prev = 9;
          _context4.t0 = _context4["catch"](0);
          console.error(_context4.t0);
          res.status(500).json({
            mensaje: 'Error al obtener el cliente.'
          });
        case 13:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 9]]);
  }));
  return function obtenerClienteById(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

/**
 * Edita un cliente existente.
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 * @param {number} req.params.id - El ID del cliente a editar.
 * @param {string} req.body.nombre - El nuevo nombre del cliente.
 * @param {string} req.body.email - El nuevo correo electrónico del cliente.
 * @param {string} req.body.telefono - El nuevo número de teléfono del cliente.
 * @param {string} req.body.direccion - La nueva dirección del cliente.
 * @param {string} req.body.ciudad - La nueva ciudad del cliente.
 * @param {string} req.body.region - La nueva región del cliente.
 * @param {string} req.body.pais - El nuevo país del cliente.
 * @param {number} req.usuario.id - ID del usuario autenticado.
 * @returns {Object} - El cliente actualizado.
 * @throws {Error} - Devuelve un error si hay un problema al editar el cliente.
 */
var editarCliente = exports.editarCliente = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    var id, usuario_id, _req$body2, nombre, email, telefono, direccion, ciudad, region, pais, cliente;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          id = req.params.id;
          usuario_id = req.usuario.id;
          _req$body2 = req.body, nombre = _req$body2.nombre, email = _req$body2.email, telefono = _req$body2.telefono, direccion = _req$body2.direccion, ciudad = _req$body2.ciudad, region = _req$body2.region, pais = _req$body2.pais;
          _context5.next = 6;
          return ClienteServicio.editarCliente(id, nombre, email, telefono, direccion, ciudad, region, pais, usuario_id);
        case 6:
          cliente = _context5.sent;
          res.status(200).json(cliente);
          _context5.next = 22;
          break;
        case 10:
          _context5.prev = 10;
          _context5.t0 = _context5["catch"](0);
          console.error(_context5.t0);
          if (!(_context5.t0.message == "País inválido")) {
            _context5.next = 15;
            break;
          }
          return _context5.abrupt("return", res.status(400).json({
            message: _context5.t0.message
          }));
        case 15:
          if (!(_context5.t0.message == "El correo electrónico ya está en uso")) {
            _context5.next = 17;
            break;
          }
          return _context5.abrupt("return", res.status(400).json({
            message: _context5.t0.message
          }));
        case 17:
          if (!(_context5.t0.message == "Cliente no encontrado")) {
            _context5.next = 21;
            break;
          }
          return _context5.abrupt("return", res.status(400).json({
            message: _context5.t0.message
          }));
        case 21:
          return _context5.abrupt("return", res.status(500).json({
            mensaje: 'Error interno del servidor '
          }));
        case 22:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 10]]);
  }));
  return function editarCliente(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

/**
 * Elimina un cliente por su ID.
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 * @param {number} req.params.id - El ID del cliente a eliminar.
 * @param {number} req.usuario.id - ID del usuario autenticado.
 * @returns {Object} - Un mensaje de confirmación de que el cliente se ha eliminado correctamente.
 * @throws {Error} - Devuelve un error si hay un problema al eliminar el cliente.
 */
var eliminarCliente = exports.eliminarCliente = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
    var id, usuario_id, cliente;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          id = req.params.id;
          usuario_id = req.usuario.id;
          _context6.next = 5;
          return ClienteServicio.eliminarCliente(id, usuario_id);
        case 5:
          cliente = _context6.sent;
          res.status(200).json({
            mensaje: 'Cliente eliminado correctamente'
          });
          _context6.next = 13;
          break;
        case 9:
          _context6.prev = 9;
          _context6.t0 = _context6["catch"](0);
          console.error(_context6.t0);
          res.status(500).json({
            mensaje: 'Error al eliminar el cliente.'
          });
        case 13:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 9]]);
  }));
  return function eliminarCliente(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();