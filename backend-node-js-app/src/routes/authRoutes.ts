import express, { type Request, type Response, Router } from "express";

const router: Router = express.Router();

router.get("/all", (req, res) => {
  res.json({ message: "Authentication route" });
});

export default router;
