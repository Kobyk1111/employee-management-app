import Admin from "../models/Admin.js";
import createHttpError from "http-errors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";

export async function checkAuth(req, res, next) {
  try {
    const admin = await Admin.findById(req.user._id);

    await admin.populate({ path: "departments", select: "name" });
    await admin.populate("employees");

    res.json({
      id: admin._id,
      username: admin.firstname,
      firstname: admin.firstname,
      lastname: admin.lastname,
      email: admin.email,
      departments: admin.departments,
      employees: admin.employees,
      companyId: admin.companyId,
      companyName: admin.companyName,
      role: admin.role,
      profilePicture: admin.profilePicture,
    });
  } catch (error) {
    next(createHttpError(500, "Auth failed. Please login"));
  }
}

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
  const { companyName, password } = req.body;
  try {
    const foundAdmin = await Admin.findOne({ companyName });

    if (!foundAdmin) {
      //* Validate password strength here before hashing
      const isPasswordStrong = validator.isStrongPassword(password);

      if (!isPasswordStrong) {
        return next(
          createHttpError(
            400,
            "Password must contain at least 8 characters, including at least 1 lowercase character, 1 uppercase character, 1 number and 1 symbol"
          )
        );
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const admin = await Admin.create({ ...req.body, password: hashedPassword });

      await admin.populate({ path: "departments", select: "name" });

      await admin.populate("employees");

      const accessToken = jwt.sign({ id: admin._id }, process.env.JWT_SECRET_KEY, { expiresIn: "15m" });
      const refreshToken = jwt.sign({ id: admin._id }, process.env.JWT_SECRET_KEY, { expiresIn: "1d" });

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
        // path: "/refresh-token",
      };

      res.cookie("adminAccessCookie", accessToken, accessOptions);
      res.cookie("adminRefreshCookie", refreshToken, refreshOptions);

      res.status(201).json({
        id: admin._id,
        username: admin.firstname,
        firstname: admin.firstname,
        lastname: admin.lastname,
        email: admin.email,
        departments: admin.departments,
        employees: admin.employees,
        companyId: admin.companyId,
        companyName: admin.companyName,
        role: admin.role,
        profilePicture: admin.profilePicture,
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

    if (err.code === 11000) {
      // Duplicate key error
      const duplicateField = Object.keys(err.keyPattern)[0];
      const duplicateValue = Object.values(err.keyValue)[0];
      return next(createHttpError(409, `An Admin with this ${duplicateField}: ${duplicateValue} already exists.`));
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

      const accessToken = jwt.sign({ id: foundAdmin.id }, process.env.JWT_SECRET_KEY, { expiresIn: "15m" });
      const refreshToken = jwt.sign({ id: foundAdmin.id }, process.env.JWT_SECRET_KEY, { expiresIn: "1d" });

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
        // path: "/refresh-token",
      };

      res.cookie("adminAccessCookie", accessToken, accessOptions);
      res.cookie("adminRefreshCookie", refreshToken, refreshOptions);

      res.json({
        id: foundAdmin._id,
        username: foundAdmin.firstname,
        firstname: foundAdmin.firstname,
        lastname: foundAdmin.lastname,
        email: foundAdmin.email,
        departments: foundAdmin.departments,
        employees: foundAdmin.employees,
        companyId: foundAdmin.companyId,
        companyName: foundAdmin.companyName,
        role: foundAdmin.role,
        profilePicture: foundAdmin.profilePicture,
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
        username: updatedAdmin.firstname,
        firstname: updatedAdmin.firstname,
        lastname: updatedAdmin.lastname,
        email: updatedAdmin.email,
        departments: updatedAdmin.departments,
        employees: updatedAdmin.employees,
        companyId: updatedAdmin.companyId,
        companyName: updatedAdmin.companyName,
        role: updatedAdmin.role,
        profilePicture: updatedAdmin.profilePicture,
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
        username: foundAdmin.firstname,
        firstname: foundAdmin.firstname,
        lastname: foundAdmin.lastname,
        email: foundAdmin.email,
        departments: foundAdmin.departments,
        employees: foundAdmin.employees,
        companyId: foundAdmin.companyId,
        companyName: foundAdmin.companyName,
        role: foundAdmin.role,
        profilePicture: foundAdmin.profilePicture,
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
        username: updatedAdmin.firstname,
        firstname: updatedAdmin.firstname,
        lastname: updatedAdmin.lastname,
        email: updatedAdmin.email,
        departments: updatedAdmin.departments,
        employees: updatedAdmin.employees,
        companyId: updatedAdmin.companyId,
        companyName: updatedAdmin.companyName,
        role: updatedAdmin.role,
        profilePicture: updatedAdmin.profilePicture,
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

export async function updateAdminProfile(req, res, next) {
  const { id } = req.params;
  const { firstname, lastname, email, companyName } = req.body;

  try {
    const foundAdmin = await Admin.findById(id);

    if (foundAdmin) {
      const updateData = { firstname, lastname, email, companyName };

      if (req.file) {
        updateData.profilePicture = req.file.filename;
      }

      const options = {
        new: true,
        runValidators: true,
      };

      const updatedAdmin = await Admin.findByIdAndUpdate(id, updateData, options);

      await updatedAdmin.populate({ path: "departments", select: "name" });

      await updatedAdmin.populate("employees");

      res.json({
        id: updatedAdmin._id,
        username: updatedAdmin.firstname,
        firstname: updatedAdmin.firstname,
        lastname: updatedAdmin.lastname,
        email: updatedAdmin.email,
        departments: updatedAdmin.departments,
        employees: updatedAdmin.employees,
        companyId: updatedAdmin.companyId,
        companyName: updatedAdmin.companyName,
        role: updatedAdmin.role,
        profilePicture: updatedAdmin.profilePicture,
        message: "Profile has been updated successfully",
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

export async function updateAdminPassword(req, res, next) {
  const { id } = req.params;
  const { oldPassword, newPassword } = req.body;

  try {
    const foundAdmin = await Admin.findById(id);

    if (foundAdmin) {
      const checkPasswords = await bcrypt.compare(oldPassword, foundAdmin.password);

      if (!checkPasswords) {
        return next(createHttpError(400, "Wrong old password, please try again!"));
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);

      const options = {
        new: true,
        runValidators: true,
      };

      const updatedAdmin = await Admin.findByIdAndUpdate(id, { password: hashedPassword }, options);

      await updatedAdmin.populate({ path: "departments", select: "name" });

      await updatedAdmin.populate("employees");

      res.json({
        id: updatedAdmin._id,
        username: updatedAdmin.firstname,
        firstname: updatedAdmin.firstname,
        lastname: updatedAdmin.lastname,
        email: updatedAdmin.email,
        departments: updatedAdmin.departments,
        employees: updatedAdmin.employees,
        companyId: updatedAdmin.companyId,
        companyName: updatedAdmin.companyName,
        role: updatedAdmin.role,
        profilePicture: updatedAdmin.profilePicture,
        message: "Password has been updated successfully",
      });
    } else {
      return next(createHttpError(404, "No Admin found to update password"));
    }
  } catch (err) {
    if (err.name === "ValidationError") {
      const errMessage = Object.values(err.errors)[0].message;
      return next(createHttpError(400, errMessage));
    }
    next(createHttpError(500, "Failed to update admin's password"));
  }
}
