import express from "express";
import { getAllUsers } from "../controllers/user-controller";
const userRoutes = express.Router();

userRoutes.get("/", getAllUsers);

export default userRoutes;