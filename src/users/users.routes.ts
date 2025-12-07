import { Router } from "express";
import auth from "../middleware/auth";
import { userControllers } from "./users.controller";

const router = Router();
router.get("/", auth("admin"), userControllers.getAllUser);
router.put("/:id", auth("admin", "customer"), userControllers.updateUser);
router.delete("/:id", userControllers.deleteUser);

export const usersRoutes = router;
