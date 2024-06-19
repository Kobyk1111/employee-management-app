import { Router } from "express";
import {
  createEmployee,
  updateEmployee,
  loginEmployee,
  getAllEmployees,
  updateEmployeeProfile,
  updateEmployeePassword,
} from "../controllers/employeeController.js";
import authorizeRole from "../middlewares/authorizeRole.js";
import { authenticateTokenOfAdmin } from "../middlewares/authenticateToken.js";
import upload from "../middlewares/multerConfig.js";

const router = Router();

router.post("/", authenticateTokenOfAdmin, authorizeRole("Admin"), createEmployee);
router.get("/getAllEmployees/:id", getAllEmployees);
router.post("/updatePassword/:id", updateEmployeePassword);
router.post("/updateProfile/:id", upload.single("profilePicture"), updateEmployeeProfile);
router.post("/login", loginEmployee);
router.post("/:id", updateEmployee);

export default router;
