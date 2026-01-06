import express from "express";
import authRoutes from "./routes/authRouter.js";

const app = express();

app.set("trust proxy", 1);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("src/public"));

app.use(authRoutes);

export default app;
