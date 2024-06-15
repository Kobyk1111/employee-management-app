import { Router } from "express";
import {
  getAllLeaveRequests,
  createAdmin,
  loginAdmin,
  addDepartment,
  addEmployee,
  deleteDepartment,
  addLeave,
} from "../controllers/adminController.js";

const router = Router();

router.post("/register", createAdmin);
router.post("/login", loginAdmin);
router.get("/:id/getAllLeaves", getAllLeaveRequests);
router.patch("/:id/addDepartment", addDepartment);
router.patch("/:id/addEmployee", addEmployee);
router.patch("/:id/addLeave", addLeave);
router.delete("/:id/deleteDepartment/:departmentId", deleteDepartment);

export default router;
