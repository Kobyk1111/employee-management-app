import { Router } from "express";
import {
  createLeaveRequest,
  getAllEmployeesLeaveRequests,
  getEmployeeLeaveRequests,
  updateLeaveRequest,
} from "../controllers/leaveController.js";
import authorizeRole from "../middlewares/authorizeRole.js";
import { authenticateTokenOfAdmin } from "../middlewares/authenticateToken.js";

const router = Router();

router.get("/:id", getEmployeeLeaveRequests);

// This route should be a protected route. If the user is not an admin, they should not have access
router.get("/getAllLeaves/:companyId", authenticateTokenOfAdmin, authorizeRole("Admin"), getAllEmployeesLeaveRequests);

router.post("/", createLeaveRequest);
router.patch("/:leaveId/updateLeave", updateLeaveRequest);

export default router;
