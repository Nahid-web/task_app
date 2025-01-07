import express from "express";
import authRouter from "./router/auth";

import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT ?? "3000";
app.use(express.json());
app.use("/auth", authRouter);

app.get("/", (req, res) => {
  res.send(
    "Welcome to Task App. again check after compose and state parcesting"
  );
});

app.listen(port, () => {
  console.log(`Server Run on port ${port}`);
});
