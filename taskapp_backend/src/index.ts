import express from "express";
const app = express();

app.get("/", (req, res) => {
  res.send("Welcome to Task App. again check after compose");
});

app.listen(8000, () => {
  console.log("Server Run on port 8000");
});
