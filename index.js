import express from "express";
import { config } from "dotenv";
import dataBase from "./database/db.js";
import userRoute from "./routes/usersRoute.js";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";
import cors from "cors";

const app = express();

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
}));

config({
    path: "./database/.env",
});

//MongoDB database
dataBase();

const PORT = process.env.PORT || 8080;

//Routes
app.use("/api/v1/users", userRoute);

//server listning port
app.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT}`);
});

//error handler
app.use(errorMiddleware);
