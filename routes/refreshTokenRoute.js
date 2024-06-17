import { Router } from "express";
import { authenticateTokenOfAdmin } from "../middlewares/authenticateToken.js";
// import { refreshTokens } from "../controllers/refreshTokenController.js";

const router = Router();

router.get("/", authenticateTokenOfAdmin);

export default router;
