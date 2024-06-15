import passport from "passport";
import local from "passport-local";
import google from "passport-google-oauth20";
import { createHash, isValidPassword } from "../utils/hasPassword.js";
import userDao from "../dao/mongoDao/user.dao.js";

const localStrategy = local.Strategy;
const GoogleStrategy = google.Strategy;
const initializePassport = () => {
  // Inicializa las estrategias que configuremos:
  // Para PASSPORT solo existe user y password.
  passport.use(
    "register",
    new localStrategy(
      { passReqToCallback: true, usernameField: "email" },
      async (req, username, password, done) => {
        try {
          const { first_name, lastname, email, age } = req.body;
          const user = await userDao.obtenerPorEmail(username);
          if (user)
            return done(null, false, { payload: "El usuario ya existe." });
          const newUser = {
            first_name,
            lastname,
            email,
            age,
            password: createHash(password),
          };
          const createUser = await userDao.crear(newUser);
          return done(null, createUser);
        } catch (error) {
          console.log(error);
          return done(error);
        }
      }
    )
  );

  passport.use(
    "login",
    new localStrategy(
      { usernameField: "email" },
      async (username, password, done) => {
        try {
          const user = await userDao.obtenerPorEmail(username);
          if (!user || !isValidPassword(user, password))
            return done(null, false, {
              payload: "Email o Password invalidos.",
            });

          // Si estan bien los datos del usuario:
          return done(null, user);
        } catch (error) {
          console.log(error);
          done(error);
        }
      }
    )
  );

  passport.use(
    "google",
    new GoogleStrategy(
      {
        clientID: "",
        clientSecret: "",
        callbackURL: "http://localhost:8080/api/session/loginGoogle",
      },
      async (accessToken, refreshToken, profile, cb) => {
        try {
          const { name, emails } = profile;
          const user = {
            first_name: name.givenName,
            lastname: name.familyName,
            email: emails[0].value,
          };

          const existUser = await userDao.obtenerPorEmail(emails[0].value);

          if (existUser) return cb(null, existUser);

          const newUser = await userDao.crear(user);
          cb(null, newUser);
        } catch (error) {
          return cb(error);
        }
      }
    )
  );

  // Serializacion y deserializacion del usuario:
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    const user = await userDao.obtenerPorID(id);
    done(null, user);
  });
};

export default initializePassport;
