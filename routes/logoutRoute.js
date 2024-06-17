import { Router } from "express";
import { logoutAdmin, logoutEmployee } from "../controllers/logoutController.js";

const router = Router();

router.post("/admin", logoutAdmin);
router.post("/employee", logoutEmployee);

export default router;
