import { Request, Response } from "express";
import { authServices } from "./auth.service";

const signupUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, phone, role } = req.body;

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }

    const result = await authServices.signupUserInDB(
      name,
      email,
      password,
      phone,
      role
    );
    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        user: result.user,
      },
    });
  } catch (err: any) {
    console.error("Signup error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const signinUser = async (req: Request, res: Response) => {
  try {
    const result = await authServices.signinUseFromDB(
      req.body.email,
      req.body.password
    );
    return res.status(201).json({
      success: true,
      message: "User signin Successfully",
      data: result,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: true,
      message: error.message,
    });
  }
};

export const authController = {
  signupUser,
  signinUser,
};
