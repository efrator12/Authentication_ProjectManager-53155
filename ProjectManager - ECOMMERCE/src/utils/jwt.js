import jwt from "jsonwebtoken";

// Crear token:

export const createToken = (user) => {
  const { _id, email } = user;
  const token = jwt.sign({ _id, email }, "codigoSecreto", { expiresIn: "1m" });
  return token;
};

// Verificar token:
export const verifyToken = (token) => {
  try {
    const decode = jwt.verify(token, "codigoSecreto");
    return decode;
  } catch (error) {
    console.log(error);
    return null;
  }
};
