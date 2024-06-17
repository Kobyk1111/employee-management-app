import { Router } from "express";
import {
  getAllLeaveRequests,
  createAdmin,
  loginAdmin,
  addDepartment,
  addEmployee,
  deleteDepartment,
  addLeave,
  checkAuth,
} from "../controllers/adminController.js";
import authorizeRole from "../middlewares/authorizeRole.js";
import { authenticateTokenOfAdmin } from "../middlewares/authenticateToken.js";

const router = Router();

router.post("/register", createAdmin);
router.post("/login", loginAdmin);

router.use(authenticateTokenOfAdmin);
router.use(authorizeRole("Admin"));
router.get("/check-auth", checkAuth);
router.get("/:id/getAllLeaves", getAllLeaveRequests);
router.patch("/:id/addDepartment", addDepartment);
router.patch("/:id/addEmployee", addEmployee);
router.patch("/:id/addLeave", addLeave);
router.delete("/:id/deleteDepartment/:departmentId", deleteDepartment);

export default router;
