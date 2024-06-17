import { Router } from "express";
import { createEmployee, updateEmployee, loginEmployee } from "../controllers/employeeController.js";
import authorizeRole from "../middlewares/authorizeRole.js";
import { authenticateTokenOfAdmin } from "../middlewares/authenticateToken.js";

const router = Router();

router.post("/", authenticateTokenOfAdmin, authorizeRole("Admin"), createEmployee);
router.post("/login", loginEmployee);
router.post("/:id", updateEmployee);

export default router;
