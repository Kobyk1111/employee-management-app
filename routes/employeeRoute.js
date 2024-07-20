import { Router } from "express";
import {
  createEmployee,
  updateEmployee,
  loginEmployee,
  getAllEmployees,
  updateEmployeeProfile,
  updateEmployeePassword,
  checkAuth,
} from "../controllers/employeeController.js";
import authorizeRole from "../middlewares/authorizeRole.js";
import { authenticateTokenOfAdmin, authenticateTokenOfEmployee } from "../middlewares/authenticateToken.js";
// import upload from "../middlewares/multerConfig.js";
import uploadCloud from "../middlewares/multerCloudinary.js";

const router = Router();

router.post("/", authenticateTokenOfAdmin, authorizeRole("Admin"), createEmployee);
router.get("/getAllEmployees/:id", getAllEmployees);
router.post("/login", loginEmployee);
router.post("/:id", updateEmployee);

router.use(authenticateTokenOfEmployee);
router.get("/check-auth", checkAuth);
router.post("/updatePassword/:id", updateEmployeePassword);
router.post("/updateProfile/:id", uploadCloud.single("profilePicture"), updateEmployeeProfile);

export default router;
