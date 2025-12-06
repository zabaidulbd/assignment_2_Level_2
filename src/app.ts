import express, { Request, Response } from "express";
import { authRoute } from "./auth/auth.route";
import initDB from "./config/db";

const app = express();
// parser
app.use(express.json());

// initializing Database
initDB();

app.use("/api/v1/auth", authRoute);

app.get("/", (req: Request, res: Response) => {
  res.send("from app ts files");
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Do not found any Route",
    path: req.path,
  });
});

export default app;
