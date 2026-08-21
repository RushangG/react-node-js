
import express from "express";
import cors from "cors";
import mainRoutes from "./routers/index.js";
import helmet from "helmet";
import fs from "fs";
import path from "path";
import morgan from "morgan";
import compression from "compression";
import bcrypt from "bcrypt";
import argon2 from "argon2";
const app = express();

// console.log(__dirname);
// console.log(`Current directory: ${path.resolve()}`);
app.use(morgan('dev')); // Log HTTP requests to the console
// remove response headers.
app.use(helmet());
// Middleware to parse JSON request bodies
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",

}));
app.use(compression({ threshold: 0 }));
app.use("/api", mainRoutes);

app.get("/", async (req, res) => {
    let password = "q123";
    let hashPassword = await bcrypt.hash("q123", 10);

    console.log("Hashed password:", hashPassword);
    let ans = await bcrypt.compare("q123", hashPassword);
    console.log("Password match:", ans);

    const hash = await argon2.hash(password);
    console.log("Hashed password using argon2:", hash);
    let isMatch = await argon2.verify(hash, password);
    console.log("Password match using argon2:", isMatch);


    res.json({ message: "Hello from the backend!" });
});

app.use((req, res) => {
    console.log(`404 Not Found: ${req.method} ${req.originalUrl}`);
    res.status(404).json({ error: "Not Found" });
})

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: err.message });
});

export default app;