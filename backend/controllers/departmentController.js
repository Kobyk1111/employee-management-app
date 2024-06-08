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

export async function deleteDepartment(req, res, next) {
  const { id } = req.params;

  try {
    const deletedDepartment = await Department.findByIdAndDelete(id);

    if (deletedDepartment) {
      res.json({ id: deletedDepartment._id, message: `${deletedDepartment.name} has been successfully deleted.` });
    } else {
      return next(createHttpError(404, "No department found"));
    }
  } catch (error) {
    next(createHttpError(500, "There was a problem deleting the department."));
  }
}

export async function updateDepartment(req, res, next) {
  const { id } = req.params;

  try {
    const foundDepartment = await Department.findById(id);

    if (foundDepartment) {
      const options = {
        new: true,
        runValidators: true,
      };

      const updatedDepartment = await Department.findByIdAndUpdate(id, { name: req.body.newDepartment }, options);

      res.status(201).json({
        id: updatedDepartment._id,
      });
    } else {
      return next(createHttpError(404, "No department found"));
    }
  } catch (error) {
    next(createHttpError(500, "There was a problem updating the department."));
  }
}
