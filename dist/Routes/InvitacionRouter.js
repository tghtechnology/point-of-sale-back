"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _InvitacionControlador = require("../controllers/InvitacionControlador");
var _express = require("express");
var router = (0, _express.Router)();

// Ruta para enviar una invitación
router.post('/enviar-invitacion', _InvitacionControlador.enviarInvitacion);
var _default = exports["default"] = router;