import mongoose from "mongoose";

const userCollection = "users";
const userSchema = new mongoose.Schema({
  first_name: String,
  lastname: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  age: {
    type: Number,
    require: true,
  },
});

export const userModel = mongoose.model(userCollection, userSchema);
