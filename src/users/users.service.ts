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
