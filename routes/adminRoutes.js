import { Router } from "express";
import {
  getAllLeaveRequests,
  createAdmin,
  loginAdmin,
  addDepartment,
  addEmployee,
  deleteDepartment,
  addLeave,
  checkAuth,
  updateAdminProfile,
  updateAdminPassword,
} from "../controllers/adminController.js";
import authorizeRole from "../middlewares/authorizeRole.js";
import { authenticateTokenOfAdmin } from "../middlewares/authenticateToken.js";
// import upload from "../middlewares/multerConfig.js";
import uploadCloud from "../middlewares/multerCloudinary.js";

const router = Router();

router.post("/register", createAdmin);
router.post("/login", uploadCloud.single("profilePicture"), loginAdmin);

router.use(authenticateTokenOfAdmin);
router.use(authorizeRole("Admin"));
router.get("/check-auth", checkAuth);
router.get("/getAllLeaves/:id", getAllLeaveRequests);
router.post("/updatePassword/:id", updateAdminPassword);
router.post("/updateProfile/:id", uploadCloud.single("profilePicture"), updateAdminProfile);
router.patch("/addDepartment/:id", addDepartment);
router.patch("/addEmployee/:id", addEmployee);
router.patch("/:id/addLeave", addLeave);
router.delete("/:id/deleteDepartment/:departmentId", deleteDepartment);

export default router;
