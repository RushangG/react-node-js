import express from "express";

export default function errorCatch(
  err: Error,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  console.error(err.stack);
  console.error("Error message:", err.message);
  res.status(500).json({ message: "Internal Server Error 22" });
}
