import mongoose, { Schema, model } from "mongoose";
import validator from "validator";

const adminSchema = new Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return validator.isStrongPassword(value);
      },
      message:
        "Password must contain at least 8 characters, including at least 1 lowercase character, 1 uppercase character, 1 number and 1 symbol",
    },
  },
  email: {
    type: String,
    required: true,
  },
});

const Admin = model("Admin", adminSchema);

export default Admin;
