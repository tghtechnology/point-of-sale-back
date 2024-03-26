"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.options = void 0;
var options = exports.options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API",
      version: "1.0.0",
      description: "A simple express library API"
    },
    servers: [{
      url: "http://localhost:3000"
    }]
  },
  apis: ["./src/routes/**/*.js"]
};