import express from "express";
import productRouter from "./productRouters.js";

const mainRouter = express.Router();

mainRouter.get("/", (req, res) => {
    res.json({ message: "Hello from the mainRouter backend111!" });
});

mainRouter.use("/products", productRouter);

export default mainRouter;