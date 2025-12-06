import { Router } from "express";
import { userControllers } from "./users.controller";

const router = Router();
router.get("/", userControllers.getAllUser);
router.put("/:id", userControllers.updateUser);
router.delete("/:id", userControllers.deleteUser);

export const usersRoutes = router;
