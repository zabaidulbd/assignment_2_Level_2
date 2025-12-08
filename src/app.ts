import express, { Request, Response } from "express";
import { authRoute } from "./auth/auth.route";
import { bookingsRoutes } from "./bookings/bookings.routes";
import initDB from "./config/db";
import { usersRoutes } from "./users/users.routes";
import { vehiclesRoutes } from "./vehicles/vehicles.routes";

const app = express();
// parser
app.use(express.json());

// initializing Database
initDB();

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/vehicles", vehiclesRoutes);
app.use("/api/v1/users", usersRoutes);
app.use("/api/v1/bookings", bookingsRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("server is running");
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Do not found any Route",
    path: req.path,
  });
});

export default app;
