import Leave from "../models/Leave.js";
// import Admin from "../models/Admin.js";
import createHttpError from "http-errors";

export async function getEmployeeLeaveRequests(req, res, next) {
  const { id } = req.params;
  try {
    const allLeaveRequests = await Leave.find({ employee: id });

    res.json(allLeaveRequests);
  } catch (err) {
    if (err.name === "ValidationError") {
      const errMessage = Object.values(err.errors)[0].message;
      return next(createHttpError(400, errMessage));
    }
    next(createHttpError(500, "Failed to get all leave requests"));
  }
}

export async function getAllEmployeesLeaveRequests(req, res, next) {
  const { companyId } = req.params;
  try {
    // If using find to get all resources, populate should be chained to the find method.
    const allEmployeesRequest = await Leave.find({ companyId }).populate("employee");

    res.json(allEmployeesRequest);
  } catch (err) {
    if (err.name === "ValidationError") {
      const errMessage = Object.values(err.errors)[0].message;
      return next(createHttpError(400, errMessage));
    }
    next(createHttpError(500, "Failed to get all employees leave requests"));
  }
}

export async function createLeaveRequest(req, res, next) {
  try {
    await Leave.create(req.body);

    res.status(201).json({
      message: "Leave request submitted successfully",
    });
  } catch (err) {
    if (err.name === "ValidationError") {
      const errMessage = Object.values(err.errors)[0].message;
      return next(createHttpError(400, errMessage));
    }
    next(createHttpError(500, "Failed to create leave request"));
  }
}

export async function updateLeaveRequest(req, res, next) {
  const { leaveId } = req.params;
  const { status, adminComment, adminActionOn } = req.body;

  try {
    const foundLeave = await Leave.findById(leaveId);

    if (foundLeave) {
      const options = {
        new: true,
        runValidators: true,
      };

      const updatedLeave = await Leave.findByIdAndUpdate(leaveId, { status, adminComment, adminActionOn }, options);

      await updatedLeave.populate("employee");

      res.json(updatedLeave);
    } else {
      return next(createHttpError(404, "Leave request not found"));
    }
  } catch (err) {
    if (err.name === "ValidationError") {
      const errMessage = Object.values(err.errors)[0].message;
      return next(createHttpError(400, errMessage));
    }
    next(createHttpError(500, "Failed to update leave request"));
  }
}
