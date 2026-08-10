import express, { type Request, type Response } from "express";
import { Router } from "express";

const router: Router = express.Router();

router.get("/all", (req: Request, res: Response) => {
  res.json({ message: "List of users" });
});

export default router;
