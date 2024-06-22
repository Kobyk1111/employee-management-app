import Employee from "../models/Employee.js";
import createHttpError from "http-errors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function getAllEmployees(req, res, next) {
  const { id } = req.params;
  const { page = 1, entry, search } = req.query;
  const limit = entry;
  const skip = (page - 1) * limit;

  const filter = { companyId: id };

  if (search) {
    // Use regex to perform case-insensitive search on multiple fields
    const regex = new RegExp(search, "i");
    filter.$or = [
      { firstname: regex },
      { lastname: regex },
      { email: regex },
      { department: regex },
      { jobTitle: regex },
    ];
  }

  try {
    const allEmployees = await Employee.find(filter).skip(skip).limit(limit);

    res.json(allEmployees);
  } catch (error) {
    next(createHttpError(500, "Failed to get all employees"));
  }
}

export async function createEmployee(req, res, next) {
  const { email, phoneNumber, password } = req.body;

  try {
    const foundEmployee = await Employee.findOne({ email, phoneNumber });

    if (foundEmployee) {
      return next(createHttpError(409, "Employee already exists"));
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const createEmployee = await Employee.create({ ...req.body, password: hashedPassword });
    res.status(201).json({
      id: createEmployee._id,
    });
  } catch (err) {
    console.log(err);
    if (err.name === "ValidationError") {
      const errMessage = Object.values(err.errors)[0].message;
      return next(createHttpError(400, errMessage));
    }

    if (err.code === 11000) {
      // Duplicate key error
      const duplicateField = Object.keys(err.keyPattern)[0];
      const duplicateValue = Object.values(err.keyValue)[0];
      return next(createHttpError(409, `An employee with this ${duplicateField}: ${duplicateValue} already exists.`));
    }
    next(createHttpError(500, "Employee could not be created"));
  }
}

export async function loginEmployee(req, res, next) {
  const { email, password } = req.body;

  try {
    const foundEmployee = await Employee.findOne({ email });

    if (foundEmployee) {
      const matchPassword = await bcrypt.compare(password, foundEmployee.password);

      if (!matchPassword) {
        return next(createHttpError(400, "Wrong password, please try again!"));
      }

      const accessToken = jwt.sign({ id: foundEmployee._id }, process.env.JWT_SECRET_KEY, { expiresIn: "15m" });
      const refreshToken = jwt.sign({ id: foundEmployee._id }, process.env.JWT_SECRET_KEY, { expiresIn: "1d" });

      const cookieOptions = {
        httpOnly: true,
        secure: true,
        sameSite: "Strict",
      };

      const accessOptions = {
        ...cookieOptions,
        maxAge: 1000 * 60 * 15,
      };

      const refreshOptions = {
        ...cookieOptions,
        maxAge: 1000 * 60 * 60 * 24,
      };

      res.cookie("employeeAccessCookie", accessToken, accessOptions);
      res.cookie("employeeRefreshCookie", refreshToken, refreshOptions);

      res.json({
        id: foundEmployee._id,
        username: foundEmployee.firstname,
        firstname: foundEmployee.firstname,
        lastname: foundEmployee.lastname,
        email: foundEmployee.email,
        gender: foundEmployee.gender,
        maritalStatus: foundEmployee.maritalStatus,
        noOfChildren: foundEmployee.noOfChildren,
        phoneNumber: foundEmployee.phoneNumber,
        city: foundEmployee.city,
        state: foundEmployee.state,
        country: foundEmployee.country,
        street: foundEmployee.street,
        houseNumber: foundEmployee.houseNumber,
        postalCode: foundEmployee.postalCode,
        taxIdentificationNumber: foundEmployee.taxIdentificationNumber,
        socialSecurityNumber: foundEmployee.socialSecurityNumber,
        incomeTaxClass: foundEmployee.incomeTaxClass,
        healthInsuranceCompany: foundEmployee.healthInsuranceCompany,
        bankAccountDetails: {
          bankName: foundEmployee.bankAccountDetails.bankName,
          IBAN: foundEmployee.bankAccountDetails.IBAN,
          BIC: foundEmployee.bankAccountDetails.BIC,
        },
        companyId: foundEmployee.companyId,
        companyName: foundEmployee.companyName,
        profilePicture: foundEmployee.profilePicture,
        jobTitle: foundEmployee.jobTitle,
      });
    } else {
      return next(createHttpError(404, "Wrong Email Address, no Employee found"));
    }
  } catch (error) {
    next(createHttpError(500, "Failed to log in"));
  }
}

export async function updateEmployee(req, res, next) {
  const { id } = req.params;

  try {
    const foundEmployee = await Employee.findById(id);

    if (foundEmployee) {
      const options = {
        new: true,
        runValidators: true,
      };

      const updatedEmployee = await Employee.findByIdAndUpdate(id, req.body, options);

      res.status(201).json({
        id: updatedEmployee._id,
      });
    } else {
      return next(createHttpError(404, "No employee found"));
    }
  } catch (error) {
    next(createHttpError(500, "There was a problem updating the employee."));
  }
}

export async function updateEmployeeProfile(req, res, next) {
  const { id } = req.params;

  try {
    const foundEmployee = await Employee.findById(id);

    if (foundEmployee) {
      const updateData = { ...req.body };

      if (req.file) {
        // updateData.profilePicture = req.file.filename;
        updateData.profilePicture = req.file.path;
      }

      const options = {
        new: true,
        runValidators: true,
      };

      const updatedEmployee = await Employee.findByIdAndUpdate(id, updateData, options);

      res.status(201).json({
        id: updatedEmployee._id,
        username: updatedEmployee.firstname,
        firstname: updatedEmployee.firstname,
        lastname: updatedEmployee.lastname,
        email: updatedEmployee.email,
        gender: updatedEmployee.gender,
        maritalStatus: updatedEmployee.maritalStatus,
        noOfChildren: updatedEmployee.noOfChildren,
        phoneNumber: updatedEmployee.phoneNumber,
        city: updatedEmployee.city,
        state: updatedEmployee.state,
        country: updatedEmployee.country,
        street: updatedEmployee.street,
        houseNumber: updatedEmployee.houseNumber,
        postalCode: updatedEmployee.postalCode,
        taxIdentificationNumber: updatedEmployee.taxIdentificationNumber,
        socialSecurityNumber: updatedEmployee.socialSecurityNumber,
        incomeTaxClass: updatedEmployee.incomeTaxClass,
        healthInsuranceCompany: updatedEmployee.healthInsuranceCompany,
        bankAccountDetails: {
          bankName: updatedEmployee.bankAccountDetails.bankName,
          IBAN: updatedEmployee.bankAccountDetails.IBAN,
          BIC: updatedEmployee.bankAccountDetails.BIC,
        },
        companyId: updatedEmployee.companyId,
        companyName: updatedEmployee.companyName,
        message: "You have updated your profile successfully.",
        profilePicture: updatedEmployee.profilePicture,
        jobTitle: updatedEmployee.jobTitle,
      });
    } else {
      return next(createHttpError(404, "No employee found"));
    }
  } catch (err) {
    if (err.name === "ValidationError") {
      const errMessage = Object.values(err.errors)[0].message;
      return next(createHttpError(400, errMessage));
    }

    if (err.code === 11000) {
      // Duplicate key error
      const duplicateField = Object.keys(err.keyPattern)[0];
      const duplicateValue = Object.values(err.keyValue)[0];
      return next(createHttpError(409, `An employee with this ${duplicateField}: ${duplicateValue} already exists.`));
    }
    next(createHttpError(500, "Employee could not be updated"));
  }
}

export async function updateEmployeePassword(req, res, next) {
  const { id } = req.params;
  const { oldPassword, newPassword } = req.body;

  try {
    const foundEmployee = await Employee.findById(id);

    if (foundEmployee) {
      const checkPasswords = await bcrypt.compare(oldPassword, foundEmployee.password);

      if (!checkPasswords) {
        return next(createHttpError(400, "Wrong old password, please try again!"));
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);

      const options = {
        new: true,
        runValidators: true,
      };

      const updatedEmployee = await Employee.findByIdAndUpdate(id, { password: hashedPassword }, options);

      res.json({
        id: updatedEmployee._id,
        username: updatedEmployee.firstname,
        firstname: updatedEmployee.firstname,
        lastname: updatedEmployee.lastname,
        email: updatedEmployee.email,
        gender: updatedEmployee.gender,
        maritalStatus: updatedEmployee.maritalStatus,
        noOfChildren: updatedEmployee.noOfChildren,
        phoneNumber: updatedEmployee.phoneNumber,
        city: updatedEmployee.city,
        state: updatedEmployee.state,
        country: updatedEmployee.country,
        street: updatedEmployee.street,
        houseNumber: updatedEmployee.houseNumber,
        postalCode: updatedEmployee.postalCode,
        taxIdentificationNumber: updatedEmployee.taxIdentificationNumber,
        socialSecurityNumber: updatedEmployee.socialSecurityNumber,
        incomeTaxClass: updatedEmployee.incomeTaxClass,
        healthInsuranceCompany: updatedEmployee.healthInsuranceCompany,
        bankAccountDetails: {
          bankName: updatedEmployee.bankAccountDetails.bankName,
          IBAN: updatedEmployee.bankAccountDetails.IBAN,
          BIC: updatedEmployee.bankAccountDetails.BIC,
        },
        companyId: updatedEmployee.companyId,
        companyName: updatedEmployee.companyName,
        message:
          "You have updated your password successfully. You will be redirected to the login page to use your new password to login.",
        profilePicture: updatedEmployee.profilePicture,
        jobTitle: updatedEmployee.jobTitle,
      });
    } else {
      return next(createHttpError(404, "No Employee found to update password"));
    }
  } catch (err) {
    if (err.name === "ValidationError") {
      const errMessage = Object.values(err.errors)[0].message;
      return next(createHttpError(400, errMessage));
    }
    next(createHttpError(500, "Failed to update your password. Please try again."));
  }
}
