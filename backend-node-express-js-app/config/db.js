// import { Pool } from "pg";
import dotenv from "dotenv";
import { DataSource } from "typeorm";
import { ProductModel } from "../models/productModel.js";
dotenv.config();

// const db = new Pool({
//     user: process.env.DB_USER,
//     host: process.env.DB_HOST,
//     database: process.env.DB_NAME,
//     password: process.env.DB_PASSWORD,
//     port: process.env.DB_PORT,
// });

export const AppDataSource = new DataSource({
    type: "postgres",
    url: process.env.DB_URL,
    synchronize: true,
    logging: false,
    entities: [ProductModel],
});


export default async function connectDB() {
    try {
        await AppDataSource.initialize();
        console.log("Database connected successfully");
    }
    catch (err) {
        console.error("Database connection failed", err);
        process.exit(1);
    }
};