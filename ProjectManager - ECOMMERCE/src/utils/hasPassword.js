import bcrypt from "bcrypt";

// HASHEA CONTRASEÑAñ
export const createHash = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

// VALIDAR CONTRASEÑA
export const isValidPassword = (user, password) => {
  return bcrypt.compareSync(password, user.password);
};
