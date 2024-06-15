import Admin from "../models/Admin.js";
import createHttpError from "http-errors";
import bcrypt from "bcrypt";

export async function getAllLeaveRequests(req, res, next) {
  const { id } = req.params;

  try {
    const foundAdmin = await Admin.findById(id).populate("leaves");

    if (foundAdmin) {
      res.json({
        leaves: foundAdmin.leaves,
      });
    } else {
      return next(createHttpError(404, "No admin found"));
    }
  } catch (err) {
    if (err.name === "ValidationError") {
      const errMessage = Object.values(err.errors)[0].message;
      return next(createHttpError(400, errMessage));
    }
    next(createHttpError(500, "Failed to get all leaves"));
  }
}

export async function createAdmin(req, res, next) {
  const { companyName } = req.body;
  try {
    const foundAdmin = await Admin.findOne({ companyName });

    if (!foundAdmin) {
      const { password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const admin = await Admin.create({ ...req.body, password: hashedPassword });

      await admin.populate({ path: "departments", select: "name" });

      await admin.populate("employees");

      res.status(201).json({
        id: admin._id,
        username: admin.firstname,
        departments: admin.departments,
        employees: admin.employees,
        companyId: admin.companyId,
      });
    } else {
      return next(
        createHttpError(
          409,
          "An admin already exists for this organization. Only one admin is allowed per organization."
        )
      );
    }
  } catch (err) {
    if (err.name === "ValidationError") {
      const errMessage = Object.values(err.errors)[0].message;
      return next(createHttpError(400, errMessage));
    }
    next(createHttpError(500, "Failed to register as admin"));
  }
}

export async function loginAdmin(req, res, next) {
  const { email, password } = req.body;
  try {
    const foundAdmin = await Admin.findOne({ email });

    if (foundAdmin) {
      const matchPassword = await bcrypt.compare(password, foundAdmin.password);

      if (!matchPassword) {
        return next(createHttpError(400, "Wrong password, please try again!"));
      }

      await foundAdmin.populate({ path: "departments", select: "name" });

      await foundAdmin.populate("employees");

      res.json({
        id: foundAdmin._id,
        username: foundAdmin.firstname,
        departments: foundAdmin.departments,
        employees: foundAdmin.employees,
        companyId: foundAdmin.companyId,
      });
    } else {
      return next(createHttpError(404, "No Admin found"));
    }
  } catch (error) {
    next(createHttpError(500, "Failed to log in"));
  }
}

export async function addDepartment(req, res, next) {
  const { newDepartmentId } = req.body;
  const { id } = req.params;

  try {
    const foundAdmin = await Admin.findById(id);

    if (foundAdmin) {
      const options = {
        new: true,
        runValidators: true,
      };

      // if the newDepartmentId is already in the database, it means we are updating the department instead of creating a new one. So it will filtered out first and then replaced with a new departmentId.
      foundAdmin.departments = foundAdmin.departments.filter(
        (department) => department._id.toString() !== newDepartmentId
      );
      await foundAdmin.save();

      const updatedAdmin = await Admin.findByIdAndUpdate(id, { $push: { departments: newDepartmentId } }, options);

      await updatedAdmin.populate("departments", {
        name: 1,
      });

      await updatedAdmin.populate("employees");

      res.status(201).json({
        id: updatedAdmin._id,
        departments: updatedAdmin.departments,
        employees: updatedAdmin.employees,
        companyId: updatedAdmin.companyId,
      });
    } else {
      return next(createHttpError(404, "No Admin found"));
    }
  } catch (err) {
    if (err.name === "ValidationError") {
      const errMessage = Object.values(err.errors)[0].message;
      return next(createHttpError(400, errMessage));
    }
    next(createHttpError(500, "Failed to update admin"));
  }
}

export async function deleteDepartment(req, res, next) {
  const { id, departmentId } = req.params;

  try {
    const foundAdmin = await Admin.findById(id);

    if (foundAdmin) {
      foundAdmin.departments = foundAdmin.departments.filter(
        (department) => department._id.toString() !== departmentId
      );

      await foundAdmin.save();

      await foundAdmin.populate("departments", {
        name: 1,
      });

      await foundAdmin.populate("employees");

      res.status(201).json({
        id: foundAdmin._id,
        departments: foundAdmin.departments,
        employees: foundAdmin.employees,
        companyId: foundAdmin.companyId,
      });
    } else {
      return next(createHttpError(404, "No Admin found"));
    }
  } catch (err) {
    if (err.name === "ValidationError") {
      const errMessage = Object.values(err.errors)[0].message;
      return next(createHttpError(400, errMessage));
    }
    next(createHttpError(500, "Failed to update admin"));
  }
}

export async function addEmployee(req, res, next) {
  const { newEmployeeId } = req.body;
  const { id } = req.params;

  try {
    const foundAdmin = await Admin.findById(id);

    if (foundAdmin) {
      const options = {
        new: true,
        runValidators: true,
      };

      foundAdmin.employees = foundAdmin.employees.filter((employee) => employee._id.toString() !== newEmployeeId);
      await foundAdmin.save();

      const updatedAdmin = await Admin.findByIdAndUpdate(id, { $push: { employees: newEmployeeId } }, options);

      await updatedAdmin.populate("departments", {
        name: 1,
      });

      await updatedAdmin.populate("employees");

      res.status(201).json({
        id: updatedAdmin._id,
        departments: updatedAdmin.departments,
        employees: updatedAdmin.employees,
        companyId: updatedAdmin.companyId,
      });
    }
  } catch (err) {
    if (err.name === "ValidationError") {
      const errMessage = Object.values(err.errors)[0].message;
      return next(createHttpError(400, errMessage));
    }
    next(createHttpError(500, "Failed to update admin"));
  }
}

export async function addLeave(req, res, next) {
  const { id } = req.params;
  const { leaveId } = req.body;

  try {
    const foundAdmin = await Admin.findById(id);

    if (foundAdmin) {
      const options = {
        new: true,
        runValidators: true,
      };

      await Admin.findByIdAndUpdate(id, { leaves: leaveId }, options);

      res.json({
        message: "Leave has been created successfully",
      });
    }
  } catch (err) {
    if (err.name === "ValidationError") {
      const errMessage = Object.values(err.errors)[0].message;
      return next(createHttpError(400, errMessage));
    }
    next(createHttpError(500, "Failed to update admin"));
  }
}
