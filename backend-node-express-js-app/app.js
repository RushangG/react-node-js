
import express from "express";
import mainRoutes from "./routes/index.js";
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

app.use("/api", mainRoutes);
app.use("/", (req, res) => {
    res.json({ message: "Hello from the backend!" });
});
export default app;