import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const passport = require('passport')
const localStrategy = require('passport-local').Strategy

passport.use(new localStrategy ({
    usernameField: 'email',
    passwordField: 'password',
}, async (email, password, done) => {

    //Confirmar si el correo coincide
    const usuario = await prisma.usuario.findUnique({
        where: {
            email: email,
        }
    })
    if (!usuario) {
        return done(null, false, { message: 'Usuario no encontrado' })
    } else {
        //Confirmar si la contraseña coincide
        const match = bcrypt.compareSync(password, usuario.password)
        if (match) {
            return done(null, usuario)
        } else {
           return done(null, false, { message: 'Contraseña incorrecta' })
        } 
    }
}))

//Agregar más validaciones de caracteres, mínimo, que tenga @gmail/hotmail...

//Serialización y deserialización
passport.serializeUser((usuario, done) => {
    done(null, usuario.id)
})

passport.deserializeUser(async (id, done) => {
    const usuario = await prisma.usuario.findUnique({
        where: {
            id: id,
        }
    }).then(usuario => {
        done(null, usuario)
    })
})