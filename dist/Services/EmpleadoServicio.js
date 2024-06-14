"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.listarEmpleados = exports.listarEmpleadoPorId = exports.eliminarEmpleadoPorId = exports.editarEmpleado = exports.crearEmpleado = exports.cambiarContraseña = void 0;
var _client = require("@prisma/client");
var _bcrypt = _interopRequireDefault(require("bcrypt"));
var _helperPais = require("../helpers/helperPais");
var EmailInvitacion = _interopRequireWildcard(require("../Utils/emailInvitacion"));
var _nodemailer = _interopRequireDefault(require("nodemailer"));
var _Time = require("../Utils/Time");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var prisma = new _client.PrismaClient();
var transporter = _nodemailer["default"].createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

/**
 * Encripta una contraseña utilizando el algoritmo bcrypt.
 *
 * @param {string} password - La contraseña a encriptar.
 * @returns {Promise<string>} - La contraseña encriptada.
 *
 * @throws {Error} - Si no se proporciona una contraseña.
 *
 * @description Esta función encripta la contraseña proporcionada utilizando el algoritmo bcrypt.
 **/
var encryptPassword = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(password) {
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          if (password) {
            _context.next = 2;
            break;
          }
          throw new Error("Se requiere una contraseña para encriptar.");
        case 2:
          return _context.abrupt("return", _bcrypt["default"].hash(password, 10));
        case 3:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function encryptPassword(_x) {
    return _ref.apply(this, arguments);
  };
}();

/**
 * Busca un empleado por su ID en la base de datos.
 *
 * @param {string} id - El ID del empleado a buscar.
 * @param {number} usuario_id - El ID del usuario para el que se está buscando el empleado por ID.
 * 
 * @returns {Promise<Object>} - Los datos del empleado encontrado.
 *
 * @throws {Error} - Si no se encuentra ningún empleado con el ID proporcionado.
 *
 * @description Esta función busca un empleado en la base de datos utilizando su ID y devuelve sus datos.
 **/
