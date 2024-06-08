import { Router } from "express";
import {
  createAdmin,
  loginAdmin,
  addDepartment,
  addEmployee,
  deleteDepartment,
} from "../controllers/adminController.js";

const router = Router();

router.post("/register", createAdmin);
router.post("/login", loginAdmin);
router.patch("/:id/addDepartment", addDepartment);
router.patch("/:id/addEmployee", addEmployee);
router.delete("/:id/deleteDepartment/:departmentId", deleteDepartment);

export default router;
