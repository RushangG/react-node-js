import { getUsers } from "../services/Users";
import { type Request, type Response } from "express";

export async function getAllUsers(req: Request, res: Response) {
  try {
    let users = await getUsers();
    console.log("Users fetched successfully:", users);

    res.status(200).json( users );
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Error fetching users" });
  }
}
