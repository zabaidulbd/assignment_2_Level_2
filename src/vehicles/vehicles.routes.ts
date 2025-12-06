import { Router } from "express";
import { vehiclesControllers } from "./vehicles.controller";

const router = Router();
router.post("/", vehiclesControllers.createVehicles);
router.get("/", vehiclesControllers.getVehicles);

export const vehiclesRoutes = router;
