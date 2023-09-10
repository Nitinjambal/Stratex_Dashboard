import { User } from "../models/usersModel.js";
import bcrypt from "bcrypt";
import { setCookie } from "../utils/token.js";
import ErrorHandler from "../middlewares/error.js";

//Login
export const loginUser = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const userPresent = await User.findOne({ email });
        if (!userPresent) {
            return next(new ErrorHandler("Invalid Email or Password", 404));
        }
        const isMatch = await bcrypt.compare(password, userPresent.password);

        if (!isMatch) {
            return next(new ErrorHandler("Invalid Email or Password", 404));
        }

        setCookie(userPresent, res, `Welcome back ${userPresent.name}`, 200);
    } catch (error) {
        res.status(404).json({
            success: false,
            message: "Somthing went wrong try again!",
        });
    }
};

//Register
export const registerUser = async (req, res, next) => {
    const { name, email, password } = req.body;
    try {
        const userPresent = await User.findOne({ email });
        if (userPresent) {
            return next(new ErrorHandler("User already exist with this Email", 404));
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        setCookie(newUser, res, "User Registered Successfully", 201);
    } catch (error) {
        res.status(404).json({
            success: false,
            message: "Somthing went wrong try again!",
        });
    }
};

//Logout
export const logoutUser = (req, res) => {
    res
        .status(200)
        .cookie("token", "", {
            expires: new Date(Date.now()),
            sameSite: process.env.NODE_ENV == "Development" ? "lax" : "none",
            secure: process.env.NODE_ENV == "Development" ? false : true
        })
        .json({
            success: true,
            message: "Logout Successfully",
        });
};

//myProfile
export const userProfile = (req, res) => {
    res.status(200).json({
        success: true,
        user: req.user,
    });
};
