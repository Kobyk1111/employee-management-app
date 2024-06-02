import { Router } from "express";
import { createAdmin, loginAdmin, addDepartment, addEmployee } from "../controllers/adminController.js";

const router = Router();

router.post("/register", createAdmin);
router.post("/login", loginAdmin);
router.patch("/:id/addDepartment", addDepartment);
router.patch("/:id/addEmployee", addEmployee);

export default router;