var buscarEmpleadoPorId = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(id, usuario_id) {
    var id_puntoDeVenta, empleado;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return obtenerIdPunto(usuario_id);
        case 2:
          id_puntoDeVenta = _context2.sent;
          _context2.next = 5;
          return prisma.usuario.findUnique({
            where: {
              id: parseInt(id, 10),
              id_puntoDeVenta: id_puntoDeVenta
            }
          });
        case 5:
          empleado = _context2.sent;
          if (empleado) {
            _context2.next = 8;
            break;
          }
          throw new Error("No se encontr\xF3 ning\xFAn empleado con el ID ".concat(id));
        case 8:
          return _context2.abrupt("return", empleado);
        case 9:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function buscarEmpleadoPorId(_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();

/**
 * Crea un nuevo empleado en la base de datos.
 *
 * @param {string} nombre - El nombre del nuevo empleado.
 * @param {string} email - El correo electrónico del nuevo empleado.
 * @param {string} telefono - El número de teléfono del nuevo empleado.
 * @param {string} cargo - El cargo del nuevo empleado.
 * @param {string} pais - El país del nuevo empleado.
 * @param {string} password - La contraseña del nuevo empleado.
 * @param {string} token - El token de sesión del usuario que está creando el empleado.
 * @param {number} propietarioId - El ID del propietario para el que se está creando el cliente.
 * @param {number} usuario_id - El ID del usuario para el que se está creando el empleado.
 * @returns {Promise<Object>} - Los datos del nuevo empleado creado.
 *
 * @throws {Error} - Si el país proporcionado es inválido.
 * @throws {Error} - Si hay algún problema al crear el empleado.
 *
 * @description Esta función crea un nuevo empleado en la base de datos con los datos proporcionados.
 **/
var crearEmpleado = exports.crearEmpleado = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(nombre, email, telefono, cargo, pais, password, propietarioId, usuario_id) {
    var hashedPassword, fechaCreacion, usuario, id_punto, id_puntoDeVenta, propietarioInfo, empleado;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          if ((0, _helperPais.validarNombrePais)(pais)) {
            _context3.next = 2;
            break;
          }
          throw new Error("País inválido");
        case 2:
          _context3.next = 4;
          return encryptPassword(password);
        case 4:
          hashedPassword = _context3.sent;
          fechaCreacion = (0, _Time.getUTCTime)(new Date().toISOString()); //Obtener el nombre de usuario
          _context3.next = 8;
          return prisma.usuario.findFirst({
            where: {
              id: usuario_id
            },
            select: {
              nombre: true
            }
          });
        case 8:
          usuario = _context3.sent;
          _context3.next = 11;
          return prisma.puntoDeVenta.findFirst({
            where: {
              estado: true,
              propietario: usuario.nombre
            },
            select: {
              id: true
            }
          });
        case 11:
          id_punto = _context3.sent;
          //Asignar id del punto de venta
          id_puntoDeVenta = id_punto.id;
          if ((0, _helperPais.validarNombrePais)(pais)) {
            _context3.next = 15;
            break;
          }
          throw new Error("País inválido");
        case 15:
          _context3.next = 17;
          return prisma.usuario.findUnique({
            where: {
              id: propietarioId,
              estado: true,
              rol: "Propietario"
            }
          });
        case 17:
          propietarioInfo = _context3.sent;
          _context3.next = 20;
          return prisma.usuario.create({
            data: {
              nombre: nombre,
              email: email,
              telefono: telefono,
              cargo: cargo,
              pais: pais,
              nombreNegocio: propietarioInfo.nombreNegocio,
              rol: "Empleado",
              estado: true,
              password: hashedPassword,
              fecha_creacion: fechaCreacion,
              id_puntoDeVenta: id_puntoDeVenta
            }
          });
        case 20:
          empleado = _context3.sent;
          _context3.t0 = transporter;
          _context3.next = 24;
          return EmailInvitacion.enviarCorreoBienvenida(email, nombre, email, password, process.env.URLEMPLOYE);
        case 24:
          _context3.t1 = _context3.sent;
          _context3.next = 27;
          return _context3.t0.sendMail.call(_context3.t0, _context3.t1);
        case 27:
          return _context3.abrupt("return", empleado);
        case 28:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function crearEmpleado(_x4, _x5, _x6, _x7, _x8, _x9, _x10, _x11) {
    return _ref3.apply(this, arguments);
  };
}();

/**
 * Edita los datos de un empleado en la base de datos.
 *
 * @param {string} id - El ID del empleado a editar.
 * @param {string} nombre - El nuevo nombre del empleado.
 * @param {string} email - El nuevo correo electrónico del empleado.
 * @param {string} telefono - El nuevo número de teléfono del empleado.
 * @param {string} cargo - El nuevo cargo del empleado.
 * @param {string} pais - El nuevo país del empleado.
 * @param {number} usuario_id - El ID del usuario para el que se está modificando el empleado.
 * @returns {Promise<Object>} - Los datos del empleado actualizado.
 *
 * @description Esta función edita los datos de un empleado en la base de datos utilizando su ID y los nuevos datos proporcionados.
 **/
var editarEmpleado = exports.editarEmpleado = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(id, nombre, email, telefono, cargo, pais, usuario_id) {
    var id_puntoDeVenta, empleadoExistente, updatedEmpleado;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return obtenerIdPunto(parseInt(usuario_id));
        case 2:
          id_puntoDeVenta = _context4.sent;
          _context4.next = 5;
          return buscarEmpleadoPorId(id, usuario_id);
        case 5:
          empleadoExistente = _context4.sent;
          _context4.next = 8;
          return prisma.usuario.update({
            where: {
              id: empleadoExistente.id
            },
            data: {
              nombre: nombre,
              email: email,
              telefono: telefono,
              cargo: cargo,
              pais: pais,
              estado: true,
              fecha_modificacion: (0, _Time.getUTCTime)(new Date().toISOString()),
              id_puntoDeVenta: id_puntoDeVenta
            }
          });
        case 8:
          updatedEmpleado = _context4.sent;
          return _context4.abrupt("return", updatedEmpleado);
        case 10:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return function editarEmpleado(_x12, _x13, _x14, _x15, _x16, _x17, _x18) {
    return _ref4.apply(this, arguments);
  };
}();

/**
 * Lista los datos de un empleado por su ID.
 *
 * @param {string} id - El ID del empleado del que se desean obtener los datos.
 * @param {number} usuario_id - El ID del usuario para el que se está listando el empleado por ID.
 * @returns {Promise<Object>} - Los datos del empleado encontrado.
 *
 * @description Esta función busca un empleado en la base de datos utilizando su ID y devuelve sus datos.
 **/
var listarEmpleadoPorId = exports.listarEmpleadoPorId = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(id, usuario_id) {
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return buscarEmpleadoPorId(id, usuario_id);
        case 2:
          return _context5.abrupt("return", _context5.sent);
        case 3:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return function listarEmpleadoPorId(_x19, _x20) {
    return _ref5.apply(this, arguments);
  };
}();

/**
 * Elimina un empleado de la base de datos por su ID.
 *
 * @param {string} id - El ID del empleado a eliminar.
 * @param {number} usuario_id - El ID del usuario para el que se está eliminando el empleado.
 * 
 * @returns {Promise<Object>} - Los datos del empleado eliminado.
 *
 * @description Esta función elimina un empleado de la base de datos utilizando su ID.
 **/
var eliminarEmpleadoPorId = exports.eliminarEmpleadoPorId = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(id, usuario_id) {
    var id_puntoDeVenta;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return obtenerIdPunto(usuario_id);
        case 2:
          id_puntoDeVenta = _context6.sent;
          _context6.next = 5;
          return prisma.usuario.update({
            where: {
              id: parseInt(id, 10),
              id_puntoDeVenta: id_puntoDeVenta
            },
            data: {
              estado: false
            }
          });
        case 5:
          return _context6.abrupt("return", _context6.sent);
        case 6:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  }));
  return function eliminarEmpleadoPorId(_x21, _x22) {
    return _ref6.apply(this, arguments);
  };
}();

