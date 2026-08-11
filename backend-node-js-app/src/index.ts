import express from "express";
import { type Request, type Response } from "express";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const BaseUrl = "/api/v1";

const app = express();
const port = 3000;

app.use(express.json());


  
app.use(`${BaseUrl}/auth`, authRoutes);
app.use(`${BaseUrl}/users`, userRoutes);

app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "Hello World! From Node.js with TypeScript and Express.",
  });
});

app.listen(port, () => {
  console.log(`Server is running on port : http://localhost:${port}`);
});
