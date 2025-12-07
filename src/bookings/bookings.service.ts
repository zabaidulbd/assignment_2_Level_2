import { pool } from "../config/db";

interface BookingPayload {
  vehicle_id: number;
  rent_start_date: string;
  rent_end_date: string;
}

const createBooking = async (payload: BookingPayload, customer_id: number) => {
  const { vehicle_id, rent_start_date, rent_end_date } = payload;

  const vehicleRes = await pool.query(
    "SELECT * FROM Vehicles WHERE id=$1 AND availability_status='available'",
    [vehicle_id]
  );

  if (vehicleRes.rows.length === 0) {
    throw new Error("Vehicle is not available for booking");
  }

  const vehicle = vehicleRes.rows[0];
  const start = new Date(rent_start_date);
  const end = new Date(rent_end_date);
  const diffTime = end.getTime() - start.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
  const total_price = diffDays * Number(vehicle.daily_rent_price);

  const bookingRes = await pool.query(
    `INSERT INTO Bookings(customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status)
     VALUES($1, $2, $3, $4, $5, $6)
     RETURNING *`,
    [
      customer_id,
      vehicle_id,
      rent_start_date,
      rent_end_date,
      total_price,
      "active",
    ]
  );

  await pool.query(
    "UPDATE Vehicles SET availability_status='booked' WHERE id=$1",
    [vehicle_id]
  );

  return bookingRes;
};

const getBookings = async () => {
  const result = await pool.query(`SELECT * FROM Bookings`);
  return result;
};

const updateBookings = async (payload: Record<string, unknown>, id: string) => {
  const { rent_start_date, rent_end_date, total_price, status } = payload;
  const result = await pool.query(
    "UPDATE Bookings SET rent_start_date=$1, rent_end_date=$2, total_price=$3, status=$4 WHERE id=$5 RETURNING *",
    [rent_start_date, rent_end_date, total_price, status, id]
  );
  return result;
};

export const bookingServices = {
  createBooking,
  getBookings,
  updateBookings,
};
