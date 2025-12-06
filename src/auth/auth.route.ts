import { Router } from "express";
import { authController } from "./auth.controller";

const router = Router();
// base: /api/v1/auth
router.post("/signup", authController.signupUser);
router.post("/signin", authController.signinUser);

export const authRoute = router;
