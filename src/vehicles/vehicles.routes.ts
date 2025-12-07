import { Router } from "express";
import auth from "../middleware/auth";
import { vehiclesControllers } from "./vehicles.controller";

const router = Router();
router.post("/", auth("admin"), vehiclesControllers.createVehicles);
router.get("/", vehiclesControllers.getVehicles);
router.get("/:id", vehiclesControllers.getSingleVehicle);
router.put("/:id", auth("admin"), vehiclesControllers.updateVehicle);
router.delete("/:id", auth("admin"), vehiclesControllers.deleteVehicle);

export const vehiclesRoutes = router;
