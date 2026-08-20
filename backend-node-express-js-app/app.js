
import express from "express";
import cors from "cors";
import mainRoutes from "./routers/index.js";
import helmet from "helmet";
const app = express();

// remove response headers.
app.use(helmet());
// Middleware to parse JSON request bodies
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",

}));

app.use("/api", mainRoutes);

app.get("/", (req, res) => {
    res.json({ message: "Hello from the backend!" });
});

export default app;