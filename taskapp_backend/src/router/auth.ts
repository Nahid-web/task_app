import { Router } from "express";
const authRouter = Router();

authRouter.get("/", (req, res) => {
  res.send("hei there i am from auth");
});

export default authRouter;
