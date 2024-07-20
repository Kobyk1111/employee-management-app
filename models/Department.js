import { Schema, model } from "mongoose";
// import validator from "validator";

const departmentSchema = new Schema({
  name: {
    type: String,
    required: [true, "Department Name is required"],
  },
  companyId: {
    type: String,
    required: [true, "CompanyId is required"],
  },
  employees: [
    {
      type: Schema.Types.ObjectId,
      ref: "Employee",
    },
  ],
});

// Define a compound unique index
departmentSchema.index({ name: 1, companyId: 1 }, { unique: true });

const Department = model("Department", departmentSchema);

export default Department;
