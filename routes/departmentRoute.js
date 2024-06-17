import { Router } from "express";
import { createDepartment, deleteDepartment, updateDepartment } from "../controllers/departmentController.js";
import authorizeRole from "../middlewares/authorizeRole.js";
import { authenticateTokenOfAdmin } from "../middlewares/authenticateToken.js";

const router = Router();

router.use(authenticateTokenOfAdmin);
router.use(authorizeRole("Admin"));

router.post("/", createDepartment);
router.delete("/:id", deleteDepartment);
router.post("/:id", updateDepartment);

export default router;
