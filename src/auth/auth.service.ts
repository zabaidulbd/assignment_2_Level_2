import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../config";
import { pool } from "../config/db";

type UserRow = {
  id: number;
  name: string;
  email: string;
  password: string;
  role?: string;
  phone?: string;
};

const signupUserInDB = async (
  name: string,
  email: string,
  password: string,
  phone: string
) => {
  const emailLower = email.trim().toLowerCase();

  // check if user exists
  // const exists = await pool.query<UserRow>(
  //   "SELECT id FROM users WHERE LOWER(email)=$1",
  //   [emailLower]
  // );
  // if (exists.rowCount > 0) {
  //   return { success: false, reason: "email_exists" } as const;
  // }

  // hash password
  const hashed = await bcrypt.hash(password, 10);

  // insert user, default role: customer
  const result = await pool.query<UserRow>(
    `INSERT INTO users (name, email, password, phone, role)
     VALUES ($1,$2,$3,$4,'customer')
     RETURNING id, name, email, phone, role`,
    [name, emailLower, hashed, phone]
  );

  const user = result.rows[0];

  // create token
  const payload = { id: user?.id, role: user?.role };
  const token = jwt.sign(payload, config.jwtSecret as string, {
    expiresIn: "7d",
  });

  return { user, token };
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
