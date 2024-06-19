import { Schema, model } from "mongoose";
import validator from "validator";

const adminSchema = new Schema({
  profilePicture: {
    type: String,
    default: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/320px-User-avatar.svg.png",
  },
  firstname: {
    type: String,
    required: [true, "First name is required"],
    minLength: [1, "First name should be more than one character"],
  },
  lastname: {
    type: String,
    required: [true, "Last name is required"],
    minLength: [2, "Last name should be more than one character"],
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
    unique: true,
    validate: {
      validator: function (value) {
        return validator.isEmail(value);
      },
      message: "Email is not valid",
    },
  },
  companyName: {
    type: String,
    required: [true, "Company name is required"],
  },
  companyId: {
    type: String,
    required: [true, "Company ID is required"],
  },
  role: {
    type: String,
    required: true,
    default: "Admin",
  },
  departments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Department",
    },
  ],
  employees: [
    {
      type: Schema.Types.ObjectId,
      ref: "Employee",
    },
  ],
});

const Admin = model("Admin", adminSchema);

export default Admin;
