import { Router } from "express";
import { createEmployee, updateEmployee, loginEmployee } from "../controllers/employeeController.js";

const router = Router();

router.post("/", createEmployee);
router.post("/login", loginEmployee);
router.post("/:id", updateEmployee);

export default router;
