import "reflect-metadata";
import express from "express";
import { connectToDatabase } from "./config/db";
import router from "./routes/index";

const app = express();

app.use(express.json());
app.use(router);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

connectToDatabase();

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
