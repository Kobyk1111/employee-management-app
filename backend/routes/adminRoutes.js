import { Router } from "express";
import { createAdmin, loginAdmin } from "../controllers/adminController.js";

const router = Router();

router.post("/register", createAdmin);
router.post("/login", loginAdmin);

export default router;
