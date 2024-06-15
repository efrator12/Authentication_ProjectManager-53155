import { userModel } from "../models/user.model.js";

const obtenerPorID = async (id) => {
  const user = await userModel.findById(id);
  return user;
};

const obtenerPorEmail = async (email) => {
  const user = await userModel.findOne({ email }).catch((error) => {
    return null;
  });
  return user;
};

const crear = async (data) => {
  const newuser = await userModel.create(data);
  return newuser;
};

export default {
  obtenerPorEmail,
  crear,
  obtenerPorID,
};
