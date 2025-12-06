import { pool } from "../config/db";

const getAllUser = async () => {
  const result = await pool.query(`SELECT * FROM Users`);
  return result;
};

const updateUser = async (name: string, email: string, id: string) => {
  const result = await pool.query(
    `UPDATE Users SET name=$1, email=$2 WHERE id=$3 RETURNING *`,
    [name, email, id]
  );

  return result;
};

const deleteUser = async (id: string) => {
  const result = await pool.query(`DELETE FROM Users WHERE id = $1`, [id]);

  return result;
};

export const userServices = {
  getAllUser,
  updateUser,
  deleteUser,
};
