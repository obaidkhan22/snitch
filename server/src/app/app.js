import express from "express";
import userRoutes from "../routes/user.routes.js";
import cookieParser from "cookie-parser";
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use("/api/user", userRoutes);
export default app;
