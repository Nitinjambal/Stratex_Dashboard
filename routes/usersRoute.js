import express from "express";
import {
    loginUser,
    logoutUser,
    registerUser,
    userProfile,
} from "../controllers/usersController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const route = express.Router();

route.post("/login", loginUser);
route.post("/register", registerUser);
route.get("/logout", logoutUser);
route.get("/profile", isAuthenticated, userProfile);

export default route;
