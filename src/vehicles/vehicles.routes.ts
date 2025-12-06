import { Router } from "express";
import { vehiclesControllers } from "./vehicles.controller";

const router = Router();
router.post("/", vehiclesControllers.createVehicles);

export const vehiclesRoutes = router;
