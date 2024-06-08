import { Schema, model } from "mongoose";
import validator from "validator";

const employeeSchema = new Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  maritalStatus: {
    type: String,
    enum: ["Single", "Married", "Divorced", "Widowed"],
    required: true,
  },
  employeeID: {
    type: String,
    required: true,
    unique: true,
  },
  jobTitle: {
    type: String,
    required: true,
  },
  employmentType: {
    type: String,
    enum: ["Full-time", "Part-time", "Contract", "Internship"],
    required: true,
  },
  employmentStatus: {
    type: String,
    enum: ["Active", "Inactive", "Terminated"],
    required: true,
  },
  noOfChildren: {
    type: Number,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  dateOfBirth: {
    type: String,
    required: true,
  },
  dateOfJoining: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  street: {
    type: String,
    required: true,
  },
  houseNumber: {
    type: Number,
    required: true,
  },
  postalCode: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  salary: {
    type: String,
    required: true,
  },
  bankAccountDetails: {
    bankName: { type: String, required: true },
    IBAN: { type: String, required: true, unique: true },
    BIC: { type: String, required: true },
  },
  taxIdentificationNumber: {
    type: Number,
    required: true,
    unique: true,
  },
  socialSecurityNumber: {
    type: String,
    required: true,
    unique: true,
  },
  incomeTaxClass: {
    type: Number,
    required: true,
  },
  healthInsuranceCompany: {
    type: String,
    required: true,
  },
});

const Employee = model("Employee", employeeSchema);

export default Employee;
