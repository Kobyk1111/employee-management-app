import Department from "../models/Department.js";
import createHttpError from "http-errors";

export async function createDepartment(req, res, next) {
  const { newDepartment } = req.body;
  try {
    const foundDepartment = await Department.findOne({ name: newDepartment });

    if (foundDepartment) {
      return next(createHttpError(409, "Department already exist"));
    }

    const createDepartment = await Department.create({ name: newDepartment });
    res.status(201).json({
      id: createDepartment._id,
    });
  } catch (error) {
    next(createHttpError(500, "Department could not be created"));
  }
}
