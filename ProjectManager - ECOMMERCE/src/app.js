import express from "express";
import router from "./routes/index.js";
import { connectMongoDB } from "./config/mongoDB.config.js";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";
import initializePassport from "./config/passport.config.js";
import cookieParser from "cookie-parser";

// Para crear una aplicacion:
const app = express();
connectMongoDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    store: MongoStore.create({
      mongoUrl:
        "mongodb+srv://efrator12:eGvGNEs6x4V7@e-commerce.xo6330o.mongodb.net/ecommerce",
      ttl: 15,
    }),
    secret: "CodigoSecreto",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser("codigoSecreto"));

initializePassport();

// Debe ir abajo de los demas usos:
app.use("/api", router);

// Para inicializar la APP de EXPRESS se necesita configurar puerto:
const port = 8080;
const ready = console.log("Server Ready on Port " + port);

// Para inicializar el servidor:
app.listen(port, ready);
