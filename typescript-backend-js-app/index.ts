import http from "http";
import express from "express";
import errorCatch from "./middleware/error-catch.ts";
interface User {
  id: number;
  name: string;
}

const app = express();

app.use(express.json());
let users: User[] = [];

app.get("/user", (req, res) => {
  res.json(users);
});

app.post("/user", (req, res) => {
  const newUser: User = req.body;
  console.log("Received new user:", newUser);
  users.push(newUser);
  res.status(201).json(newUser);
});

// Middleware to catch errors
app.get("/error", (req, res) => {
  throw new Error("This is a test error");
});

app.get("/async-error", (req, res, next) => {
  // Simulate an asynchronous error

  setTimeout(() => {
    try {
      const result = nonExistFunction();
      res.send(result);
    } catch (error) {
      next(error);
    }
  }, 1000);
});

app.all("*any", (req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use(errorCatch);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});

// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader("Content-Type", "text/plain");
//   res.end("Hello, World! TypeScript\n");
// });

// const PORT = 3000;
// server.listen(PORT, () => {
//   console.log(`Server running at http://localhost:${PORT}/`);
// });
