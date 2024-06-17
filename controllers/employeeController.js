import Employee from "../models/Employee.js";
import createHttpError from "http-errors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
        companyId: foundEmployee.companyId,
        companyName: foundEmployee.companyName,
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
