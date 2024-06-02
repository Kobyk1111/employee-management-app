import { Router } from "express";
import { createEmployee } from "../controllers/employeeController.js";

const router = Router();

router.post("/", createEmployee);

export default router;
