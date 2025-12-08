import { Router } from "express";
import auth from "../middleware/auth";
import { bookingsControllers } from "./bookings.controller";

const router = Router();
router.post("/", auth("admin", "customer"), bookingsControllers.createBookings);
router.get("/", auth("admin", "customer"), bookingsControllers.getBookings);
router.put("/:id", bookingsControllers.updateBookings);

export const bookingsRoutes = router;
