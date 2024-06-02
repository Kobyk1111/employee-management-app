import mongoose, { Schema, model } from "mongoose";
import validator from "validator";

const departmentSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

const Department = model("Department", departmentSchema);

export default Department;
