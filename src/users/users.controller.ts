import { Request, Response } from "express";
import { userServices } from "./users.service";

const getAllUser = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getAllUser();

    res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
      datails: err,
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  const loggedInUser = req.user;
  if (!loggedInUser) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized! User data missing",
    });
  }

  const userIdToUpdate = req.params.id;

  if (loggedInUser.role === "customer" && loggedInUser.id !== userIdToUpdate) {
    return res.status(403).json({
      success: false,
      message: "You can only update your own profile!",
    });
  }

  const { name, email } = req.body;

  try {
    const result = await userServices.updateUser(
      name,
      email,
      userIdToUpdate as string
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: result.rows[0],
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const result = await userServices.deleteUser(req.params.id!);

    if (result.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "User deleted successfully",
      });
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const userControllers = {
  getAllUser,
  updateUser,
  deleteUser,
};
