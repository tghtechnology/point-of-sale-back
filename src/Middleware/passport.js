import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;

/**
 * Configura una estrategia de autenticación local utilizando Passport.js.
 *
 * @description Esta función configura una estrategia de autenticación local utilizando Passport.js. 
 * La estrategia verifica las credenciales del usuario (email y contraseña) contra la base de datos, 
 * utilizando bcrypt para comparar la contraseña encriptada almacenada con la contraseña proporcionada.
 * Si las credenciales son válidas, se devuelve el usuario; de lo contrario, se devuelve un mensaje de error.
 */
passport.use(
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      const usuario = await prisma.usuario.findUnique({
        where: {email: email,},
      });
      if (!usuario) {
        return done(null, false, { message: "Usuario no encontrado" });
      } else {
        const match = bcrypt.compareSync(password, usuario.password);
        if (match) {
          return done(null, usuario);
        } else {
          return done(null, false, { message: "Contraseña incorrecta" });
        }
      }
    }
  )
);

/**
 * Serializa al usuario para almacenar en la sesión.
 *
 * @param {Object} usuario - Objeto de usuario.
 * @param {Function} done - Callback de Passport.js.
 * @returns {void}
 *
 * @description Esta función serializa al usuario almacenando su ID en la sesión.
 **/
passport.serializeUser((usuario, done) => {
  done(null, usuario.id);
});

/**
 * Deserializa al usuario a partir de su ID almacenado en la sesión.
 *
 * @param {string} id - ID del usuario.
 * @param {Function} done - Callback de Passport.js.
 * @returns {void}
 *
 * @description Esta función deserializa al usuario a partir de su ID almacenado en la sesión.
 **/
passport.deserializeUser(async (id, done) => {
  const usuario = await prisma.usuario
    .findUnique({
      where: {id: id,},
    })
    .then((usuario) => {done(null, usuario);});
});