import { Schema, model } from "mongoose";
import validator from "validator";

const employeeSchema = new Schema({
  profilePicture: {
    type: String,
    default: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/320px-User-avatar.svg.png",
  },
  firstname: {
    type: String,
    required: [true, "First name is required"],
    minLength: [2, "First name should be more than one character"],
  },
  lastname: {
    type: String,
    required: [true, "Last name is required"],
    minLength: [2, "Last name should be more than one character"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    validate: {
      validator: function (value) {
        return validator.isEmail(value);
      },
      message: "Email is not valid",
    },
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    validate: {
      validator: function (value) {
        return validator.isStrongPassword(value);
      },
      message:
        "Password must contain at least 8 characters, including at least 1 lowercase character, 1 uppercase character, 1 number and 1 symbol",
    },
  },
  gender: {
    type: String,
    required: [true, "Gender is required"],
  },
  maritalStatus: {
    type: String,
    enum: ["Single", "Married", "Divorced", "Widowed"],
    required: [true, "Marital status is required"],
  },
  employeeID: {
    type: String,
    required: [true, "Employee ID is required"],
    unique: true,
  },
  companyId: {
    type: String,
    required: [true, "Company ID is required"],
  },
  companyName: {
    type: String,
    required: [true, "Company name is required"],
  },
  jobTitle: {
    type: String,
    required: [true, "Job title is required"],
  },
  employmentType: {
    type: String,
    enum: ["Full-time", "Part-time", "Contract", "Internship"],
    required: [true, "Employment type is required"],
  },
  employmentStatus: {
    type: String,
    enum: ["Active", "Inactive", "Terminated"],
    required: [true, "Employment status is required"],
  },
  noOfChildren: {
    type: Number,
    required: [true, "Number of children is required"],
    min: [0, "Number of children cannot be negative"],
  },
  phoneNumber: {
    type: String,
    required: [true, "Phone number is required"],
    unique: true,
    validate: {
      validator: function (value) {
        // Regular expression to match German phone numbers
        const phoneRegex = /^(0|\+49\s?)?[1-9]\d{1,14}$/;
        return phoneRegex.test(value);
      },
      message: "Phone number is not valid",
    },
  },
  dateOfBirth: {
    type: String,
    required: [true, "Date of birth is required"],
  },
  dateOfJoining: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: [true, "City is required"],
  },
  state: {
    type: String,
    required: [true, "State is required"],
  },
  country: {
    type: String,
    required: [true, "Country is required"],
  },
  street: {
    type: String,
    required: [true, "Street is required"],
  },
  houseNumber: {
    type: Number,
    required: [true, "House number is required"],
    min: [1, "House number should be greater than 0"],
  },
  postalCode: {
    type: String,
    required: [true, "Postal code is required"],
    validate: {
      validator: function (value) {
        return validator.isPostalCode(value, "DE");
      },
      message: "Postal code is not valid",
    },
  },
  department: {
    type: String,
    required: [true, "Department is required"],
  },
  departmentId: {
    type: Schema.Types.ObjectId,
    ref: "Department",
  },
  salary: {
    type: Number,
    required: [true, "Salary is required"],
    min: [0, "Salary should be a positive number"],
  },
  bankAccountDetails: {
    bankName: { type: String, required: [true, "Bank name is required"] },
    IBAN: {
      type: String,
      required: [true, "IBAN is required"],
      unique: [true, "IBAN has be unique"],
      validate: {
        validator: function (value) {
          return validator.isIBAN(value);
        },
        message: "IBAN is not valid",
      },
    },
    BIC: {
      type: String,
      required: [true, "BIC is required"],
      validate: {
        validator: function (value) {
          return validator.isBIC(value);
        },
        message: "BIC is not valid",
      },
    },
  },
  taxIdentificationNumber: {
    type: String,
    required: [true, "Tax Identification Number is required"],
    unique: true,
    validate: {
      validator: function (value) {
        return value.length === 11;
      },
      message: "Tax Identification Number is not valid.",
    },
  },
  socialSecurityNumber: {
    type: String,
    required: [true, "Social Security Number is required"],
    unique: true,
    validate: {
      validator: function (value) {
        const regex = /^[0-9]{2} [0-9]{6} [A-Za-z] [0-9]{3}$/;
        return regex.test(value);
      },
      message: "Social Security Number is not valid",
    },
  },
  incomeTaxClass: {
    type: Number,
    required: true,
    min: [1, "Tax class should not be less than 1"],
    max: [6, "Tax class should not be greater than 6"],
  },
  healthInsuranceCompany: {
    type: String,
    required: [true, "Health insurance company is required"],
  },
});

const Employee = model("Employee", employeeSchema);

export default Employee;
