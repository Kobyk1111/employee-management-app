import Employee from "../models/Employee.js";
import createHttpError from "http-errors";

export async function createEmployee(req, res, next) {
  const { email, phoneNumber } = req.body;

  try {
    const foundEmployee = await Employee.findOne({ email, phoneNumber });

    if (foundEmployee) {
      return next(createEmployee(409, "Employee already exists"));
    }

    const createEmployee = await Employee.create(req.body);
    res.status(201).json({
      id: createEmployee._id,
    });
  } catch (err) {
    if (err.name === "ValidationError") {
      const errMessage = Object.values(err.errors)[0].message;
      return next(createHttpError(400, errMessage));
    }
    next(createHttpError(500, "Employee could not be created"));
  }
}
