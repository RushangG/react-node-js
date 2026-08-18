import express from "express";


const mainRouter = express.Router();

mainRouter.use("/", (req, res) => {
    res.json({ message: "Hello from the backend111!" });
});

export default mainRouter;