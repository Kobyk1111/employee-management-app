import { Router } from "express";
import {
  createLeaveRequest,
  getAllEmployeesLeaveRequests,
  getEmployeeLeaveRequests,
} from "../controllers/leaveController.js";

const router = Router();

// This route should be a protected route. If the user is not an admin, they should not have access
router.get("/", getAllEmployeesLeaveRequests);

router.get("/:id", getEmployeeLeaveRequests);
router.post("/", createLeaveRequest);

export default router;