/**
 * Lista todos los empleados activos en la base de datos.
 *
 * @param {number} usuario_id - El ID del usuario para el que se está listando los empleados.
 * 
 * @returns {Promise<Array>} - Un arreglo que contiene los datos de todos los empleados activos.
 *
 * @description Esta función busca y devuelve todos los empleados activos en la base de datos.
 **/
var listarEmpleados = exports.listarEmpleados = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(usuario_id) {
    var id_puntoDeVenta;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return obtenerIdPunto(usuario_id);
        case 2:
          id_puntoDeVenta = _context7.sent;
          _context7.next = 5;
          return prisma.usuario.findMany({
            where: {
              estado: true,
              rol: "Empleado",
              id_puntoDeVenta: id_puntoDeVenta
            }
          });
        case 5:
          return _context7.abrupt("return", _context7.sent);
        case 6:
        case "end":
          return _context7.stop();
      }
    }, _callee7);
  }));
  return function listarEmpleados(_x23) {
    return _ref7.apply(this, arguments);
  };
}();

/**
 * Cambia la contraseña de un empleado.
 *
 * @param {string} id - El ID del empleado cuya contraseña se va a cambiar.
 * @param {string} contraseñaActual - La contraseña actual del empleado.
 * @param {string} nuevaContraseña - La nueva contraseña del empleado.
 * @param {string} confirmarNuevaContraseña - La confirmación de la nueva contraseña.
 * @param {number} usuario_id - El ID del usuario para el que se está cambiando la contraseña.
 * @returns {Promise<Object>} - Los datos del empleado con la contraseña actualizada.
 *
 * @throws {Error} - Si la contraseña actual no es válida.
 * @throws {Error} - Si las nuevas contraseñas no coinciden.
 * @throws {Error} - Si la nueva contraseña está vacía.
 *
 * @description Esta función cambia la contraseña de un empleado en la base de datos, verificando primero la validez de la contraseña actual.
 **/
var cambiarContraseña = exports.cambiarContraseña = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(id, contraseñaActual, nuevaContraseña, confirmarNuevaContraseña, usuario_id) {
    var empleado, hashedPassword;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.next = 2;
          return buscarEmpleadoPorId(id, usuario_id);
        case 2:
          empleado = _context8.sent;
          _context8.next = 5;
          return _bcrypt["default"].compare(contraseñaActual, empleado.password);
        case 5:
          if (_context8.sent) {
            _context8.next = 7;
            break;
          }
          throw new Error("La contrase\xF1a actual no es v\xE1lida para el empleado con el ID ".concat(id));
        case 7:
          if (!(nuevaContraseña !== confirmarNuevaContraseña)) {
            _context8.next = 9;
            break;
          }
          throw new Error("Las contrase\xF1as nuevas no coinciden");
        case 9:
          if (nuevaContraseña) {
            _context8.next = 11;
            break;
          }
          throw new Error("La nueva contrase\xF1a no puede estar vac\xEDa");
        case 11:
          _context8.next = 13;
          return encryptPassword(nuevaContraseña);
        case 13:
          hashedPassword = _context8.sent;
          _context8.next = 16;
          return prisma.usuario.update({
            where: {
              id: empleado.id
            },
            data: {
              password: hashedPassword
            }
          });
        case 16:
          return _context8.abrupt("return", _context8.sent);
        case 17:
        case "end":
          return _context8.stop();
      }
    }, _callee8);
  }));
  return function cambiarContraseña(_x24, _x25, _x26, _x27, _x28) {
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
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          _context9.next = 2;
          return prisma.usuario.findFirst({
            where: {
              id: usuario_id
            },
            select: {
              id_puntoDeVenta: true
            }
          });
        case 2:
          usuario = _context9.sent;
          punto = usuario.id_puntoDeVenta;
          _context9.next = 6;
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
          usuarioExistente = _context9.sent;
          if (usuarioExistente) {
            _context9.next = 9;
            break;
          }
          throw new Error("Usuario no encontrado");
        case 9:
          return _context9.abrupt("return", usuarioExistente.id_puntoDeVenta);
        case 10:
        case "end":
          return _context9.stop();
      }
    }, _callee9);
  }));
  return function obtenerIdPunto(_x29) {
    return _ref9.apply(this, arguments);
  };
}();