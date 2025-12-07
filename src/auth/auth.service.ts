import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../config";
import { pool } from "../config/db";

type UserRow = {
  id: number;
  name: string;
  email: string;
  password: string;
  phone?: string;
  role?: string;
};

const signupUserInDB = async (
  name: string,
  email: string,
  password: string,
  phone: string,
  role: string
) => {
  const emailLower = email.trim().toLowerCase();
  const hashedPassword = await bcrypt.hash(password, 10);
  const result = await pool.query<UserRow>(
    `INSERT INTO Users (name, email, password, phone, role)
     VALUES ($1,$2,$3,$4,$5)
     RETURNING *`,
    [name, emailLower, hashedPassword, phone, role]
  );

  const userRow = result.rows[0];
  const user = { ...userRow };
  delete (user as any).password;

  return { user };
};

const signinUseFromDB = async (email: string, password: string) => {
  const emailLower = email.trim().toLowerCase();
  const result = await pool.query(`SELECT * FROM users WHERE LOWER(email)=$1`, [
    emailLower,
  ]);

  if (result.rows.length === 0) {
    throw new Error("User not found!");
  }
  const user = result.rows[0];

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw new Error("password does not matched!");
  }

  const token = jwt.sign(
    { name: user.name, email: user.email, role: user.role },
    config.jwtSecret as string,
    {
      expiresIn: "7d",
    }
  );

  return { token, user };
};

export const authServices = {
  signinUseFromDB,
  signupUserInDB,
};
