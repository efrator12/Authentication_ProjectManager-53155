import { Router } from "express";
import userDao from "../dao/mongoDao/user.dao.js";
import { createHash, isValidPassword } from "../utils/hasPassword.js";
import passport from "passport";
import { createToken, verifyToken } from "../utils/jwt.js";

const router = Router();

const register_User = async (req, resp) => {
  try {
    resp.status(201).json({ status: "success", payload: "Usuario Creado." });
  } catch (error) {
    console.log(error);
    resp
      .status(500)
      .json({ status: "error", payload: "Error en el servidor." });
  }
};

const login_User = async (req, resp) => {
  try {
    resp.status(200).json({ status: "success", payload: req.user });
  } catch (error) {
    console.log(error);
    resp
      .status(500)
      .json({ status: "error", payload: "Error en el servidor." });
  }
};

const logout_User = async (req, resp) => {
  try {
    req.session.destroy();
    // if (req.session.destroy) {
    resp
      .status(200)
      .json({ status: "sucess", payload: "Sesion cerrada con exito." });
    // }
  } catch (error) {
    console.log(error);
    resp
      .status(500)
      .json({ status: "error", payload: "Error en el servidor." });
  }
};

// router.post("/jwt", async (req, resp) => {
//   try {
//     const { email, password } = req.body;
//     const user = await userDao.obtenerPorEmail(email);
//     if (!user || !isValidPassword(user, password))
//       return resp
//         .status(401)
//         .json({ status: "error", payload: "Usuario o Password no valido." });
//     const token = createToken(user);

//     // Guardamos el token en una cookie:
//     resp.cookie("token", token, { httpOnly: true });

//     resp.status(200).json({ status: "success", payload: user, token });
//   } catch (error) {
//     console.log(error);
//     resp
//       .status(500)
//       .json({ status: "error", payload: "Error en el servidor." });
//   }
// });

// const current = async (req, resp) => {
//   try {
//     const token = req.cookies.token;
//     const checkToken = verifyToken(token);

//     if (!checkToken)
//       return resp
//         .status(403)
//         .json({ status: "error", payload: "Token invalido." });
//     resp.status(200).json({ status: "sucess", payload: checkToken });
//   } catch (error) {}
// };

router.post("/register", passport.authenticate("register"), register_User);
router.get("/login", passport.authenticate("login"), login_User);
router.get("/logout", logout_User);

router.get(
  "/loginGoogle",
  passport.authenticate("google", {
    scope: [
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
    ],
    session: false,
  }),
  login_User
);

// router.get("/current", current);

export default router;
