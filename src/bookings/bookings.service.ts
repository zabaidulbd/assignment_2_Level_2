import { pool } from "../config/db";

const createBookings = async (payload: Record<string, unknown>) => {
  const { rent_start_date, rent_end_date, total_price, status } = payload;
  const result = await pool.query(
    `INSERT INTO Bookings(rent_start_date, rent_end_date, total_price, status) VALUES($1, $2, $3, $4) RETURNING *`,
    [rent_start_date, rent_end_date, total_price, status]
  );

  return result;
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
  createBookings,
  getBookings,
  updateBookings,
};
