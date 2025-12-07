import { Request, Response } from "express";
import { vehicleServices } from "./vehicles.service";

const createVehicles = async (req: Request, res: Response) => {
  try {
    const result = await vehicleServices.createVehicles(req.body);

    res.status(201).json({
      success: true,
      message: "Vehicle created successfully",
      data: result.rows[0],
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
const getVehicles = async (req: Request, res: Response) => {
  try {
    const result = await vehicleServices.getVehicles();
    const vehicles = result.rows;

    if (vehicles.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No vehicles found",
        data: [],
      });
    }
    res.status(200).json({
      success: true,
      message: "Vehicles retrieved successfully",
      data: vehicles,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
      details: err,
    });
  }
};

const getSingleVehicle = async (req: Request, res: Response) => {
  try {
    const result = await vehicleServices.getSingleVehicle(
      req.params.id as string
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Vehicles not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Can not reach vehicles" });
  }
};

const updateVehicle = async (req: Request, res: Response) => {
  try {
    const result = await vehicleServices.updateVehicle(
      req.body,
      req.params.id!
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Vehicle not found" });
    } else {
      res.status(200).json({
        success: true,
        message: "Vehicle updated successfully",
        data: result.rows[0],
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to update vehicle" });
  }
};

const deleteVehicle = async (req: Request, res: Response) => {
  try {
    const result = await vehicleServices.deleteVehicle(req.params.id!);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Vehicle not found" });
    }

    res.json({
      success: true,
      message: "vehicle deleted successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to delete vechile" });
  }
};

export const vehiclesControllers = {
  createVehicles,
  getVehicles,
  getSingleVehicle,
  updateVehicle,
  deleteVehicle,
};
