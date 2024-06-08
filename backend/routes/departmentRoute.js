import { Router } from "express";
import { createDepartment, deleteDepartment, updateDepartment } from "../controllers/departmentController.js";

const router = Router();

router.post("/", createDepartment);
router.delete("/:id", deleteDepartment);
router.post("/:id", updateDepartment);

export default router;
