import { pool } from "../config/db";

const getAllUser = async () => {
  const result = await pool.query(`SELECT * FROM Users`);
  const users = result.rows.map((user) => {
    const { password, ...cleanUser } = user;
    return cleanUser;
  });
  return users;
};
const updateUser = async (name: string, email: string, id: string) => {
  const result = await pool.query(
    `UPDATE Users SET name=$1, email=$2 WHERE id=$3 RETURNING *`,
    [name, email, id]
  );

  const user = result.rows[0];
  if (user) {
    delete user.password;
  }

  return { rows: result.rows };
};
const deleteUser = async (id: string) => {
  const activeCheck = await pool.query(
    `SELECT 1 FROM Bookings WHERE customer_id = $1 AND status = 'active' LIMIT 1`,
    [id]
  );

  if ((activeCheck.rowCount ?? 0) > 0) {
    throw new Error("Cannot delete user: active bookings exist");
  }

  const result = await pool.query(
    `DELETE FROM Users WHERE id = $1 RETURNING *`,
    [id]
  );

  return result;
};

export const userServices = {
  getAllUser,
  updateUser,
  deleteUser,
};
