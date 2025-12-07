import { Request, Response } from "express";
import { bookingServices } from "./bookings.service";

const createBookings = async (req: Request, res: Response) => {
  try {
    const customer_id = Number(req.user?.id);

    if (!customer_id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: user not found",
      });
    }

    const booking = await bookingServices.createBooking(req.body, customer_id);

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: booking.rows[0],
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

const getBookings = async (req: Request, res: Response) => {
  try {
    const result = await bookingServices.getBookings();

    res.status(200).json({
      success: true,
      message: "Bookings retrieved successfully",
      data: result.rows,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
      datails: err,
    });
  }
};

const updateBookings = async (req: Request, res: Response) => {
  try {
    const result = await bookingServices.updateBookings(
      req.body,
      req.params.id!
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Bookings not found" });
    } else {
      res.status(200).json({
        success: true,
        message: "Booking updated successfully",
        data: result.rows[0],
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to update Booking" });
  }
};

export const bookingsControllers = {
  createBookings,
  getBookings,
  updateBookings,
};
