import express from "express";
import { Users } from "../entities/Users";
import { AppDataSource } from "../config/db";

const userRepo = AppDataSource.getRepository(Users);

export async function getUsers() {
  try {
    let users = await userRepo.find({
      select: {
        name: true,
        email: true,
      },
    });
    console.log("Users fetched successfully:", users);
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}
