import { Router } from "express";
import { createDepartment } from "../controllers/departmentController.js";

const router = Router();

router.post("/", createDepartment);
// router.post("/login", loginAdmin);

export default router;
