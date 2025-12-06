import { Router } from "express";
import { userControllers } from "./users.controller";

const router = Router();
router.get("/", userControllers.getAllUser);

export const usersRoutes = router;
