import { Router } from "express";
import { bookingsControllers } from "./bookings.controller";

const router = Router();
router.post("/", bookingsControllers.createBookings);
router.get("/", bookingsControllers.getBookings);
router.put("/:id", bookingsControllers.updateBookings);

export const bookingsRoutes = router;
