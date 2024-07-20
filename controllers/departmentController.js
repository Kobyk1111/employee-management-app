import Department from "../models/Department.js";
import Employee from "../models/Employee.js";
import createHttpError from "http-errors";

export async function createDepartment(req, res, next) {
  const { newDepartment, companyId } = req.body;
  console.log(companyId);

  try {
    const createDepartment = await Department.create({ name: newDepartment, companyId });
    res.status(201).json({
      id: createDepartment._id,
    });
  } catch (error) {
    console.error(error);
    if (error.code === 11000) {
      // Duplicate key error
      return next(createHttpError(409, "Department already exists for this company"));
    }

    next(createHttpError(500, "Department could not be created"));
  }
}

export async function deleteDepartment(req, res, next) {
  const { id } = req.params;

  try {
    const department = await Department.findById(id);

    if (!department) {
      return next(createHttpError(404, "No department found"));
    }

    const employeesInDepartment = await Employee.find({ departmentId: department._id });

    if (employeesInDepartment.length > 0) {
      return next(createHttpError(400, "Cannot delete department with employees"));
    }

    const deletedDepartment = await Department.findByIdAndDelete(id);

    res.json({ id: deletedDepartment._id, message: `${deletedDepartment.name} has been successfully deleted.` });
  } catch (error) {
    next(createHttpError(500, "There was a problem deleting the department."));
  }
}

export async function updateDepartment(req, res, next) {
  const { id } = req.params;
  const { newDepartment } = req.body;

  try {
    const foundDepartment = await Department.findById(id);

    if (!foundDepartment) {
      return next(createHttpError(404, "No department found"));
    }

    const options = {
      new: true,
      runValidators: true,
    };

    const updatedDepartment = await Department.findByIdAndUpdate(id, { name: newDepartment }, options);

    // Update department name in employees collection
    await Employee.updateMany({ departmentId: foundDepartment._id }, { department: updatedDepartment.name });

    res.status(201).json({
      id: updatedDepartment._id,
    });
  } catch (error) {
    next(createHttpError(500, "There was a problem updating the department."));
  }
}
